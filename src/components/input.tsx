
import  {useState } from "react";
interface InputProps {
  onSendMessage: (text: string) => void;
}
const Input =  ({ onSendMessage }:InputProps) => {
  const initialState = {
    text: ""
  };
  const [state, setState] = useState(initialState);
  

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({text:e.target.value});
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSendMessage(state.text);
    setState({text:""});
  };


  return (
    <div className="Input">
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          onChange={(e) => onChange(e)}
          value={state.text}
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