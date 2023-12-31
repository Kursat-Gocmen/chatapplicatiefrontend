import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import ChatRoom from "./ChatRoom";
import PrivateChatRoom from "./PrivateChatRoom";


const UserBoard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        console.log(error);
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
      <ChatRoom />
        <h3>{content}</h3>
      </header>
      <header className="jumbotron">
      <PrivateChatRoom />
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default UserBoard;
