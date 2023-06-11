import {useState} from 'react';
type MessageType = {
  name: string;
  text: string;
  color: string;
};

const getColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
};

const Chat = () => {
  const [messages, setMessages] = useState <MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<MessageType>({
   name:'',
   text:'',
   color: getColor(), 
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage ({...newMessage, name:event.target.value})
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage ({...newMessage, text:event.target.value})
  };

 

  return (
    <div>
      <div>
        <input type="text"  placeholder='Ime' onChange={handleNameChange}/>
        <input type="text" placeholder='Unesite poruku' onChange={handleTextChange}/>
        <button>Šalji</button>
      </div>
    </div>
  )
}
export default Chat;