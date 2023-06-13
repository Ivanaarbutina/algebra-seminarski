import React from "react";

type MessageProp = {
  text: string;
  member: MemberProp;
};

type MemberProp = {
  color: string;
  username: string;
};

type MessagesProps = {
  messages: MessageProp[];
  currentMember: MemberProp;
};

const Messages: React.FC<MessagesProps> = ({ messages, currentMember }) => {
  return (
    <ul className="Messages-list">
      {messages.map((message, index) => (
        <li
          className="Messages-message"
          key={index}
          
        >
          <span className="avatar" style={{ backgroundColor: currentMember.color }} />
          <div className="Message-content">
            <div className="username">{currentMember.username}</div>
            <div className="text">{message.text}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Messages;



