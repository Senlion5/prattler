import React, { FC, useState } from "react";
import { MessageArea } from "../ComponentsStyles";
import { createTimestamp } from "../../utils/timestamp";
import { cn } from "@bem-react/classname";
import "./MessageField.scss";

import { MessageData } from "../../interfaces/chats";

interface MessageFieldProps {
  onSubmit: (message: MessageData) => void;
}

const b = cn("MessageFieldContainer");

const MessageField: FC<MessageFieldProps> = ({ onSubmit }) => {
  const [messageValue, setMessageValue] = useState<string>("");

  const onKeyPress = (e: React.KeyboardEvent<any>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
      setMessageValue("");
    }
  };

  const sendMessage = () => {
    if (messageValue.trim() === "") {
      return;
    }

    const message = {
      content: messageValue.trim(),
      timestamp: createTimestamp(),
    };

    onSubmit(message);
  };

  return (
    <div className={b("")}>
      <MessageArea
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        onKeyPress={onKeyPress}
        fullWidth
        multiline
        maxRows={5}
        placeholder=" Type your message here ..."
      />
    </div>
  );
};

export default MessageField;
