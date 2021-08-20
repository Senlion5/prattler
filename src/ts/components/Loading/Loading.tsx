import React, { FC } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { cn } from "@bem-react/classname";
import "./Loading.scss";

interface LoadingProps {
  message: string;
}

const b = cn("LoadingScreen");

const Loading: FC<LoadingProps> = ({ message = "Loading ..." }) => {
  return (
    <div className={b("")}>
      <div className={b("LoadingView")}>
        <div className={b("LoadingView_Container", ["Message"])}>
          {message}
          <LoadingIndicator />
        </div>
      </div>
    </div>
  );
};

export default Loading;
