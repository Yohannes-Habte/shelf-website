// frontend/src/components/NotificationForm.js
import { useState } from "react";
import axios from "axios";
import "./SubscriberNotification.scss";
import { RiMessage2Fill } from "react-icons/ri";
import { MdSubject } from "react-icons/md";
import { API } from "../../../utils/security/secreteKey";

const SubscriberNotification = () => {
  // local state variables
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/subscribers/notify`, {
        subject,
        text,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error sending notification", error);
      setMessage("Error sending notification");
    }
  };

  return (
    <section className="subscribers-notification-wrapper">
      <h2 className="subscribers-notification-title">Send Notification</h2>
      <form onSubmit={handleSubmit} className="subscribers-notification-form">
        <div className="input-container">
          <label>Subject:</label>
          <MdSubject className="icon" />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-container">
          <label>Notification Text Message:</label>
          <RiMessage2Fill className="icon" />
          <textarea
            value={text}
            cols={30}
            rows={10}
            onChange={(e) => setText(e.target.value)}
            className="input-field"
          ></textarea>
        </div>
        <button className="subscriber-notification-btn" type="submit">
          Send Notification
        </button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
};

export default SubscriberNotification;
