"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./components/projection_matrix/three_js/DecomposedConnection.tsx":
/*!************************************************************************!*\
  !*** ./components/projection_matrix/three_js/DecomposedConnection.tsx ***!
  \************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ DecomposedConnection; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _scripts_rotation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../scripts/rotation */ \"(app-pages-browser)/./scripts/rotation.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Line */ \"(app-pages-browser)/./components/projection_matrix/three_js/Line.tsx\");\n/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mathjs */ \"(app-pages-browser)/./node_modules/mathjs/lib/esm/entry/pureFunctionsAny.generated.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nfunction DecomposedConnection(param) {\n    let { egoEtrinsicMatrix, egoIntrinsicMatrix, camExtrinsicMatrix, camIntrinsicMatrix, camCoords = false } = param;\n    _s();\n    function getGlobalPositions(camExtrinsics, camCoords) {\n        if (camCoords) {\n            const originPosition = camExtrinsics.map((row, idx)=>idx === 3 ? [\n                    1\n                ] : [\n                    -row[3]\n                ]);\n            const cameraPositions = [\n                [\n                    0,\n                    originPosition[0][0],\n                    originPosition[0][0],\n                    originPosition[0][0]\n                ],\n                [\n                    0,\n                    0,\n                    originPosition[1][0],\n                    originPosition[1][0]\n                ],\n                [\n                    0,\n                    0,\n                    0,\n                    originPosition[2][0]\n                ],\n                [\n                    1,\n                    1,\n                    1,\n                    1\n                ]\n            ];\n            console.log(\"cameraPositions\", cameraPositions);\n            const globalPositions = (0,_scripts_rotation__WEBPACK_IMPORTED_MODULE_1__.rotateCamera)(camExtrinsics, cameraPositions);\n            console.log(\"globalPositions\", globalPositions);\n            return globalPositions;\n        } else {\n            const cameraPosition = (0,mathjs__WEBPACK_IMPORTED_MODULE_4__.inv)(camExtrinsics).map((row)=>row[3]);\n            const globalPositions = [\n                [\n                    0,\n                    cameraPosition[0],\n                    cameraPosition[0],\n                    cameraPosition[0]\n                ],\n                [\n                    0,\n                    0,\n                    cameraPosition[1],\n                    cameraPosition[1]\n                ],\n                [\n                    0,\n                    0,\n                    0,\n                    cameraPosition[2]\n                ],\n                [\n                    1,\n                    1,\n                    1,\n                    1\n                ]\n            ];\n            return globalPositions;\n        }\n    }\n    const [globalPositions, setGlobalPositions] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(getGlobalPositions(camExtrinsicMatrix, camCoords));\n    const [projectedPositions, setProjectedPositions] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)((0,_scripts_rotation__WEBPACK_IMPORTED_MODULE_1__.projectPoints)(globalPositions, egoEtrinsicMatrix, egoIntrinsicMatrix));\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        setGlobalPositions(getGlobalPositions(camExtrinsicMatrix, camCoords));\n    }, [\n        camExtrinsicMatrix\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Line__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                startX: projectedPositions[0][0],\n                startY: projectedPositions[1][0],\n                endX: projectedPositions[0][1],\n                endY: projectedPositions[1][1],\n                color: \"#f00\"\n            }, void 0, false, {\n                fileName: \"/Users/felixomahony/Documents/git/camera-matrix/components/projection_matrix/three_js/DecomposedConnection.tsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Line__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                startX: projectedPositions[0][1],\n                startY: projectedPositions[1][1],\n                endX: projectedPositions[0][2],\n                endY: projectedPositions[1][2],\n                color: \"#0f0\"\n            }, void 0, false, {\n                fileName: \"/Users/felixomahony/Documents/git/camera-matrix/components/projection_matrix/three_js/DecomposedConnection.tsx\",\n                lineNumber: 71,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Line__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                startX: projectedPositions[0][2],\n                startY: projectedPositions[1][2],\n                endX: projectedPositions[0][3],\n                endY: projectedPositions[1][3],\n                color: \"#00f\"\n            }, void 0, false, {\n                fileName: \"/Users/felixomahony/Documents/git/camera-matrix/components/projection_matrix/three_js/DecomposedConnection.tsx\",\n                lineNumber: 78,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(DecomposedConnection, \"Wvo5tr0h9vQVWLWF9RtwDpSB7o0=\");\n_c = DecomposedConnection;\nvar _c;\n$RefreshReg$(_c, \"DecomposedConnection\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvcHJvamVjdGlvbl9tYXRyaXgvdGhyZWVfanMvRGVjb21wb3NlZENvbm5lY3Rpb24udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUF3RTtBQUM1QjtBQUNsQjtBQUVHO0FBRWQsU0FBU00scUJBQXFCLEtBWTVDO1FBWjRDLEVBQzNDQyxpQkFBaUIsRUFDakJDLGtCQUFrQixFQUNsQkMsa0JBQWtCLEVBQ2xCQyxrQkFBa0IsRUFDbEJDLFlBQVksS0FBSyxFQU9sQixHQVo0Qzs7SUFhM0MsU0FBU0MsbUJBQ1BDLGFBQXlCLEVBQ3pCRixTQUFrQjtRQUVsQixJQUFJQSxXQUFXO1lBQ2IsTUFBTUcsaUJBQWlCRCxjQUFjRSxHQUFHLENBQUMsQ0FBQ0MsS0FBS0MsTUFDN0NBLFFBQVEsSUFBSTtvQkFBQztpQkFBRSxHQUFHO29CQUFDLENBQUNELEdBQUcsQ0FBQyxFQUFFO2lCQUFDO1lBRTdCLE1BQU1FLGtCQUFrQjtnQkFDdEI7b0JBQUM7b0JBQUdKLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFBRUEsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUFFQSxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUU7aUJBQUM7Z0JBQ3JFO29CQUFDO29CQUFHO29CQUFHQSxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQUVBLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBRTtpQkFBQztnQkFDbEQ7b0JBQUM7b0JBQUc7b0JBQUc7b0JBQUdBLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBRTtpQkFBQztnQkFDL0I7b0JBQUM7b0JBQUc7b0JBQUc7b0JBQUc7aUJBQUU7YUFDYjtZQUNESyxRQUFRQyxHQUFHLENBQUMsbUJBQW1CRjtZQUMvQixNQUFNRyxrQkFBa0JwQiwrREFBWUEsQ0FBQ1ksZUFBZUs7WUFDcERDLFFBQVFDLEdBQUcsQ0FBQyxtQkFBbUJDO1lBQy9CLE9BQU9BO1FBQ1QsT0FBTztZQUNMLE1BQU1DLGlCQUFpQmpCLDJDQUFHQSxDQUFDUSxlQUFlRSxHQUFHLENBQUMsQ0FBQ0MsTUFBUUEsR0FBRyxDQUFDLEVBQUU7WUFDN0QsTUFBTUssa0JBQWtCO2dCQUN0QjtvQkFBQztvQkFBR0MsY0FBYyxDQUFDLEVBQUU7b0JBQUVBLGNBQWMsQ0FBQyxFQUFFO29CQUFFQSxjQUFjLENBQUMsRUFBRTtpQkFBQztnQkFDNUQ7b0JBQUM7b0JBQUc7b0JBQUdBLGNBQWMsQ0FBQyxFQUFFO29CQUFFQSxjQUFjLENBQUMsRUFBRTtpQkFBQztnQkFDNUM7b0JBQUM7b0JBQUc7b0JBQUc7b0JBQUdBLGNBQWMsQ0FBQyxFQUFFO2lCQUFDO2dCQUM1QjtvQkFBQztvQkFBRztvQkFBRztvQkFBRztpQkFBRTthQUNiO1lBQ0QsT0FBT0Q7UUFDVDtJQUNGO0lBRUEsTUFBTSxDQUFDQSxpQkFBaUJFLG1CQUFtQixHQUFHcEIsK0NBQVFBLENBQ3BEUyxtQkFBbUJILG9CQUFvQkU7SUFHekMsTUFBTSxDQUFDYSxvQkFBb0JDLHNCQUFzQixHQUFHdEIsK0NBQVFBLENBQzFESCxnRUFBYUEsQ0FBQ3FCLGlCQUFpQmQsbUJBQW1CQztJQUdwRE4sZ0RBQVNBLENBQUM7UUFDUnFCLG1CQUFtQlgsbUJBQW1CSCxvQkFBb0JFO0lBQzVELEdBQUc7UUFBQ0Y7S0FBbUI7SUFFdkIscUJBQ0U7OzBCQUNFLDhEQUFDTCw2Q0FBSUE7Z0JBQ0hzQixRQUFRRixrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDaENHLFFBQVFILGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNoQ0ksTUFBTUosa0JBQWtCLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQzlCSyxNQUFNTCxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDOUJNLE9BQU07Ozs7OzswQkFFUiw4REFBQzFCLDZDQUFJQTtnQkFDSHNCLFFBQVFGLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNoQ0csUUFBUUgsa0JBQWtCLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ2hDSSxNQUFNSixrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDOUJLLE1BQU1MLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUM5Qk0sT0FBTTs7Ozs7OzBCQUVSLDhEQUFDMUIsNkNBQUlBO2dCQUNIc0IsUUFBUUYsa0JBQWtCLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ2hDRyxRQUFRSCxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDaENJLE1BQU1KLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUM5QkssTUFBTUwsa0JBQWtCLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQzlCTSxPQUFNOzs7Ozs7OztBQUlkO0dBaEZ3QnhCO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvcHJvamVjdGlvbl9tYXRyaXgvdGhyZWVfanMvRGVjb21wb3NlZENvbm5lY3Rpb24udHN4P2Q5MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvamVjdFBvaW50cywgcm90YXRlQ2FtZXJhIH0gZnJvbSBcIi4uLy4uLy4uL3NjcmlwdHMvcm90YXRpb25cIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBMaW5lIGZyb20gXCIuL0xpbmVcIjtcbmltcG9ydCBRdWFkcmVsYXRlcmFsIGZyb20gXCIuL1F1YWRyZWxhdGVyYWxcIjtcbmltcG9ydCB7IGludiB9IGZyb20gXCJtYXRoanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGVjb21wb3NlZENvbm5lY3Rpb24oe1xuICBlZ29FdHJpbnNpY01hdHJpeCxcbiAgZWdvSW50cmluc2ljTWF0cml4LFxuICBjYW1FeHRyaW5zaWNNYXRyaXgsXG4gIGNhbUludHJpbnNpY01hdHJpeCxcbiAgY2FtQ29vcmRzID0gZmFsc2UsXG59OiB7XG4gIGVnb0V0cmluc2ljTWF0cml4OiBudW1iZXJbXVtdO1xuICBlZ29JbnRyaW5zaWNNYXRyaXg6IG51bWJlcltdW107XG4gIGNhbUV4dHJpbnNpY01hdHJpeDogbnVtYmVyW11bXTtcbiAgY2FtSW50cmluc2ljTWF0cml4OiBudW1iZXJbXVtdO1xuICBjYW1Db29yZHM/OiBib29sZWFuO1xufSkge1xuICBmdW5jdGlvbiBnZXRHbG9iYWxQb3NpdGlvbnMoXG4gICAgY2FtRXh0cmluc2ljczogbnVtYmVyW11bXSxcbiAgICBjYW1Db29yZHM6IGJvb2xlYW5cbiAgKTogbnVtYmVyW11bXSB7XG4gICAgaWYgKGNhbUNvb3Jkcykge1xuICAgICAgY29uc3Qgb3JpZ2luUG9zaXRpb24gPSBjYW1FeHRyaW5zaWNzLm1hcCgocm93LCBpZHgpID0+XG4gICAgICAgIGlkeCA9PT0gMyA/IFsxXSA6IFstcm93WzNdXVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNhbWVyYVBvc2l0aW9ucyA9IFtcbiAgICAgICAgWzAsIG9yaWdpblBvc2l0aW9uWzBdWzBdLCBvcmlnaW5Qb3NpdGlvblswXVswXSwgb3JpZ2luUG9zaXRpb25bMF1bMF1dLFxuICAgICAgICBbMCwgMCwgb3JpZ2luUG9zaXRpb25bMV1bMF0sIG9yaWdpblBvc2l0aW9uWzFdWzBdXSxcbiAgICAgICAgWzAsIDAsIDAsIG9yaWdpblBvc2l0aW9uWzJdWzBdXSxcbiAgICAgICAgWzEsIDEsIDEsIDFdLFxuICAgICAgXTtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FtZXJhUG9zaXRpb25zXCIsIGNhbWVyYVBvc2l0aW9ucyk7XG4gICAgICBjb25zdCBnbG9iYWxQb3NpdGlvbnMgPSByb3RhdGVDYW1lcmEoY2FtRXh0cmluc2ljcywgY2FtZXJhUG9zaXRpb25zKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ2xvYmFsUG9zaXRpb25zXCIsIGdsb2JhbFBvc2l0aW9ucyk7XG4gICAgICByZXR1cm4gZ2xvYmFsUG9zaXRpb25zO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjYW1lcmFQb3NpdGlvbiA9IGludihjYW1FeHRyaW5zaWNzKS5tYXAoKHJvdykgPT4gcm93WzNdKTtcbiAgICAgIGNvbnN0IGdsb2JhbFBvc2l0aW9ucyA9IFtcbiAgICAgICAgWzAsIGNhbWVyYVBvc2l0aW9uWzBdLCBjYW1lcmFQb3NpdGlvblswXSwgY2FtZXJhUG9zaXRpb25bMF1dLFxuICAgICAgICBbMCwgMCwgY2FtZXJhUG9zaXRpb25bMV0sIGNhbWVyYVBvc2l0aW9uWzFdXSxcbiAgICAgICAgWzAsIDAsIDAsIGNhbWVyYVBvc2l0aW9uWzJdXSxcbiAgICAgICAgWzEsIDEsIDEsIDFdLFxuICAgICAgXTtcbiAgICAgIHJldHVybiBnbG9iYWxQb3NpdGlvbnM7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgW2dsb2JhbFBvc2l0aW9ucywgc2V0R2xvYmFsUG9zaXRpb25zXSA9IHVzZVN0YXRlPG51bWJlcltdW10+KFxuICAgIGdldEdsb2JhbFBvc2l0aW9ucyhjYW1FeHRyaW5zaWNNYXRyaXgsIGNhbUNvb3JkcylcbiAgKTtcblxuICBjb25zdCBbcHJvamVjdGVkUG9zaXRpb25zLCBzZXRQcm9qZWN0ZWRQb3NpdGlvbnNdID0gdXNlU3RhdGU8bnVtYmVyW11bXT4oXG4gICAgcHJvamVjdFBvaW50cyhnbG9iYWxQb3NpdGlvbnMsIGVnb0V0cmluc2ljTWF0cml4LCBlZ29JbnRyaW5zaWNNYXRyaXgpXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRHbG9iYWxQb3NpdGlvbnMoZ2V0R2xvYmFsUG9zaXRpb25zKGNhbUV4dHJpbnNpY01hdHJpeCwgY2FtQ29vcmRzKSk7XG4gIH0sIFtjYW1FeHRyaW5zaWNNYXRyaXhdKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8TGluZVxuICAgICAgICBzdGFydFg9e3Byb2plY3RlZFBvc2l0aW9uc1swXVswXX1cbiAgICAgICAgc3RhcnRZPXtwcm9qZWN0ZWRQb3NpdGlvbnNbMV1bMF19XG4gICAgICAgIGVuZFg9e3Byb2plY3RlZFBvc2l0aW9uc1swXVsxXX1cbiAgICAgICAgZW5kWT17cHJvamVjdGVkUG9zaXRpb25zWzFdWzFdfVxuICAgICAgICBjb2xvcj1cIiNmMDBcIlxuICAgICAgLz5cbiAgICAgIDxMaW5lXG4gICAgICAgIHN0YXJ0WD17cHJvamVjdGVkUG9zaXRpb25zWzBdWzFdfVxuICAgICAgICBzdGFydFk9e3Byb2plY3RlZFBvc2l0aW9uc1sxXVsxXX1cbiAgICAgICAgZW5kWD17cHJvamVjdGVkUG9zaXRpb25zWzBdWzJdfVxuICAgICAgICBlbmRZPXtwcm9qZWN0ZWRQb3NpdGlvbnNbMV1bMl19XG4gICAgICAgIGNvbG9yPVwiIzBmMFwiXG4gICAgICAvPlxuICAgICAgPExpbmVcbiAgICAgICAgc3RhcnRYPXtwcm9qZWN0ZWRQb3NpdGlvbnNbMF1bMl19XG4gICAgICAgIHN0YXJ0WT17cHJvamVjdGVkUG9zaXRpb25zWzFdWzJdfVxuICAgICAgICBlbmRYPXtwcm9qZWN0ZWRQb3NpdGlvbnNbMF1bM119XG4gICAgICAgIGVuZFk9e3Byb2plY3RlZFBvc2l0aW9uc1sxXVszXX1cbiAgICAgICAgY29sb3I9XCIjMDBmXCJcbiAgICAgIC8+XG4gICAgPC8+XG4gICk7XG59XG4iXSwibmFtZXMiOlsicHJvamVjdFBvaW50cyIsInJvdGF0ZUNhbWVyYSIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTGluZSIsImludiIsIkRlY29tcG9zZWRDb25uZWN0aW9uIiwiZWdvRXRyaW5zaWNNYXRyaXgiLCJlZ29JbnRyaW5zaWNNYXRyaXgiLCJjYW1FeHRyaW5zaWNNYXRyaXgiLCJjYW1JbnRyaW5zaWNNYXRyaXgiLCJjYW1Db29yZHMiLCJnZXRHbG9iYWxQb3NpdGlvbnMiLCJjYW1FeHRyaW5zaWNzIiwib3JpZ2luUG9zaXRpb24iLCJtYXAiLCJyb3ciLCJpZHgiLCJjYW1lcmFQb3NpdGlvbnMiLCJjb25zb2xlIiwibG9nIiwiZ2xvYmFsUG9zaXRpb25zIiwiY2FtZXJhUG9zaXRpb24iLCJzZXRHbG9iYWxQb3NpdGlvbnMiLCJwcm9qZWN0ZWRQb3NpdGlvbnMiLCJzZXRQcm9qZWN0ZWRQb3NpdGlvbnMiLCJzdGFydFgiLCJzdGFydFkiLCJlbmRYIiwiZW5kWSIsImNvbG9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/projection_matrix/three_js/DecomposedConnection.tsx\n"));

/***/ })

});