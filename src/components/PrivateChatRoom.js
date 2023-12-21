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
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import ChatService from '../services/chat.service';

const PrivateChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUser = AuthService.getCurrentUser(); 
  const [users, setUsers] = useState([]);

  const fetchMessages = (chatRoomId) => {
    ChatService.getPrivateMessages(chatRoomId)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching private messages.', error);
      });
  };

  const fetchUsers = () => {
    UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users', error);
      });
  };

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/private-ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe('/topic/private-message', (message) => {
        const receivedMessage = JSON.parse(message.body);

        if (receivedMessage.receiverId === currentUser.id || receivedMessage.senderId === currentUser.id) {
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      });

      fetchUsers();
    });

    setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, [currentUser.id]);

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
    if (message.trim() && currentUser && currentUser.username && selectedUser) {
      const chatMessage = {
        senderId: currentUser.id,
        receiverId: selectedUser,
        content: message,
        timestamp: new Date().toISOString(),
      };
      stompClient.send('/app/private-chat', {}, JSON.stringify(chatMessage));
      setMessage('');
    }
  };

  const handleOpenDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleSelectUser = (selectedUserId) => {
    ChatService.createChatRoom(currentUser.id, selectedUserId)
      .then((chatRoomResponse) => {
        const chatRoom = chatRoomResponse.data;
        
        // Check if chatRoomId is present in the response
        if (chatRoom && chatRoom.chatRoomId) {
          const chatRoomId = chatRoom.chatRoomId;  

          // Now you can use chatRoomId as needed
          fetchMessages(chatRoomId);
          setSelectedUser(selectedUserId);
          handleCloseDropdown();
        } else {
          console.error('Error: chatRoomId is undefined');
        }
      })
      .catch((error) => {
        console.error('Error creating or fetching chat room', error);
      });
  };
  
  

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button
          aria-controls="user-dropdown"
          aria-haspopup="true"
          onClick={handleOpenDropdown}
        >
         {selectedUser ? `Chatting with ${users.find(user => user.id === selectedUser)?.username}` : 'Select User to Chat'}
        </Button>
        <Menu
        id="user-dropdown"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseDropdown}
      >
        {users
          .filter((user) => user.id !== currentUser.id)
          .map((filteredUser) => (
            <MenuItem key={filteredUser.id} onClick={() => handleSelectUser(filteredUser.id)}>
              {filteredUser.username}
            </MenuItem>
          ))}
      </Menu>
      </div>

      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>{currentUser.username.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1">{msg.senderId === currentUser.id ? currentUser.username : users.find(user => user.id === msg.senderId)?.username}</Typography>
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
          placeholder="Type a message"
          value={message}
          onChange={handleMessageChange}
          onKeyPress={handleKeyPress}
          fullWidth
        />
        <IconButton onClick={sendMessage} disabled={!message.trim()}>
          send
        </IconButton>
      </div>
    </div>
  );
};

export default PrivateChatRoom;