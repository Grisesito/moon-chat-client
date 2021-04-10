import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

// import TextContainer from '../TextContainer/TextContainer';
 import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
 import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'localhost:5000';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
//   const [room, setRoom] = useState('');
   const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name)

    socket.emit('join', { name }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    
  },[])

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    
    <div className="outContainer">
      <div className="container">
          
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
     
    </div>
  );
  }

export default Chat;