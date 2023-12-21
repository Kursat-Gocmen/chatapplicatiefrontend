import axios from 'axios';
import authHeader from './auth-header';


const ENDPOINTFORPRIVATECHAT = 'http://localhost:8080/api/private-chat/';

  const getPrivateMessages = (chatRoomId) => {
    return axios.get(`http://localhost:8080/api/private-chat/messages/${chatRoomId}`);
  };

    
  const createChatRoom = (currentUserId, selectedUserId) => {
    return axios.post(
      `${ENDPOINTFORPRIVATECHAT}create-room/${currentUserId}/${selectedUserId}`,{},{ headers: authHeader() });
  };
  
  const ChatService = {
    getPrivateMessages,
    createChatRoom,
  };
  
  export default ChatService;
  