
declare global {
  interface Window {
    Scaledrone: any;
  }
}


import { useState, useEffect } from "react";
import Messages from "./components/messages";
import Input from "./components/input";
import "./styles/style.scss";

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

interface ChatState {
  member: Member;
  messages: Message[];
}

function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

const App = () => {
  const initialChatState: ChatState = {
    member: { username: randomName(), color: randomColor(),id:"" },
    messages: [],
  };

  const [chat, setChat] = useState(initialChatState);
  const [drone, setDrone] = useState<any>(null);

  useEffect(() => {
    const initDrone = () => {
      const drone = new window.Scaledrone("iYmttdfTvfBbi9jt", {
        data: chat.member,
      });
      drone.on("open", (error: any) => {
        if (error) {
          return console.error(error);
        }
        const updatedMember = { ...chat.member, id: drone.clientId };
        setChat({ ...chat, member: updatedMember });
      });
      setDrone(drone);
    };
    initDrone();
    },[]);
    
    useEffect(() => {
      if(drone) {
      const room = drone.subscribe("observable-room");
      console.log("room:", room);
      room?.on("message", (messageData: any) => {
        const { data,member } = messageData;
        const updatedMessages = [...chat.messages, { member, text:data, id:Math.random() }];
        setChat({ ...chat, messages: updatedMessages });
      });
    }
    }, [drone, chat]);
      
    

  const onSendMessage = (message: string) => {
    if (drone){
    drone.publish({
      room: "observable-room",
      message,
    });
   }
  };

  return  (
    <div className="App">
      <div className="App-header">
        <h1>My Chat App</h1>
      </div>

      <div className="chat">
        <Messages messages={chat.messages} currentMember={chat.member} />
        <Input onSendMessage={onSendMessage} />
      </div>
    </div>
  ) 
};

export default App;
