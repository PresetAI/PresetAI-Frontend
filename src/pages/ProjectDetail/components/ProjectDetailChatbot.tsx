import React, { useEffect, useRef, useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import avatar from '../../../assets/avatar.png';
import avatar_right from '../../../assets/avatar_right.jpg';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import { productsSearchUsingPost } from '../../../services/ProductController';
import SuggestItem from './SuggestItem';

type Message = {
  message: string;
  sender: string;
  suggestion: string[] | null;
};

type ProjectDetailChatbotProps = {
  projectDetailData: API.Project;
};

function ProjectDetailChatbot(props: ProjectDetailChatbotProps) {
  const { projectDetailData } = props;
  const [userMessage, setUserMessage] = useState<string>(''); // user input
  const [suggestions, setSuggestions] = useState<any[]>([]); // suggestions items get from backend
  const [isTyping, setIsTyping] = useState<boolean>(false); // is typing
  const [messages, setMessages] = useState<any[]>([
    {
      message:
        "👋Hello, I'll be your personal assistant for your visit today! What are you looking for?",
      sender: 'ChatGPT',
      suggestion: null,
    },
  ]);

  const handleSendOnChange = (message: string) => {
    setUserMessage(message);
  };

  const processMessage = async (chatMessages: any) => {
    setUserMessage('');
    const response = await productsSearchUsingPost(chatMessages);

    if (response.data.code === 200) {
      const newMessage = {
        message: '',
        sender: 'ChatGPT',
        suggestion: response.data.data,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setSuggestions((prevSuggestions) => [
        ...prevSuggestions,
        [...response.data.data],
      ]);
    }

    setIsTyping(false);
  };

  const handleSend = async (e: any) => {
    setIsTyping(true);
    e.preventDefault();
    const newMessage = {
      message: userMessage,
      sender: 'user',
      suggestion: null,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // Initial system message
    await processMessage({ phrase: userMessage, namespace: 'amazon1' });
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  return (
    <div className="w-full sm:w-[80%] sm:col-span-6 self-start rounded-2xl p-4 bg-slate-100">
      <div className="flex flex-col h-[40em] overflow-auto">
        <div>
          {messages.map((message) => {
            return (
              <div key={message.message}>
                {message.sender === 'ChatGPT' ||
                message.sender === 'assistant' ? (
                  <div className="flex gap-2">
                    <img
                      className="rounded-full w-12 h-12"
                      src="https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
                      alt="bot"
                    />
                    <div>
                      <p className="text-gray-900 font-semibold tracking-wide">
                        Assistant
                      </p>
                      <div className="__chat_box p-3 inline-block text-skin-black">
                        {message.message}
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-2 mt-2 animate__animated animate__fadeInDown">
                        {message.suggestion &&
                          message.suggestion.map((item: any, index: number) => (
                            <SuggestItem key={index} item={item} />
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="ml-auto flex flex-col">
                      <p className="text-gray-900 font-semibold tracking-wide ml-auto">
                        You
                      </p>
                      <div className="__chat_box bg-sky-300 p-3 rounded-xl">
                        {message.message}
                      </div>
                    </div>
                    <img
                      className="rounded-full w-12 h-12"
                      src={avatar_right}
                      alt="user"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="text-black mt-2 flex gap-2">
              <UseAnimations animation={loading} />
              <div>Thinking...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="mt-auto">
        <form className="flex items-center" onSubmit={(e) => handleSend(e)}>
          <label htmlFor="simple-search" className="sr-only">
            Chat here...
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Chat here..."
              value={userMessage}
              autoComplete="off"
              required
              onChange={(e: any) => handleSendOnChange(e.target.value)}
            />
          </div>
          {isTyping ? (
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-gray-600 rounded-lg border border-blue-700 "
              disabled
            >
              <SendRoundedIcon />
              <span className="sr-only">Search</span>
            </button>
          ) : (
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => handleSend(e)}
            >
              <SendRoundedIcon />
              <span className="sr-only">Search</span>
            </button>
          )}
        </form>
        <h3 className="flex ml-auto text-sm text-gray-500">
          Power by &nbsp;
          <p className="font-medium text-gray-700">PresetAI</p>
        </h3>
      </div>
    </div>
  );
}
export default ProjectDetailChatbot;
