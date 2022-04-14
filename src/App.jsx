import {useState,useEffect} from 'react';
import Cookies from 'js-cookie';
import { socket } from './util/socket';
import axios from 'axios'
import {Auth} from "./components";
import Dashboard from './components/Dashboard';
import Searching from './Animations/Searching';
import Alert from './components/Alert';
import Room from './components/Room';

import "./App.css";
import "./Animation.css";
import './Alerts.css';
import 'font-awesome/css/font-awesome.min.css'

const App = () => {

  window.addEventListener('beforeunload', async () => {
    if(room && !paired) await axios.delete(roomRoute, {data:{_id:room}});
  });

  const roomRoute = 'https://meetcode-api.herokuapp.com/api/rooms';
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(Cookies.get('user'));
  const [room, setRoom] = useState("");
  const [paired, setPaired] = useState(false);
  const [searching, isSearching] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, startTimer] = useState(false);
  const [alert, showAlert] = useState(false);

  const foundUser = (newUser) => {
    setUser(newUser);
    Cookies.set('user',user);
  }

  const findRoom = () => {
    if(room) return;
    axios.get(roomRoute).then(res => {
        setRoom(res.data);
        socket.emit('room-found',res.data);
        socket.emit('user-found', res.data);
        setPaired(true);
    }, err => {
      axios.post(roomRoute, {_id: user._id,open:true}).then(res => {
        setRoom(res.data);
        socket.emit('room-found',res.data);
        //start animation while waiting
        isSearching(true);
        startTimer(true);
      });
    });
  }

  useEffect(() => {
    let interval = null;
    if (timerStarted) {
      interval = setInterval(async () => {
        setSeconds(seconds => seconds + 1);
        if(seconds > 120) {
          clearInterval(interval);
          startTimer(false);
          isSearching(false);
          setRoom("");
          showAlert(true);
          await axios.delete(roomRoute, {data:{_id:room}});
        }
      }, 1000);
    } else if (!timerStarted && seconds) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerStarted, seconds,room]);


  socket.on('paired', () => {
    //end animation while waiting
    startTimer(false);
    isSearching(false);
    setPaired(true);
  });

  if(!auth) return <Auth setAuth = {setAuth} setUser = {foundUser}/>
  if(paired) return (
    <div>
        <Room roomID = {room}/>
    </div>
  )
  return (
   <div>
      {alert &&<Alert onClick = {() => showAlert(false)} title="No Coders :(" message="Sorry. It looks like there aren't any coders online right now."></Alert>}
      {searching && <Searching/>}
      <Dashboard setUser = {setUser} findRoom = {findRoom} setAuth = {setAuth} />
   </div>
  )
}

export default App