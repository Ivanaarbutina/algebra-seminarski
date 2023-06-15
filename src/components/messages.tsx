
interface Message {
  member: {
    id: number;
    clientData: {
      color: string;
      username: string;
    };
  };
  text: string;
}

interface MessagesProps {
  messages: Message[];
  currentMember: {
    id: number;
  };
}

const Messages = ({ messages, currentMember }:MessagesProps) => {
  const renderMessage = (message:Message) => {
    const { member, text } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    return (
      <li className={className}>
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
  };

  return (
    <ul className="Messages-list">
      {messages.map((message) => renderMessage(message))}
    </ul>
  );
};

export default Messages;
