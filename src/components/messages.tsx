
interface Member {
  username: string;
  color: string;
  id: string;
}

interface Message {
  member: Member;
  text: any;
  id: any;
}

interface MessagesProps {
  messages: Message[];
  currentMember: Member;
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
          style={{ backgroundColor: member.color }}
        ></span>
        <div className="Message-content">
          <div className="username">{member.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };

  return (
    <ul className="Messages-list">
     {messages.map((m) => renderMessage(m))}
    </ul>
  );
};

export default Messages;