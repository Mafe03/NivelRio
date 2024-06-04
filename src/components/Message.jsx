// src/components/Message.jsx
import React from 'react';

const Message = ({ notification }) => {
  return (
    <div>
      <h4>{notification.title}</h4>
      <p>{notification.body}</p>
    </div>
  );
};

export default Message;
