import Topbar from './Topbar';
import AceEditor from 'react-ace';
import {useState} from 'react'
import { socket } from '../util/socket';
import axios from 'axios';
import { pyTestScript, javaTestScript, cTestScript, cppTestScript } from './Problems/sample';

const Editor = ({room, setOutput}) => {

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("py");
  const [script, setScript] = useState(pyTestScript);

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/compile', {code:code+script,language:language})
      .then(res => {
        console.log(code+pyTestScript);
        setOutput(prev => prev+"> "+res.data.output)}, rej => console.log(rej));

  }
  const clear = () => {
    setCode("");
    setOutput("");
    socket.emit('code-change-in',"", room);
  }
  const codeChange = (value) => {
    setCode(value);
    socket.emit('code-change-in',value,room);
  }
  const languageChange = (e) => {
    setLanguage(e.target.value);
    switch(e.target.value){
      case 'py':
        setScript(pyTestScript);
        break;
      case 'java':
        setScript(javaTestScript);
        break;
      case 'c':
        setScript(cTestScript);
        break;
      case 'cpp':
        setScript(cppTestScript);
        break; 
    }
    socket.emit('language-change-in',e.target.value,room);
  }

  socket.on('code-change-out', (value) => {
    setCode(value);
  });
  socket.on('language-change-out', (lang) => {
    setLanguage(lang);
    switch(lang){
      case 'py':
        setScript(pyTestScript);
        break;
      case 'java':
        setScript(javaTestScript);
        break;
      case 'c':
        setScript(cTestScript);
        break;
      case 'cpp':
        setScript(cppTestScript);
        break; 
    }
  });

  return (
    <div className = "editor">
        <Topbar onSubmit = {onSubmit} onClear = {clear} onLanguageChange = {languageChange} language={language} />
        <AceEditor
            className = "ace"
            onChange = {codeChange}
            value = {code}
            width = "100%"
            height = "630px"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 3,
              highlightActiveLine: false,
              showPrintMargin: false
            }}
        />  
    </div>
  )
}

export default Editor