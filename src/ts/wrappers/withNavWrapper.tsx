import React from "react";
import NavBar from "../components/NavBar/NavBar";

const getComponentName = (Component: React.ComponentType<any>) => {
  return Component.displayName || Component.name || "Component";
};

const withNavWrapper =
  (Component: React.ComponentType<any>, config: any) => (props: any) => {
    const viewName = getComponentName(Component);

    return (
      <>
        <NavBar {...config} view={viewName} />
        <Component {...props} />
      </>
    );
  };

export default withNavWrapper;
