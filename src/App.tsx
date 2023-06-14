// @ts-nocheck
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

function App() {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    id:"",
    username: randomName(),
    color: randomColor(),
  });
  const [scaledrone, setScaledrone] = useState(null);

  useEffect(() => {
    const scaledroneInit = new window.Scaledrone("iYmttdfTvfBbi9jt", {
      data: member,
    });

    const scaledrone = scaledroneInit;

    scaledroneInit.on("open", (error) => {
      if (error) {
        console.error(error);
      } else {
        const updatedMember = {
          id: scaledrone.clientId, // Postavite id na clientId
          clientData: { ...member.clientData } // Očuvajte prethodne podatke
        };
        setMember(updatedMember);
        setScaledrone(scaledrone);
      }
    });

    const room = scaledrone.subscribe("observable-room");
    room.on("data", (data, member) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { member, text: data },
      ]);
    });

    return () => {
      scaledrone.close();
    };
  }, []);

  const onSendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { member: member, text: message },
    ]);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>My Chat App</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} scaledrone={scaledrone} />
    </div>
  );
}

export default App;
