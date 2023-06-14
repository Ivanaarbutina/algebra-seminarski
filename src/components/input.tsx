
import  { useState, FormEvent, ChangeEvent } from "react";

interface Props {
  onSendMessage: (message: string) => void;
  scaledrone: any;
}

function Input({onSendMessage, scaledrone}: Props) {
  const [text, setText] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (scaledrone && scaledrone.connected) {
    onSendMessage(text);
    setText("");
  } else {
      console.log("Niste povezani na Scaledrone.");
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Input;
