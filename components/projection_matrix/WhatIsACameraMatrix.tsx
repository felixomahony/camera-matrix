import React, { useRef, useEffect, useState } from "react";

import { get_ego_extrinsics } from "./animation_scripts/extrinsics";
import { get_visibility } from "./animation_scripts/visibility";
import init_vals from "./animation_scripts/init_vals.json";
import { toExtrinsics } from "../../scripts/rotation";
import CameraView from "./CameraView";
import ThirdPartyView from "./ThirdPartyView";
import Content from "./Content";

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

  const [visibility, setVisibility] = useState<any>(get_visibility(0));

  const calculateScrollPercentage = () => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      const percentage = (scrollTop / clientHeight) * 100;
      setEgoExtrinsics(get_ego_extrinsics(percentage));
      setVisibility(get_visibility(percentage));
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
    <div className="min-h-screen flex flex-col-reverse md:flex-row">
      <div
        ref={scrollableRef}
        className="flex-1 bg-gray-200 md:h-screen md:flex-none md:w-96 overflow-y-scroll max-h-screen"
      >
        <Content
          camFocalX={camFocalX}
          camFocalY={camFocalY}
          camS={camS}
          camCx={camCx}
          camCy={camCy}
          camPosition={camPosition}
          camEuler={camEuler}
          camExtrinsics={camExtrinsics}
          setCamFocalX={setCamFocalX}
          setCamFocalY={setCamFocalY}
          setCamS={setCamS}
          setCamCx={setCamCx}
          setCamCy={setCamCy}
          setCamPosition={setCamPosition}
          setCamEuler={setCamEuler}
        />
      </div>
      <div className="relative h-[75vw] w-screen md:h-screen md:flex-1 md:w-auto">
        <div
          ref={containerRef}
          className="absolute bottom-0 top-0 left-0 right-0 bg-teal-950"
        >
          <ThirdPartyView
            visibility={visibility}
            containerRef={containerRef}
            egoExtrinsics={egoExtrinsics}
            egoIntrinsics={egoIntrinsics}
            camExtrinsics={camExtrinsics}
            camIntrinsics={camIntrinsics}
          />
        </div>
        <div className="absolute bottom-4 right-4">
          <CameraView
            camExtrinsics={camExtrinsics}
            camIntrinsics={camIntrinsics}
            visibility={visibility}
          />
        </div>
      </div>
    </div>
  );
};

export default WhatIsACameraMatrix;
