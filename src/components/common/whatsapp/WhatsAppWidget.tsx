
import React from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

const WhatsAppWidget: React.FC = () => {
  return (
    <div>
      <FloatingWhatsApp
        phoneNumber="918056805616"
        accountName="Fresh Toys"
        chatMessage="Hello, how can I assist you today?"
        avatar="https://firebasestorage.googleapis.com/v0/b/collegeep-3d386.appspot.com/o/logoicon.PNG?alt=media&token=7beb29d5-3ab3-425b-bc55-8b9ca59470a5"
        //link logo stored in firebasestorage aniii69333 mail id
        statusMessage="Typically replies within 1 hour"
        chatboxHeight={380}
        placeholder="Type a message..."
        notification={true}
        notificationDelay={60}
        notificationSound={true}
        buttonStyle={{ backgroundColor: '#25D366', color: '#fff'  }}
        // allowClickAway not working need to fix this 
        allowEsc={true} 
      />
    </div>
  );
};

export default WhatsAppWidget;

