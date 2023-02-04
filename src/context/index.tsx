/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from "react";

const MaterialUI = createContext<any>(null);

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// types
interface StateTypes {
  miniSidenav: boolean;
  transparentSidenav: boolean;
  whiteSidenav: boolean;
  sidenavColor:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
  direction: "ltr" | "rtl";
  layout: "dashboard" | "page";
  darkMode: boolean;
}

interface ActionTypes {
  type:
    | "MINI_SIDENAV"
    | "TRANSPARENT_SIDENAV"
    | "WHITE_SIDENAV"
    | "SIDENAV_COLOR"
    | "TRANSPARENT_NAVBAR"
    | "FIXED_NAVBAR"
    | "OPEN_CONFIGURATOR"
    | "DIRECTION"
    | "LAYOUT"
    | "DARKMODE";
  value: any;
}

function reducer(state: StateTypes, action: ActionTypes) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MaterialUIControllerProvider({ children }: { children: ReactNode }): JSX.Element {
  const initialState: StateTypes = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    transparentNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    sidenavColor: "info",
    darkMode: false,
    fixedNavbar: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 PRO React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Context module functions
const setMiniSidenav = (
  dispatch: (arg: { type: "MINI_SIDENAV"; value: boolean }) => void,
  value: boolean
) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (
  dispatch: (arg: { type: "TRANSPARENT_SIDENAV"; value: boolean }) => void,
  value: boolean
) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (
  dispatch: (arg: { type: "WHITE_SIDENAV"; value: boolean }) => void,
  value: boolean
) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (
  dispatch: (arg: {
    type: "SIDENAV_COLOR";
    value: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  }) => void,
  value: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark"
) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (
  dispatch: (arg: { type: "TRANSPARENT_NAVBAR"; value: boolean }) => void,
  value: boolean
) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (
  dispatch: (arg: { type: "FIXED_NAVBAR"; value: boolean }) => void,
  value: boolean
) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (
  dispatch: (arg: { type: "OPEN_CONFIGURATOR"; value: boolean }) => void,
  value: boolean
) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (
  dispatch: (arg: { type: "DIRECTION"; value: "ltr" | "rtl" }) => void,
  value: "ltr" | "rtl"
) => dispatch({ type: "DIRECTION", value });
const setLayout = (
  dispatch: (arg: { type: "LAYOUT"; value: "dashboard" | "page" }) => void,
  value: "dashboard" | "page"
) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (
  dispatch: (arg: { type: "DARKMODE"; value: boolean }) => void,
  value: boolean
) => dispatch({ type: "DARKMODE", value });

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
};
