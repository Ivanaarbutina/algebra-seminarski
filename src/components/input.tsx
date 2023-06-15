import  { ChangeEvent, FormEvent, useState } from "react";

type InputProps = {
  onSendMessage: (text: string) => void;
};

const Input = ({ onSendMessage }:InputProps) => {
  const [text, setText] = useState("");

  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText("");
    onSendMessage(text);
  };

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus={true}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Input;
