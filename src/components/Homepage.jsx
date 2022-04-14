import Problem from "./Problems/sample";
import Toolbar from "./Toolbar";
import AceEditor from 'react-ace';
import { socket } from '../util/socket';
import {useState} from 'react';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

const Homepage = ({room}) => {

  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({});
  const [code, setCode] = useState("Default");
  const [language, setLanguage] = useState("Python");

  const codeChange = (value) => {
    setCode(value);
    socket.emit('code-change-in',value,room);
  }

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
    socket.emit('language-change-in',e.target.value,room);
  }

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
  socket.on('code-change-out', (value) => {
    setCode(value);
  });
  socket.on('language-change-out', (lang) => {
    setLanguage(lang);
  });
  return (
    <div className = 'homepage'>
            <div className = 'wrapper'>
              <Problem />
              <Toolbar changeLanguage={changeLanguage} language = {language} />
              <div className='editors'>
                  <AceEditor
                      theme = "twilight"
                      onChange = {codeChange}
                      value = {code}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 3,
                        highlightActiveLine: false
                      }}
                  />  
                  <div className = "message-container" style = {{background:"green"}}>
                    <h1>Chatting with some person</h1>
                    <div className = "messages">
                      {messages.map(message => 
                        <div className={message.type === "sent" ? "message-wrapper sent" : "message-wrapper received"}>
                          <p className={message.type === "sent" ? "sent" : "received"}>{message.message}</p>
                        </div>
                      )}
                    </div>
                    <div className = 'message-util'>
                        <form autoComplete='off' onSubmit = {sendMessage} className = 'message-form'>
                          <input autoComplete = "off" onChange = {handleChange} className = 'messageInput' type='text' name='message' placeholder='Enter a message'/>
                          <button>Send</button>
                        </form>
                    </div>
                  </div>
              </div>
            </div>
        </div>
  )
}

export default Homepage