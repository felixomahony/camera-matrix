import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import Cube from "./three_js/Cube";
import Axes from "./three_js/Axes";
import init_vals from "./animation_scripts/init_vals.json";
import Grid from "./three_js/Grid";
import {
  get_cam_extrinsics,
  get_ego_extrinsics,
} from "./animation_scripts/extrinsics";
import page_data from "./pages/page_data.json";
import Camera from "./three_js/Camera";
import { get_axis_visibility } from "./animation_scripts/visibility";

const WhatIsACameraMatrix = () => {
  const [egoExtrinsics, setEgoExtrinsics] = useState<number[][]>(
    get_ego_extrinsics(0)
  );

  const [camExtrinsics, setCamExtrinsics] = useState<number[][]>(
    get_cam_extrinsics(0)
  );

  const [focalX, setFocalX] = useState(1920);
  const [focalY, setFocalY] = useState(1920);
  const [s, setS] = useState(0);
  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);

  const [egoIntrinsics, setEgoIntrinsics] = useState<number[][]>([
    [1920, 0, 960],
    [0, 1920, 720],
    [0, 0, 1],
  ]);

  const [camIntrinsics, setCamIntrinsics] = useState<number[][]>([
    [1920, 0, 0],
    [0, 1920, 0],
    [0, 0, 1],
  ]);

  useEffect(() => {
    setEgoIntrinsics([
      [focalX, s, cx],
      [0, focalY, cy],
      [0, 0, 1],
    ]);
  }, [focalX, focalY, s, cx, cy]);

  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollPercent, setScrollPercent] = useState(0);
  const scrollableRef = useRef<HTMLDivElement>(null); // Reference to the scrollable content

  const [axisVisibility, setAxisVisibility] = useState<boolean>(
    get_axis_visibility(0)
  );

  const calculateScrollPercentage = () => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      const percentage = (scrollTop / clientHeight) * 100;
      setScrollPercent(percentage);
      setEgoExtrinsics(get_ego_extrinsics(percentage));
      setCamExtrinsics(get_cam_extrinsics(percentage));
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
          />
          <Cube
            extrinsicMatrix={egoExtrinsics}
            intrinsicMatrix={egoIntrinsics}
          />
          <Camera
            egoEtrinsicMatrix={egoExtrinsics}
            egoIntrinsicMatrix={egoIntrinsics}
            camExtrinsicMatrix={camExtrinsics}
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
        </Canvas>
      </div>
      <div
        ref={scrollableRef}
        className="relative overflow-y-scroll h-full w-full"
      >
        {page_data.map((page, idx) => {
          return (
            <div
              className="h-[100vh] w-[24rem] pl-[1rem] flex items-center justify-center"
              key={idx}
            >
              <div className="bg-[#fff] rounded-md p-4 text-black h-fit">
                <h2 className="text-2xl font-bold mb">{page.title}</h2>
                {page.content.map((content, index) => {
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
                      />
                    </div>
                  ) : null;
                })}
                <h3 className="font-bold mt-2">Scroll for more</h3>
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
        </Canvas>
      </div>
    </div>
  );
};

export default WhatIsACameraMatrix;
