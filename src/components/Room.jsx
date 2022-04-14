import {useState} from 'react'
import Sample from './Problems/sample'
import Editor from './Editor'
import Shell from './Shell'
import MessageContainer from './MessageContainer'
import { socket } from '../util/socket';

const Room = ({roomID}) => {

  const [output, setOutput] = useState("");

  return (

    <div className = "room">
       <div className = 'room-wrapper'>
            <div className='header'>
                 <h1>
                     <span>{"<"}</span> Meetcode <span>{"/>"}</span>
                 </h1>
            </div>
            <hr/>
            <div className = "problem-container">
                <Sample/>
            </div>
            <div className = "main">
                <Editor setOutput = {setOutput} room = {roomID}/>
                <MessageContainer room = {roomID}/>
            </div>
            <Shell output = {output} />
       </div>
    </div>

  )
}

export default Room