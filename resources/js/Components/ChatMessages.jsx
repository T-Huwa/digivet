import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Bubble from "./Bubbles/Bubble";

const ChatMessages = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const intervalRef = useRef(null);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`/chatroom/${userId}`);
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch messages initially
        fetchMessages();

        // Set up an interval to fetch messages every 3 seconds
        intervalRef.current = setInterval(fetchMessages, 3000);

        // Cleanup interval on component unmount
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [userId]);

    if (loading) {
        return <div>Loading messages...</div>;
    }

    return (
        <div>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <Bubble message={message} />
                        {/* <strong>
                            {message.sender_id === userId ? "Them" : "You"}:
                        </strong>{" "}
                        {message.message} */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatMessages;
