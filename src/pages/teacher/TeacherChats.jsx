import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Check, CheckCheck, Info, Plus, X, Users, User as UserIcon, UserPlus, Trash2, Shield } from 'lucide-react';
import { chatService } from '../../services/chatService';
import { messageService } from '../../services/messageService';
import { userService } from '../../services/userService';
import '../Chats.css';

export default function TeacherChats() {
    const [currentUser, setCurrentUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [newMessage, setNewMessage] = useState('');
    const [userMap, setUserMap] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [newChatType, setNewChatType] = useState(null);
    const [newGroupData, setNewGroupData] = useState({ name: '', description: '', avatarUrl: 'https://bharatham.com/avatar.png' });
    const [selectedUserEmail, setSelectedUserEmail] = useState('');
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const pollingRef = useRef(null);
    const [showGroupInfoModal, setShowGroupInfoModal] = useState(false);
    const [currentChatMembers, setCurrentChatMembers] = useState([]);
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [memberSearchQuery, setMemberSearchQuery] = useState('');
    const [readMessageIds, setReadMessageIds] = useState(new Set());
    const [readStatusMap, setReadStatusMap] = useState({});
    const [isSearchingMessages, setIsSearchingMessages] = useState(false);
    const [messageSearchQuery, setMessageSearchQuery] = useState('');
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [messageReactions, setMessageReactions] = useState({});
    const [reactionCounts, setReactionCounts] = useState({});

    useEffect(() => {
        const init = async () => {
            const userStr = localStorage.getItem('user');
            const user = userStr ? JSON.parse(userStr) : null;
            if (user) setCurrentUser(user);

            // Fetch users first to populate userMap
            const usersRes = await userService.getAllUsers();
            let currentUsers = [];
            const map = {};
            if (usersRes.success && usersRes.data) {
                currentUsers = usersRes.data;
                setAllUsers(currentUsers);
                currentUsers.forEach(u => {
                    map[u.email] = `${u.firstName} ${u.lastName}`;
                });
                setUserMap(map);
            }

            await fetchChats(user, map);
        };
        init();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userService.getAllUsers();
            if (response.success && response.data) {
                setAllUsers(response.data);
                const map = {};
                response.data.forEach(u => {
                    map[u.email] = `${u.firstName} ${u.lastName}`;
                });
                setUserMap(map);
                return { data: response.data, map };
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        return { data: [], map: {} };
    };

    const fetchChats = async (userOverride = null, mapOverride = null) => {
        const user = userOverride || currentUser;
        const map = mapOverride || userMap;
        if (!user) return;

        try {
            setLoading(true);
            const response = await chatService.getAllChats();
            if (response.success && response.data) {
                const resolvedChats = await Promise.all(response.data.map(async chat => {
                    let displayName = chat.name;
                    let unreadCount = 0;

                    try {
                        const membersRes = await chatService.getChatMembersByChat(chat.id);
                        if (membersRes.success && membersRes.data) {
                            const me = membersRes.data.find(m => m.userEmail === user.email);
                            if (me) {
                                unreadCount = me.unreadCount || 0;
                            }

                            if (chat.type === 'personal') {
                                const other = membersRes.data.find(m => m.userEmail !== user.email);
                                if (other) {
                                    displayName = map[other.userEmail] || other.userEmail;
                                }
                            }
                        }
                    } catch (e) {
                        console.error('Error fetching chat members/unread count:', e);
                    }

                    if (!displayName) {
                        displayName = chat.type === 'group' ? 'Untitled Group' : (map[chat.createdBy] || 'Personal Chat');
                    }

                    return {
                        ...chat,
                        displayName,
                        lastMessage: '...',
                        timestamp: new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                        unreadCount,
                        isRead: unreadCount === 0
                    };
                }));

                setConversations(resolvedChats);
                if (resolvedChats.length > 0 && !selectedChat) {
                    handleSelectChat(resolvedChats[0]);
                }
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        } finally {
            setLoading(false);
        }
    };

    // Load messages when chat is selected
    useEffect(() => {
        if (selectedChat) {
            fetchMessages(selectedChat.id);

            // Start polling
            if (pollingRef.current) clearInterval(pollingRef.current);
            pollingRef.current = setInterval(() => {
                fetchMessages(selectedChat.id, true);
            }, 3000);
        }
        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, [selectedChat, userMap]);

    // Mark incoming messages as read
    useEffect(() => {
        if (messages.length > 0 && currentUser?.email) {
            messages.forEach(msg => {
                if (msg.senderId !== currentUser.email && !readMessageIds.has(msg.id)) {
                    markAsRead(msg.id);
                }
            });
        }
    }, [messages, currentUser, readMessageIds]);

    const markAsRead = async (messageId) => {
        try {
            await messageService.createMessageRead({
                messageId,
                userEmail: currentUser.email
            });
            setReadMessageIds(prev => new Set(prev).add(messageId));
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const fetchReadStatus = async (messageId) => {
        try {
            const response = await messageService.getMessageReadsByMessage(messageId);
            if (response.success && response.data) {
                const reads = response.data;
                const otherUserReads = reads.filter(read => read.userEmail !== currentUser.email);
                const isReadByOthers = otherUserReads.length > 0;
                const readCount = otherUserReads.length;
                setReadStatusMap(prev => ({
                    ...prev,
                    [messageId]: { isRead: isReadByOthers, count: readCount }
                }));
            }
        } catch (error) {
            console.error('Error fetching read status:', error);
        }
    };

    const fetchMessageReactions = async (messageId) => {
        try {
            const reactionsRes = await messageService.getMessageReactionsByMessage(messageId);
            const countRes = await messageService.getReactionCount(messageId);

            if (reactionsRes.success && reactionsRes.data) {
                setMessageReactions(prev => ({
                    ...prev,
                    [messageId]: reactionsRes.data.filter(r => r.isActive)
                }));
            }

            if (countRes.success && countRes.data) {
                setReactionCounts(prev => ({
                    ...prev,
                    [messageId]: countRes.data
                }));
            }
        } catch (error) {
            console.error('Error fetching reactions:', error);
        }
    };

    const handleReaction = async (messageId, emoji) => {
        if (!currentUser) return;
        const existingReactions = messageReactions[messageId] || [];
        const myReaction = existingReactions.find(r => r.userEmail === currentUser.email && r.isActive);

        try {
            if (myReaction) {
                if (myReaction.emoji === emoji) {
                    await messageService.deleteMessageReaction(myReaction.id);
                } else {
                    await messageService.deleteMessageReaction(myReaction.id);
                    await messageService.createMessageReaction({
                        messageId,
                        userEmail: currentUser.email,
                        emoji
                    });
                }
            } else {
                await messageService.createMessageReaction({
                    messageId,
                    userEmail: currentUser.email,
                    emoji
                });
            }
            fetchMessageReactions(messageId);
        } catch (error) {
            console.error('Error handling reaction:', error);
        }
    };

    const fetchMessages = async (chatId, isPolling = false) => {
        if (!isPolling) setMessagesLoading(true);
        try {
            const response = await messageService.getMessagesByChat(chatId);
            if (response.success && response.data) {
                const sortedMessages = response.data
                    .filter(m => m.isActive)
                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    .map(m => {
                        const isMe = m.senderEmail === currentUser?.email;
                        if (isMe && !readStatusMap[m.id]) {
                            fetchReadStatus(m.id);
                        }
                        fetchMessageReactions(m.id);
                        return {
                            id: m.id,
                            senderId: m.senderEmail,
                            senderName: userMap[m.senderEmail] || m.senderEmail,
                            text: m.content,
                            timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                            isRead: (readStatusMap[m.id]?.isRead) || false,
                            readCount: (readStatusMap[m.id]?.count) || 0
                        };
                    });

                setMessages(sortedMessages);

                if (sortedMessages.length > 0) {
                    const lastMsg = sortedMessages[sortedMessages.length - 1];
                    setConversations(prev => prev.map(c =>
                        c.id === chatId
                            ? { ...c, lastMessage: lastMsg.text, timestamp: lastMsg.timestamp }
                            : c
                    ));
                }

                if (!isPolling) {
                    scrollToBottom();
                }
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            if (!isPolling) setMessagesLoading(false);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setReadStatusMap({});
        setReadMessageIds(new Set());
        setMessageSearchQuery('');
        if (chat.type === 'group') {
            fetchChatMembers(chat.id);
        } else {
            setCurrentChatMembers([]);
        }
    };

    const fetchChatMembers = async (chatId) => {
        setIsActionLoading(true);
        try {
            const response = await chatService.getChatMembersByChat(chatId);
            if (response.success && response.data) {
                setCurrentChatMembers(response.data);
            }
        } catch (error) {
            console.error('Error fetching chat members:', error);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleAddMember = async (email) => {
        if (!selectedChat) return;
        setIsActionLoading(true);
        try {
            const response = await chatService.createChatMember({
                chatId: selectedChat.id,
                userEmail: email,
                role: 'member'
            });
            if (response.success) {
                await fetchChatMembers(selectedChat.id);
                setIsAddingMember(false);
                setMemberSearchQuery('');
            } else {
                alert('Failed to add member: ' + (response.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error adding member:', error);
            alert('Error adding member');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleRemoveMember = async (memberId, userEmail) => {
        if (!selectedChat || !window.confirm(`Are you sure you want to remove ${userMap[userEmail] || userEmail} from the group?`)) return;
        setIsActionLoading(true);
        try {
            const response = await chatService.leaveChat({
                chatId: selectedChat.id,
                userEmail: userEmail
            });
            if (response.success) {
                await fetchChatMembers(selectedChat.id);
            } else {
                alert('Failed to remove member: ' + (response.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error removing member:', error);
            alert('Error removing member');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleSearchMessages = async (query) => {
        setMessageSearchQuery(query);
        if (!query.trim()) {
            if (selectedChat) fetchMessages(selectedChat.id);
            return;
        }

        setIsSearchingMessages(true);
        try {
            const response = await messageService.searchMessages(query);
            if (response.success && response.data) {
                const filteredResults = response.data
                    .filter(m => m.chatId === selectedChat?.id && m.isActive)
                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    .map(m => ({
                        id: m.id,
                        senderId: m.senderEmail,
                        senderName: userMap[m.senderEmail] || m.senderEmail,
                        text: m.content,
                        timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                        isRead: readStatusMap[m.id] || false
                    }));
                setMessages(filteredResults);
            }
        } catch (error) {
            console.error('Error searching messages:', error);
        } finally {
            setIsSearchingMessages(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedChat || !currentUser || isSendingMessage) return;

        setIsSendingMessage(true);
        try {
            const payload = {
                chatId: selectedChat.id,
                senderEmail: currentUser.email,
                messageType: 'text',
                content: newMessage.trim(),
                mediaUrl: null,
                mediaThumbnailUrl: null,
                mediaSize: null,
                mediaDuration: null,
                replyToMessageId: null
            };

            console.log('Sending message with robust payload:', payload);

            try {
                const response = await messageService.createMessage(payload);
                if (response.success) {
                    setNewMessage('');
                    fetchMessages(selectedChat.id);
                } else {
                    console.error('Failed to send message:', response);
                    alert('Failed to send message: ' + (response.message || response.error || 'Check console for details'));
                }
            } catch (error) {
                console.error('Error in handleSendMessage:', error);
                alert('Error: ' + error.message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSendingMessage(false);
        }
    };
    const [groupSearchQuery, setGroupSearchQuery] = useState('');
    const [selectedGroupUsers, setSelectedGroupUsers] = useState([]);

    const handleCreateChat = async (e) => {
        if (e) e.preventDefault();
        if (!currentUser || isActionLoading) return;

        setIsActionLoading(true);
        try {
            let payload;
            let targetUser = null;
            if (newChatType === 'group') {
                payload = {
                    type: 'group',
                    name: newGroupData.name,
                    description: newGroupData.description,
                    avatarUrl: newGroupData.avatarUrl,
                    createdBy: currentUser.email
                };
            } else {
                targetUser = allUsers.find(u => u.email === selectedUserEmail);
                payload = {
                    type: 'personal',
                    name: null,
                    description: null,
                    avatarUrl: null,
                    createdBy: currentUser.email
                };
            }

            const response = await chatService.createChat(payload);
            if (response.success && response.data) {
                const newChatId = response.data.id;

                await chatService.createChatMember({
                    chatId: newChatId,
                    userEmail: currentUser.email,
                    role: 'admin'
                });

                if (newChatType === 'personal') {
                    await chatService.createChatMember({
                        chatId: newChatId,
                        userEmail: selectedUserEmail,
                        role: 'member'
                    });
                } else {
                    for (const email of selectedGroupUsers) {
                        await chatService.createChatMember({
                            chatId: newChatId,
                            userEmail: email,
                            role: 'member'
                        });
                    }
                }

                setShowNewChatModal(false);
                setNewChatType(null);
                setSelectedUserEmail('');
                setSelectedGroupUsers([]);
                fetchChats();
                setSelectedChat({
                    ...response.data,
                    displayName: newChatType === 'personal' ? `${targetUser.firstName} ${targetUser.lastName}` : payload.name
                });
            }
        } catch (error) {
            console.error('Error creating chat:', error);
            alert('Error creating chat');
        } finally {
            setIsActionLoading(false);
        }
    };

    const filteredUsers = allUsers.filter(u =>
        u.email !== currentUser?.email &&
        (`${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(groupSearchQuery.toLowerCase()))
    );

    const toggleUserSelection = (email) => {
        if (newChatType === 'personal') {
            setSelectedUserEmail(email);
        } else {
            setSelectedGroupUsers(prev =>
                prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
            );
        }
    };

    const filteredConversations = conversations.filter(conv =>
        (conv.displayName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (conv.lastMessage?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    const sortedConversations = [...filteredConversations].sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        } else if (sortBy === 'oldest') {
            return new Date(a.updatedAt) - new Date(b.updatedAt);
        }
        return 0;
    });

    const formatDate = () => 'Today';

    const getInitials = (name) => {
        if (!name) return '??';
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
                        <button className="chats-new-btn" onClick={() => setShowNewChatModal(true)}>
                            <Plus size={20} />
                        </button>
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
                        </select>
                    </div>

                    <div className="chats-conversations-list">
                        {loading ? (
                            <div className="chats-loading">
                                <div className="chats-spinner large"></div>
                                <span>Loading chats...</span>
                            </div>
                        ) : sortedConversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                className={`chats-conversation-item ${selectedChat?.id === conversation.id ? 'active' : ''
                                    }`}
                                onClick={() => handleSelectChat(conversation)}
                            >
                                <div className="chats-conversation-avatar">
                                    {conversation.avatarUrl ? (
                                        <img src={conversation.avatarUrl} alt={conversation.displayName} />
                                    ) : (
                                        <div className="chats-avatar-placeholder">
                                            {getInitials(conversation.displayName)}
                                        </div>
                                    )}
                                </div>
                                <div className="chats-conversation-content">
                                    <div className="chats-conversation-header">
                                        <span className="chats-conversation-name">{conversation.displayName}</span>
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
                                        {selectedChat.avatarUrl ? (
                                            <img src={selectedChat.avatarUrl} alt={selectedChat.displayName} />
                                        ) : (
                                            <div className="chats-avatar-placeholder">
                                                {getInitials(selectedChat.displayName)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="chats-chat-info">
                                        <div className="chats-chat-name">{selectedChat.displayName}</div>
                                        <div className={`chats-chat-status ${selectedChat.isActive ? 'online' : 'offline'}`}>
                                            {selectedChat.isActive ? 'Online' : 'Offline'}
                                        </div>
                                    </div>
                                </div>
                                <div className="chats-chat-header-right">
                                    <div className="chats-header-search-container">
                                        <Search size={18} className="chats-header-search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Search messages..."
                                            className="chats-header-search-input"
                                            value={messageSearchQuery}
                                            onChange={(e) => handleSearchMessages(e.target.value)}
                                        />
                                        {isSearchingMessages && <div className="chats-search-loading-spinner" />}
                                    </div>
                                    {selectedChat.type === 'group' && (
                                        <button
                                            className="chats-manage-members-btn"
                                            onClick={() => {
                                                setShowGroupInfoModal(true);
                                                fetchChatMembers(selectedChat.id);
                                            }}
                                        >
                                            <Users size={16} />
                                            <span>Manage Members</span>
                                        </button>
                                    )}

                                    <Info
                                        className="chats-info-icon"
                                        size={20}
                                        onClick={() => {
                                            if (selectedChat.type === 'group') {
                                                setShowGroupInfoModal(true);
                                                fetchChatMembers(selectedChat.id);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Messages Container */}
                            <div className="chats-messages-container" ref={messagesContainerRef}>
                                {messagesLoading ? (
                                    <div className="chats-message-loading-container">
                                        <div className="chats-spinner large"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="chats-date-separator">
                                            <div className="chats-date-line"></div>
                                            <span className="chats-date-text">{formatDate()}</span>
                                            <div className="chats-date-line"></div>
                                        </div>

                                        <div className="chats-messages-list">
                                            {messages.map((message) => (
                                                <div
                                                    key={message.id}
                                                    className={`chats-message ${message.senderId === currentUser?.email ? 'sent' : 'received'
                                                        }`}
                                                >
                                                    <div className="chats-message-bubble">
                                                        <div className="chats-reaction-picker">
                                                            {['👍', '❤️', '😂', '😮', '😢', '🙏'].map(emoji => (
                                                                <span
                                                                    key={emoji}
                                                                    className="chats-reaction-option"
                                                                    onClick={() => handleReaction(message.id, emoji)}
                                                                >
                                                                    {emoji}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        {selectedChat.type === 'group' && message.senderId !== currentUser?.email && (
                                                            <div className="chats-message-sender-name">{message.senderName}</div>
                                                        )}
                                                        <div className="chats-message-text">{message.text}</div>

                                                        {/* Display Reactions */}
                                                        {reactionCounts[message.id] && reactionCounts[message.id].totalReactions > 0 && (
                                                            <div className="chats-message-reactions">
                                                                {Object.entries(reactionCounts[message.id].reactionCounts).map(([emoji, count]) => {
                                                                    const amIReacted = (messageReactions[message.id] || []).some(r => r.userEmail === currentUser?.email && r.emoji === emoji);
                                                                    return (
                                                                        <div
                                                                            key={emoji}
                                                                            className={`chats-reaction-badge ${amIReacted ? 'active' : ''}`}
                                                                            onClick={() => handleReaction(message.id, emoji)}
                                                                        >
                                                                            <span className="chats-reaction-emoji">{emoji}</span>
                                                                            <span className="chats-reaction-count">{count}</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}

                                                        <div className="chats-message-footer">
                                                            <span className="chats-message-time">{message.timestamp}</span>
                                                            {message.senderId === currentUser?.email && (
                                                                <div className="chats-message-status">
                                                                    {message.isRead ? (
                                                                        <div className="chats-read-status-container">
                                                                            {selectedChat.type === 'group' && message.readCount > 0 && (
                                                                                <span className="chats-read-count">Read by {message.readCount}</span>
                                                                            )}
                                                                            <CheckCheck className="chats-read-check" size={14} />
                                                                        </div>
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
                                    </>
                                )}
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
                                    <button
                                        type="submit"
                                        className={`chats-send-button ${isSendingMessage ? 'chats-btn-loading' : ''}`}
                                        disabled={isSendingMessage}
                                    >
                                        {isSendingMessage ? (
                                            <div className="chats-spinner"></div>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                <span>Send message</span>
                                            </>
                                        )}
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

            {/* New Chat Modal */}
            {showNewChatModal && (
                <div className="chats-modal-overlay">
                    <div className="chats-modal">
                        <div className="chats-modal-header">
                            <h3>{newChatType === 'group' ? 'New Group Chat' : newChatType === 'personal' ? 'New Personal Chat' : 'Start New Chat'}</h3>
                            <button onClick={() => {
                                setShowNewChatModal(false);
                                setNewChatType(null);
                                setGroupSearchQuery('');
                                setSelectedUserEmail('');
                                setSelectedGroupUsers([]);
                            }} className="chats-modal-close">
                                <X size={20} />
                            </button>
                        </div>

                        {!newChatType ? (
                            <div className="chats-modal-options">
                                <button className="chats-modal-option" onClick={() => setNewChatType('personal')}>
                                    <UserIcon size={24} />
                                    <span>Personal Chat</span>
                                </button>
                                <button className="chats-modal-option" onClick={() => setNewChatType('group')}>
                                    <Users size={24} />
                                    <span>Group Chat</span>
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleCreateChat} className="chats-modal-form">
                                {newChatType === 'group' && (
                                    <>
                                        <div className="chats-form-group">
                                            <label>Group Name</label>
                                            <input
                                                type="text"
                                                value={newGroupData.name}
                                                onChange={(e) => setNewGroupData({ ...newGroupData, name: e.target.value })}
                                                required
                                                placeholder="Enter group name"
                                                className="chats-modal-input"
                                            />
                                        </div>
                                        <div className="chats-form-group">
                                            <label>Description</label>
                                            <textarea
                                                value={newGroupData.description}
                                                onChange={(e) => setNewGroupData({ ...newGroupData, description: e.target.value })}
                                                required
                                                placeholder="Enter group description"
                                                className="chats-modal-input"
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="chats-form-group">
                                    <label>{newChatType === 'group' ? 'Add Members' : 'Select User'}</label>
                                    <div className="chats-modal-search-container">
                                        <Search size={16} className="chats-modal-search-icon" />
                                        <input
                                            type="text"
                                            className="chats-modal-input chats-modal-search-input"
                                            placeholder="Search users..."
                                            value={groupSearchQuery}
                                            onChange={(e) => setGroupSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    <div className="chats-user-selector-list">
                                        {filteredUsers.length > 0 ? filteredUsers.map(user => (
                                            <div
                                                key={user.email}
                                                className={`chats-user-selector-item ${newChatType === 'personal'
                                                    ? (selectedUserEmail === user.email ? 'selected' : '')
                                                    : (selectedGroupUsers.includes(user.email) ? 'selected' : '')
                                                    }`}
                                                onClick={() => toggleUserSelection(user.email)}
                                            >
                                                <div className="chats-user-selector-avatar">
                                                    {getInitials(`${user.firstName} ${user.lastName}`)}
                                                </div>
                                                <div className="chats-user-selector-info">
                                                    <div className="chats-user-selector-name">{user.firstName} {user.lastName}</div>
                                                    <div className="chats-user-selector-email">{user.email}</div>
                                                </div>
                                                <div className="chats-user-selector-check">
                                                    {(newChatType === 'personal' ? selectedUserEmail === user.email : selectedGroupUsers.includes(user.email)) && (
                                                        <Check size={16} />
                                                    )}
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="chats-no-users">No users found</div>
                                        )}
                                    </div>
                                </div>

                                <div className="chats-modal-actions">
                                    <button type="button" onClick={() => { setNewChatType(null); setGroupSearchQuery(''); }} className="chats-btn-secondary" disabled={isActionLoading}>Back</button>
                                    <button
                                        type="submit"
                                        className={`chats-btn-primary ${isActionLoading ? 'chats-btn-loading' : ''}`}
                                        disabled={isActionLoading || (newChatType === 'personal' ? !selectedUserEmail : (!newGroupData.name || selectedGroupUsers.length === 0))}
                                    >
                                        {isActionLoading ? <div className="chats-spinner"></div> : (newChatType === 'personal' ? 'Start Chat' : 'Create Group')}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
            {/* Group Info Modal */}
            {showGroupInfoModal && selectedChat && (
                <div className="chats-modal-overlay">
                    <div className="chats-modal chats-group-info-modal">
                        <div className="chats-modal-header">
                            <h3>Group Information</h3>
                            <button onClick={() => {
                                setShowGroupInfoModal(false);
                                setIsAddingMember(false);
                                setMemberSearchQuery('');
                            }} className="chats-modal-close">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="chats-group-info-body">
                            {isActionLoading && <div className="chats-action-overlay"><div className="chats-spinner large"></div></div>}
                            <div className="chats-group-info-header">
                                <div className="chats-group-info-avatar">
                                    {selectedChat.avatarUrl ? (
                                        <img src={selectedChat.avatarUrl} alt={selectedChat.displayName} />
                                    ) : (
                                        <div className="chats-avatar-placeholder">
                                            {getInitials(selectedChat.displayName)}
                                        </div>
                                    )}
                                </div>
                                <div className="chats-group-info-details">
                                    <div className="chats-group-info-name">{selectedChat.displayName}</div>
                                    <div className="chats-group-info-desc">{selectedChat.description}</div>
                                    <div className="chats-group-info-meta">{currentChatMembers.length} Members</div>
                                </div>
                            </div>

                            <div className="chats-group-members-section">
                                <div className="chats-members-section-header">
                                    <h4>Members</h4>
                                    {!isAddingMember && (
                                        <button className="chats-add-member-btn" onClick={() => setIsAddingMember(true)}>
                                            <UserPlus size={16} />
                                            <span>Add Member</span>
                                        </button>
                                    )}
                                </div>

                                {isAddingMember ? (
                                    <div className="chats-add-member-container">
                                        <div className="chats-modal-search-container">
                                            <Search size={16} className="chats-modal-search-icon" />
                                            <input
                                                type="text"
                                                className="chats-modal-input chats-modal-search-input"
                                                placeholder="Search users to add..."
                                                value={memberSearchQuery}
                                                onChange={(e) => setMemberSearchQuery(e.target.value)}
                                                autoFocus
                                            />
                                        </div>
                                        <div className="chats-member-search-results">
                                            {allUsers
                                                .filter(u =>
                                                    !currentChatMembers.some(m => m.userEmail === u.email) &&
                                                    (`${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(memberSearchQuery.toLowerCase()))
                                                )
                                                .slice(0, 5)
                                                .map(user => (
                                                    <div key={user.email} className="chats-member-search-item">
                                                        <div className="chats-member-search-info">
                                                            <span className="chats-member-search-name">{user.firstName} {user.lastName}</span>
                                                            <span className="chats-member-search-email">{user.email}</span>
                                                        </div>
                                                        <button className="chats-member-add-btn" onClick={() => handleAddMember(user.email)}>
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                        </div>
                                        <button className="chats-btn-text" onClick={() => { setIsAddingMember(false); setMemberSearchQuery(''); }}>Cancel</button>
                                    </div>
                                ) : (
                                    <div className="chats-members-list scrollable">
                                        {currentChatMembers.map(member => (
                                            <div key={member.id} className="chats-member-item">
                                                <div className="chats-member-avatar">
                                                    {getInitials(userMap[member.userEmail] || member.userEmail)}
                                                </div>
                                                <div className="chats-member-info">
                                                    <div className="chats-member-name">
                                                        {userMap[member.userEmail] || member.userEmail}
                                                        {member.role === 'admin' && <Shield size={12} className="chats-admin-shield" title="Admin" />}
                                                    </div>
                                                    <div className="chats-member-role">{member.role}</div>
                                                </div>
                                                {member.userEmail !== currentUser?.email && (
                                                    <button
                                                        className="chats-member-remove-btn"
                                                        onClick={() => handleRemoveMember(member.id, member.userEmail)}
                                                        title="Remove from group"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
