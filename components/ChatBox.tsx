import React, { useState, useRef, useEffect } from 'react';
import type { Chat } from '@google/genai';
import { SendIcon, UserIcon, RobotIcon, Spinner } from './Icons';

interface Message {
    role: 'user' | 'model' | 'error';
    text: string;
}

interface ChatBoxProps {
    chat: Chat;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ chat }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const userMessage = inputValue.trim();
        if (!userMessage || isLoading) return;

        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userMessage });
            setMessages(prev => [...prev, { role: 'model', text: response.text }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'error', text: "Sorry, I couldn't get a response. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col h-[400px]">
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4 scroll-smooth">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        { (msg.role === 'model' || msg.role === 'error') && <RobotIcon className="w-7 h-7 text-primary-500 flex-shrink-0 mt-1" /> }
                        <div className={`rounded-xl px-4 py-2 max-w-[80%] md:max-w-[70%] ${
                            msg.role === 'user' ? 'bg-primary-500 text-white' : 
                            msg.role === 'error' ? 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200' :
                            'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}>
                            <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                        </div>
                        { msg.role === 'user' && <UserIcon className="w-7 h-7 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1" /> }
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                        <RobotIcon className="w-7 h-7 text-primary-500 flex-shrink-0 mt-1" />
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-xl px-4 py-2 flex items-center">
                            <span className="text-gray-500 dark:text-gray-400 italic">AI is typing</span>
                            <div className="flex space-x-1 ml-2">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask a follow-up question..."
                    disabled={isLoading}
                    className="flex-grow w-full px-4 py-2 bg-white dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
                    aria-label="Chat input"
                />
                <button 
                    type="submit" 
                    disabled={isLoading || !inputValue} 
                    className="p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary-300 dark:disabled:bg-primary-800 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
                    aria-label="Send message"
                >
                    {isLoading ? <Spinner className="w-6 h-6 animate-spin" /> : <SendIcon className="w-6 h-6" />}
                </button>
            </form>
        </div>
    );
};
