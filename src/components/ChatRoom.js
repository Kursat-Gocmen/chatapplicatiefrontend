import React, { useState, useEffect } from 'react';
import {
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const user = AuthService.getCurrentUser();

  const fetchMessages = () => {
    UserService.getPublicMessages()
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Fout bij ophalen van berichten.', error);
      });
  };

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe('/topic/messages', (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
      fetchMessages();
    });

    setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, []);

  const handleMessageChange = (event) => {
    const { value } = event.target;
    setMessage(value.slice(0, 100));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && message.trim()) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.trim() && user && user.username) {
      const chatMessage = {
        nickname: user.username, 
        content: message,
        timestamp: new Date().toISOString(),
      };
      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      setMessage('');
    }
  };  

  return (
    <div>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>{msg.nickname.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1">{msg.nickname}</Typography>
                    <Typography variant="caption" style={{ marginLeft: '1em' }}>
                      {new Intl.DateTimeFormat('nl-NL', {
                        hour: 'numeric',
                        minute: '2-digit',
                      }).format(new Date(msg.timestamp))}
                    </Typography>
                  </div>
                </React.Fragment>
              }
              secondary={msg.content}
            />
          </ListItem>
        ))}
      </List>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          placeholder="Typ een bericht"
          value={message}
          onChange={handleMessageChange}
          onKeyPress={handleKeyPress}
          fullWidth
        />
        <IconButton id="sendpublic" onClick={sendMessage} disabled={!message.trim()}>
        send
      </IconButton>
      </div>
    </div>
  );
};

export default ChatRoom;
