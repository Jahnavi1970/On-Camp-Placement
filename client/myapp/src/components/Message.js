import React, { useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import MessageContext from "../context/message";
import { MESSAGE_TYPES } from "../constants/constant";

const Message = () => {
  const { message, setMessage } = useContext(MessageContext);

  if (!message?.description) {
    return null;
  }

  const handleClose = () => {
    setMessage({
      type: null,
      description: null,
    });
  };

  return (
    <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={message?.type === MESSAGE_TYPES.DANGER ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {message.description}
      </Alert>
    </Snackbar>
  );
};

export default Message;
