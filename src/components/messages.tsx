import React from "react";
import "./../styles/style.scss"

interface Message {
  member: {
    id: string;
    clientData: {
      color: string;
      username: string;
    };
  };
  text: string;
}

interface Props {
  messages: Message[];
  currentMember: {
    id: string;
    clientData: {
      color: string;
      username: string;
    };
  };
}

const Messages: React.FC<Props> = ({ messages, currentMember }) => {
  return (
    <ul className="Messages-list">
      {messages.map((message, index) => {
        const { member, text } = message;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe
          ? "Messages-message currentMember"
          : "Messages-message";
        return (
          <li key={index} className={className}>
            <span
              className="avatar"
              style={{ backgroundColor: member.clientData.color }}
            />
            <div className="Message-content">
              <div className="username">{member.clientData.username}</div>
              <div className="text">{text}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Messages;