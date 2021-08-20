import React, { FC } from "react";
import { cn } from "@bem-react/classname";
import "./ChatsHeader.scss";

const b = cn("ChatsHeaderContainer");

const ChatsHeader: FC = ({ children }) => {
  return (
    <div className={b("")}>
      <div className={b("Name")}>Select your chat</div>
      <div className={b("CreateButton")}>{children}</div>
    </div>
  );
};

export default ChatsHeader;
