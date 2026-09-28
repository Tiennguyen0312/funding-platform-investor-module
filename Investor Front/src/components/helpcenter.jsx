import React, { useState } from "react";
import { useAuth } from "../customHooks/AuthContext";
import InvestorChatBox from "./InvestorChatBox";
import AdminChatPage from "./AdminChatPage";

export default function HelpCenter() {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);

  if (!user) {
    return <p>Loading user info...</p>;
  }

  if (user.userType === "investor") {
    return (
      <div className="helpcenter-container">
        
        <h2 className="helpcenter-title"> 
          First time using the app? Or having a trouble? We have call center staffs and departments ready to support you 24/7!
        </h2>
        <div className="helpcenter-intro">
          <p>Have a problem with the transaction? Call our finance team at +44 (0) 7505566105, we will help you.</p>
          
          <p>Don't know how to use our product? Start a chat with us just by click the message icon below.</p>
          
          <p>If there is an emergency or you got a technology attack. Call our Seurity Team immidiately at +44 (0) 7505566105. We will protect you at any cost. </p>
        </div>
        {showChat && (
          <div className="chat-container-left">
            <InvestorChatBox
              username={user.username}
              onClose={() => setShowChat(false)}
            />
          </div>
        )}
        {!showChat && (
          <div className="chat-button-wrapper">
            <button
              className="floating-chat-btn"
              onClick={() => setShowChat(true)}
              title="Click here to chat with our admin"
            >
              <i className="chat-icon-graphic"></i>
            </button>
            <span className="chat-button-label">
              Click here to chat with our admin
            </span>
          </div>
        )}
      </div>
    );
  } else if (user.userType === "admin") {
    return (
      <div>
        <AdminChatPage />
      </div>
    );
  } else {
    return <p>Invalid user type.</p>;
  }
}