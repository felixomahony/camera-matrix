import page_data from "./pages/page_data.json";

import { getT, invertEuler, invertTranslation } from "../../scripts/rotation";
import init_vals from "./animation_scripts/init_vals.json";

import ParamSlider from "./ParamSlider";

export default function Content({
  camFocalX,
  setCamFocalX,
  camFocalY,
  setCamFocalY,
  camS,
  setCamS,
  camCx,
  setCamCx,
  camCy,
  setCamCy,
  camPosition,
  setCamPosition,
  camEuler,
  setCamEuler,
  camExtrinsics,
}: {
  camFocalX: number;
  setCamFocalX: React.Dispatch<React.SetStateAction<number>>;
  camFocalY: number;
  setCamFocalY: React.Dispatch<React.SetStateAction<number>>;
  camS: number;
  setCamS: React.Dispatch<React.SetStateAction<number>>;
  camCx: number;
  setCamCx: React.Dispatch<React.SetStateAction<number>>;
  camCy: number;
  setCamCy: React.Dispatch<React.SetStateAction<number>>;
  camPosition: number[];
  setCamPosition: React.Dispatch<React.SetStateAction<number[]>>;
  camEuler: number[];
  setCamEuler: React.Dispatch<React.SetStateAction<number[]>>;
  camExtrinsics: number[][];
}) {
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
    <>
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
                    onChange={(x) => slider_dict[content.title][1](x as number)}
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
          Hopefully you've learned something about the camera matrix. If you
          enjoyed this, check out my other work at{" "}
          <a className="text-blue-500" href="https://felixomahony.github.io/">
            felixomahony.github.io
          </a>
          .
        </div>
      </div>
    </>
  );
}
