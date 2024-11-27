import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import Cube from "./three_js/Cube";
import Axes from "./three_js/Axes";
import Grid from "./three_js/Grid";
import { get_ego_extrinsics } from "./animation_scripts/extrinsics";
import page_data from "./pages/page_data.json";
import Camera from "./three_js/Camera";
import { get_axis_visibility } from "./animation_scripts/visibility";
import ParamSlider from "./ParamSlider";
import CubeCorner from "./three_js/CubeCorner";
import DecomposedConnection from "./three_js/DecomposedConnection";
import init_vals from "./animation_scripts/init_vals.json";
import {
  toExtrinsics,
  getT,
  invertEuler,
  invertTranslation,
} from "../../scripts/rotation";
import { inv } from "mathjs";
import * as THREE from "three";

const egoIntrinsics = [
  [1920, 0, 0],
  [0, 1920, 0],
  [0, 0, 1],
];

const WhatIsACameraMatrix = () => {
  const [camEuler, setCamEuler] = useState<number[]>(init_vals.init_cam_euler);
  const [camPosition, setCamPosition] = useState<number[]>(
    init_vals.init_cam_position
  );
  const [camExtrinsics, setCamExtrinsics] = useState<number[][]>(
    toExtrinsics(
      camEuler[0],
      camEuler[1],
      camEuler[2],
      camPosition[0],
      camPosition[1],
      camPosition[2]
    )
  );

  const [egoExtrinsics, setEgoExtrinsics] = useState<number[][]>(
    get_ego_extrinsics(0)
  );

  useEffect(() => {
    setCamExtrinsics(
      toExtrinsics(
        camEuler[0],
        camEuler[1],
        camEuler[2],
        camPosition[0],
        camPosition[1],
        camPosition[2]
      )
    );
  }, [camEuler, camPosition]);

  // const [egoFocalX, setEgoFocalX] = useState(1920);
  // const [egoFocalY, setEgoFocalY] = useState(1920);
  // const [egoS, setEgoS] = useState(0);
  // const [egoCx, setEgoCx] = useState(0);
  // const [egoCy, setEgoCy] = useState(0);

  const [camFocalX, setCamFocalX] = useState(1920);
  const [camFocalY, setCamFocalY] = useState(1920);
  const [camS, setCamS] = useState(0);
  const [camCx, setCamCx] = useState(0);
  const [camCy, setCamCy] = useState(0);

  // const [egoIntrinsics, setEgoIntrinsics] = useState<number[][]>([
  //   [1920, 0, 0],
  //   [0, 1920, 0],
  //   [0, 0, 1],
  // ]);

  const [camIntrinsics, setCamIntrinsics] = useState<number[][]>([
    [1920, 0, 0],
    [0, 1920, 0],
    [0, 0, 1],
  ]);

  // useEffect(() => {
  //   setEgoIntrinsics([
  //     [egoFocalX, egoS, egoCx],
  //     [0, egoFocalY, egoCy],
  //     [0, 0, 1],
  //   ]);
  // }, [egoFocalX, egoFocalY, egoS, egoCx, egoCy]);

  useEffect(() => {
    setCamIntrinsics([
      [camFocalX, camS, camCx],
      [0, camFocalY, camCy],
      [0, 0, 1],
    ]);
  }, [camFocalX, camFocalY, camS, camCx, camCy]);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null); // Reference to the scrollable content

  const [axisVisibility, setAxisVisibility] = useState<boolean>(
    get_axis_visibility(0)
  );

  const calculateScrollPercentage = () => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      const percentage = (scrollTop / clientHeight) * 100;
      setEgoExtrinsics(get_ego_extrinsics(percentage));
      setAxisVisibility(get_axis_visibility(percentage));
    }
  };

  // Event listener to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      calculateScrollPercentage();
    };

    const scrollableElement = scrollableRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // create dictionary for accessing slider values
  const slider_dict: {
    [key: string]: [
      number,
      React.Dispatch<React.SetStateAction<number>>,
      number,
      number
    ];
  } = {
    fx: [camFocalX, setCamFocalX, 500, 3000],
    fy: [camFocalY, setCamFocalY, 500, 3000],
    s: [camS, setCamS, -100, 100],
    cx: [camCx, setCamCx, -250, 250],
    cy: [camCy, setCamCy, -250, 250],
    f: [
      camFocalX,
      (x) => {
        setCamFocalX(x);
        setCamFocalY(x);
      },
      500,
      3000,
    ],
    Tcx: [
      camPosition[0],
      (x) => setCamPosition([x, camPosition[1], camPosition[2], 1] as any),
      2,
      12,
    ],
    Tcy: [
      camPosition[1],
      (x) => setCamPosition([camPosition[0], x, camPosition[2], 1] as any),
      -12,
      -2,
    ],
    Tcz: [
      camPosition[2],
      (x) => setCamPosition([camPosition[0], camPosition[1], x, 1] as any),
      0,
      10,
    ],
    Rcx: [
      (camEuler[0] * 180) / Math.PI,
      (x: any) =>
        setCamEuler([(x * Math.PI) / 180, camEuler[1], camEuler[2]] as any),
      ((init_vals.init_cam_euler[0] - 0.2) * 180) / Math.PI,
      ((init_vals.init_cam_euler[0] + 0.2) * 180) / Math.PI,
    ],
    Rcy: [
      (camEuler[1] * 180) / Math.PI,
      (x: any) =>
        setCamEuler([camEuler[0], (x * Math.PI) / 180, camEuler[2]] as any),
      ((init_vals.init_cam_euler[1] - 0.2) * 180) / Math.PI,
      ((init_vals.init_cam_euler[1] + 0.2) * 180) / Math.PI,
    ],
    Rcz: [
      (camEuler[2] * 180) / Math.PI,
      (x: any) =>
        setCamEuler([camEuler[0], camEuler[1], (x * Math.PI) / 180] as any),
      ((init_vals.init_cam_euler[2] - 0.2) * 180) / Math.PI,
      ((init_vals.init_cam_euler[2] + 0.2) * 180) / Math.PI,
    ],
    Tx: [
      getT(camExtrinsics)[0],
      (x: any) => {
        setCamPosition(
          invertTranslation(
            [x, getT(camExtrinsics)[1], getT(camExtrinsics)[2]],
            camEuler
          )
        );
      },
      -5,
      5,
    ],
    Ty: [
      getT(camExtrinsics)[1],
      (x: any) => {
        setCamPosition(
          invertTranslation(
            [getT(camExtrinsics)[0], x, getT(camExtrinsics)[2]],
            camEuler
          )
        );
      },
      -5,
      5,
    ],
    Tz: [
      getT(camExtrinsics)[2],
      (x: any) => {
        setCamPosition(
          invertTranslation(
            [getT(camExtrinsics)[0], getT(camExtrinsics)[1], x],
            camEuler
          )
        );
      },
      -15,
      -5,
    ],
    Rx: [
      (invertEuler(camEuler)[0] * 180) / Math.PI,
      (x: any) => {
        setCamEuler(
          invertEuler([
            x * (Math.PI / 180),
            invertEuler(camEuler)[1],
            invertEuler(camEuler)[2],
          ])
        );
      },
      -180,
      180,
    ],
    Ry: [
      (invertEuler(camEuler)[1] * 180) / Math.PI,
      (x: any) => {
        setCamEuler(
          invertEuler([
            invertEuler(camEuler)[0],
            x * (Math.PI / 180),
            invertEuler(camEuler)[2],
          ])
        );
      },
      -180,
      180,
    ],
    Rz: [
      (invertEuler(camEuler)[2] * 180) / Math.PI,
      (x: any) => {
        setCamEuler(
          invertEuler([
            invertEuler(camEuler)[0],
            invertEuler(camEuler)[1],
            x * (Math.PI / 180),
          ])
        );
      },
      -180,
      180,
    ],
  };

  return (
    <div
      style={{ position: "relative", width: "100vw", height: "100vh" }}
      className="bg-teal-950 overflow-scroll"
    >
      <div
        ref={containerRef}
        className="absolute top-0 left-0 right-0 bottom-0"
      >
        <Canvas>
          <OrthographicCamera
            makeDefault
            position={[0, 0, 5]}
            zoom={1}
            left={-960}
            right={960}
            top={
              (1920 * (containerRef.current?.clientHeight ?? 1440)) /
              (containerRef.current?.clientWidth ?? 1920) /
              2
            }
            bottom={
              -(1920 * (containerRef.current?.clientHeight ?? 1440)) /
              (containerRef.current?.clientWidth ?? 1920) /
              2
            }
            near={0.1}
            far={1000}
          />
          <Grid
            extrinsicMatrix={egoExtrinsics}
            intrinsicMatrix={egoIntrinsics}
            camCoords={false}
            camExtrinsicMatrix={camExtrinsics}
          />
          <Cube
            extrinsicMatrix={egoExtrinsics}
            intrinsicMatrix={egoIntrinsics}
          />
          <Camera
            egoEtrinsicMatrix={egoExtrinsics}
            egoIntrinsicMatrix={egoIntrinsics}
            camExtrinsicMatrix={camExtrinsics}
            camIntrinsicMatrix={camIntrinsics}
            showPlane={false}
          />
          {axisVisibility && (
            <>
              <Axes
                egoExtrinsicMatrix={egoExtrinsics}
                egoIntrinsicMatrix={egoIntrinsics}
                cameraExtrinsics={camExtrinsics}
                camera={false}
              />
              <Axes
                egoExtrinsicMatrix={egoExtrinsics}
                egoIntrinsicMatrix={egoIntrinsics}
                cameraExtrinsics={camExtrinsics}
                camera={true}
              />
            </>
          )}
          {/* <CubeCorner
            egoExtrinsicMatrix={egoExtrinsics}
            egoIntrinsicMatrix={egoIntrinsics}
            cameraExtrinsics={camExtrinsics}
            cameraIntrinsics={camIntrinsics}
            showCamPoint={true}
            showCubePoint={true}
            showLine={true}
            showImagePlaneIntersection={true}
          /> */}
          <DecomposedConnection
            egoEtrinsicMatrix={egoExtrinsics}
            egoIntrinsicMatrix={egoIntrinsics}
            camExtrinsicMatrix={camExtrinsics}
            camIntrinsicMatrix={camIntrinsics}
            camCoords={true}
            ord={"y"}
          />
        </Canvas>
      </div>
      <div
        ref={scrollableRef}
        className="relative overflow-y-scroll h-full w-full"
      >
        {page_data.map((page: any, idx: number) => {
          return (
            <div
              className="h-[100vh] w-[24rem] pl-[1rem] flex items-center justify-center"
              key={idx}
            >
              <div className="bg-[#fff] rounded-md p-4 text-black h-fit">
                <h2 className="text-2xl font-bold mb">{page.title}</h2>
                {page.content.map((content: any, index: number) => {
                  return content.type === "text" ? (
                    <p className="mt-2" key={index}>
                      {content.data}
                    </p>
                  ) : content.type === "eqn" ? (
                    <div
                      key={index}
                      className="flex items-center justify-center mt-3 mb-1"
                    >
                      <img
                        src={content.url}
                        alt="equation"
                        style={{ height: content.hgt ? content.hgt : "1rem" }}
                        key={index}
                      />
                    </div>
                  ) : content.type === "slider" ? (
                    <ParamSlider
                      key={index}
                      value={slider_dict[content.title][0]}
                      min={slider_dict[content.title][2]}
                      max={slider_dict[content.title][3]}
                      title={content.title}
                      onChange={(x) =>
                        slider_dict[content.title][1](x as number)
                      }
                    />
                  ) : content.type === "reset" ? (
                    <button
                      key={index}
                      onClick={() => {
                        setCamFocalX(1920);
                        setCamFocalY(1920);
                        setCamS(0);
                        setCamCx(0);
                        setCamCy(0);
                        setCamPosition(init_vals.init_cam_position);
                        setCamEuler(init_vals.init_cam_euler);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    >
                      Reset
                    </button>
                  ) : null;
                })}

                <h3 key={idx} className="font-bold mt-2">
                  Scroll for more
                </h3>
              </div>
            </div>
          );
        })}
        <div className="h-[100vh] w-[24rem] relative">
          <div className="absolute bottom-[1rem] left-[1rem] bg-[#fff] rounded-md p-4 text-black">
            <h2 className="text-2xl font-bold mb-2">Thanks for scrolling!</h2>
            You've reached the end of the content.
          </div>
        </div>
      </div>
      <div className="absolute bottom-[1rem] right-[1rem] ml w-[12rem] h-[9rem] border border-solid border-white bg-black">
        <Canvas>
          <OrthographicCamera
            makeDefault
            position={[0, 0, 5]}
            zoom={1}
            left={-960}
            right={960}
            top={720}
            bottom={-720}
            near={0.1}
            far={1000}
          />
          <Cube
            extrinsicMatrix={camExtrinsics}
            intrinsicMatrix={camIntrinsics}
          />
          {/* <CubeCorner
            egoExtrinsicMatrix={camExtrinsics}
            egoIntrinsicMatrix={camIntrinsics}
            cameraExtrinsics={camExtrinsics}
            cameraIntrinsics={camIntrinsics}
            showCamPoint={false}
            showCubePoint={true}
            showLine={false}
          /> */}
        </Canvas>
      </div>
    </div>
  );
};

export default WhatIsACameraMatrix;
