declare global {
  interface Window {
    Scaledrone: any;
  }
}

import  { useState, useEffect } from "react";
import Messages from "./components/messages";
import Input from "./components/input";
import "./styles/style.scss";

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
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
    id: 0,
  });

  useEffect(() => {
    const drone = new window.Scaledrone('iYmttdfTvfBbi9jt', {
      data: member,
    });

    drone.on('open', (error:any) => {
      if (error) {
        console.error(error);
      } else {
        const updatedMember = { ...member };
        updatedMember.id = drone.clientId;
        setMember(updatedMember);
      }
    });

    const room = drone.subscribe('observable-room');
    room.on('data', (data:any, member:any) => {
      setMessages((prevMessages: never[]) => [...prevMessages, { member, text: data }] as never[]);

    });

    // Cleanup function
    return () => {
      room.unsubscribe(); // Unsubscribe from the room
      drone.close(); // Close the connection
    };
  }, []);

  const onSendMessage = (message:any) => {
    const drone = new window.Scaledrone('iYmttdfTvfBbi9jt');
    drone.publish({
      room: 'observable-room',
      message,
    });
  };

  
  
  return (
    <div className="App">
        <div className="App-header">
        <h1>My Chat App</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}

export default App;
