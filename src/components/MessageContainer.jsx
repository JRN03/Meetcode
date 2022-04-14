import {useState} from 'react'
import { socket } from '../util/socket';

const MessageContainer = ({room}) => {

  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({});

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('send-message',form.message,room);
    setMessages([...messages,{message:form.message,type:"sent"}]);
    e.target[0].value = "";
  }

  const handleChange = (e) => {
    e.preventDefault();
    setForm({...form,[e.target.name]:e.target.value})
  }

  socket.on('receive-message',message => {
    setMessages([...messages,{message: message, type:"recieved"}]);
  });
  
  return (
    <div className = "message-container">
        <h1 className = "messages-header">Chatting with User</h1>
        <div className = 'messages'>
            {messages.map(message => 
            <div className={message.type === "sent" ? "message-wrapper sent" : "message-wrapper received"}>
                <p className={message.type === "sent" ? "sent" : "received"}>{message.message}</p>
            </div>)}
        </div>
        <div className = "message-util">
            <form autoComplete='off' onSubmit = {sendMessage}>
                <input autoComplete = "off" className = 'messageInput' onChange = {handleChange} type='text' name='message' placeholder='Enter a message'/>
            </form>
        </div>
    </div>
  )
}

export default MessageContainer