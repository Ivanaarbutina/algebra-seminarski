import Messages from './components/messages';
import Input from './components/input';
import './styles/style.scss';
import  { useState, useEffect } from 'react';




const randomName = () => {
  const adjectives = [
    "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet",
    "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
    "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little",
    "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered",
    "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
    "polished", "ancient", "purple", "lively", "nameless"
  ];
  const nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow",
    "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush",
    "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water",
    "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return adjective + noun;
};

const randomColor = () => {
  return "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
};

type MessageProp = {
  text: string;
  member: MemberProp;
};

type MemberProp = {
  color: string;
  username: string;
};

const App = () => {
  const [messages, setMessages] = useState <MessageProp[]>([]);
  const [room, setRoom] = useState<any>(null); // Dodajemo stanje za sobu (room)

  const member: MemberProp = {
    color: randomColor(),
    username: randomName()
  };

  useEffect(() => {
    // Kreiranje instance Scaledrone objekta
    const newDrone = new Scaledrone('iYmttdfTvfBbi9jt ');
    setRoom(newDrone.subscribe('observable-room'));

    // Pretplata na sobu
    const newRoom = newDrone.subscribe('observable-room');
    setRoom(newRoom);

    // Ovdje možete dodati rukovanje događajima primanja poruka u sobi
    newRoom.on('message', (message: any) => {
      const newMessage: MessageProp = {
        text: message.data,
        member: {
          color: message.member.color,
          username: message.member.clientData.username
        }
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Vraćanje funkcije čistača (cleanup) za odspajanje prilikom unmounta komponente
    return () => {
      newDrone.close(); // Zatvaranje veze s Scaledroneom
    };
  }, []); // Prvi argument useEffect-a je prazno polje, tako da će se izvršiti samo jednom pri prvom renderiranju komponente

  const handleSendMessage = (message: string) => {
    if (room) {
      // Slanje poruke na sobu
      room.publish({
        data: message,
        clientData: {
          username: member.username
        }
      });

      const newMessage: MessageProp = {
        text: message,
        member: member
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };
  

  return (
    <div className="App">
      <div className="App-header">
        <h1>My Chat App</h1>
      </div>
      <Messages 
        messages={messages}
        currentMember={member} />
      <Input
         onSendMessage={handleSendMessage} />
    </div>

  );
};

export default App;
