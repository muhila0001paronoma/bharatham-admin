import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Check, CheckCheck, Info } from 'lucide-react';
import '../Chats.css';

export default function TeacherChats() {
    const [conversations, setConversations] = useState([
        {
            id: 2,
            name: "Admin",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop&q=80",
            lastMessage: "Hello Sir, I've checked the video...",
            timestamp: "16:45",
            unreadCount: 0,
            isOnline: true,
            isRead: true
        },
        {
            id: 1,
            name: "Bharathnatyam Basics",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80",
            lastMessage: "Welcome to the Course",
            timestamp: "16:45",
            unreadCount: 0,
            isOnline: false,
            isGroup: true,
            members: "25 members",
            isRead: true
        }
    ]);

    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (conversations.length > 0 && !selectedChat) {
            handleSelectChat(conversations[0]);
        }
    }, []);

    useEffect(() => {
        if (selectedChat) {
            if (selectedChat.id === 2) {
                setMessages([
                    {
                        id: 1,
                        senderId: 'teacher',
                        senderName: 'Teacher User',
                        text: "Hello Admin, I've uploaded a new Adavu - Tatta Metta lesson video. Can you please review and approve it?",
                        timestamp: "15:42",
                        isRead: true
                    },
                    {
                        id: 2,
                        senderId: 'admin',
                        senderName: 'Admin',
                        text: "Hello Sir, I've checked the video. The quality and explanation are clear. I'll approve it now and publish it under Beginner Level.",
                        timestamp: "15:42",
                        isRead: true
                    }
                ]);
            } else {
                setMessages([]);
            }
        }
    }, [selectedChat]);


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setConversations(prev =>
            prev.map(c =>
                c.id === chat.id ? { ...c, unreadCount: 0, isRead: true } : c
            )
        );
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedChat) return;

        const message = {
            id: Date.now(),
            senderId: 'teacher',
            senderName: 'Teacher User',
            text: newMessage.trim(),
            timestamp: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).slice(0, 5),
            isRead: false
        };

        setMessages(prev => [...prev, message]);

        // Update conversation last message
        setConversations(prev =>
            prev.map(c =>
                c.id === selectedChat.id
                    ? { ...c, lastMessage: `you: ${newMessage.trim()}`, timestamp: message.timestamp }
                    : c
            )
        );

        setNewMessage('');
    };

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = () => 'Today';

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="chats-page">
            <div className="chats-container">
                {/* Messages List Panel */}
                <div className="chats-messages-panel">
                    <div className="chats-messages-header">
                        <h2 className="chats-messages-title">Messages</h2>
                    </div>

                    <div className="chats-messages-search">
                        <Search className="chats-search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="chats-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="chats-sort-container">
                        <select
                            className="chats-sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Sort by Newest</option>
                            <option value="oldest">Sort by Oldest</option>
                            <option value="unread">Sort by Unread</option>
                        </select>
                    </div>

                    <div className="chats-conversations-list">
                        {filteredConversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                className={`chats-conversation-item ${selectedChat?.id === conversation.id ? 'active' : ''
                                    }`}
                                onClick={() => handleSelectChat(conversation)}
                            >
                                <div className="chats-conversation-avatar">
                                    {conversation.avatar ? (
                                        <img src={conversation.avatar} alt={conversation.name} />
                                    ) : (
                                        <div className="chats-avatar-placeholder">
                                            {getInitials(conversation.name)}
                                        </div>
                                    )}
                                </div>
                                <div className="chats-conversation-content">
                                    <div className="chats-conversation-header">
                                        <span className="chats-conversation-name">{conversation.name}</span>
                                        <span className="chats-conversation-time">{conversation.timestamp}</span>
                                    </div>
                                    <div className="chats-conversation-footer">
                                        <span className="chats-conversation-message">{conversation.lastMessage}</span>
                                        {conversation.unreadCount > 0 && (
                                            <span className="chats-unread-badge">{conversation.unreadCount}</span>
                                        )}
                                        {conversation.isRead && conversation.unreadCount === 0 && (
                                            <CheckCheck className="chats-read-icon" size={16} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Chat Panel */}
                <div className="chats-active-chat-panel">
                    {selectedChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="chats-chat-header">
                                <div className="chats-chat-header-left">
                                    <div className="chats-chat-avatar">
                                        {selectedChat.avatar ? (
                                            <img src={selectedChat.avatar} alt={selectedChat.name} />
                                        ) : (
                                            <div className="chats-avatar-placeholder">
                                                {getInitials(selectedChat.name)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="chats-chat-info">
                                        <div className="chats-chat-name">{selectedChat.name}</div>
                                        {selectedChat.isGroup ? (
                                            <div className="chats-chat-status" style={{ color: '#666' }}>
                                                {selectedChat.members}
                                            </div>
                                        ) : (
                                            <div className={`chats-chat-status ${selectedChat.isOnline ? 'online' : 'offline'}`}>
                                                {selectedChat.isOnline ? 'Online' : 'Offline'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="chats-chat-header-right">
                                    <Info className="chats-info-icon" size={20} />
                                </div>
                            </div>

                            {/* Messages Container */}
                            <div className="chats-messages-container" ref={messagesContainerRef}>
                                <div className="chats-date-separator">
                                    <div className="chats-date-line"></div>
                                    <span className="chats-date-text">{formatDate()}</span>
                                    <div className="chats-date-line"></div>
                                </div>

                                <div className="chats-messages-list">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`chats-message ${message.senderId === 'teacher' ? 'sent' : 'received'
                                                }`}
                                        >
                                            <div className="chats-message-bubble">
                                                <div className="chats-message-text">{message.text}</div>
                                                <div className="chats-message-footer">
                                                    <span className="chats-message-time">{message.timestamp}</span>
                                                    {message.senderId === 'teacher' && (
                                                        <div className="chats-message-status">
                                                            {message.isRead ? (
                                                                <CheckCheck className="chats-read-check" size={14} />
                                                            ) : (
                                                                <Check className="chats-sent-check" size={14} />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="chats-message-input-container">
                                <form onSubmit={handleSendMessage} className="chats-message-form">
                                    <input
                                        type="text"
                                        placeholder="Type your message here.."
                                        className="chats-message-input"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <button type="submit" className="chats-send-button">
                                        <Send size={18} />
                                        <span>Send message</span>
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="chats-empty-state">
                            <p>Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
