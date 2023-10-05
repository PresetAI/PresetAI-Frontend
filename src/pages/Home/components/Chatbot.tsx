import React, { useState } from 'react';
import logo from '@/assets/logo.svg';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import avatar from '@/assets/icons/avatar.png';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

function Chatbot() {
  const [userMessage, setUserMessage] = useState<string>(''); // user input
  const [suggestions, setSuggestions] = useState<any[]>([]); // suggestions items get from backend
  const [isTyping, setIsTyping] = useState<boolean>(false); // is typing
  const [messages, setMessages] = useState<any[]>([
    {
      message: '👋 Hello, How I can help you today?',
      sender: 'ChatGPT',
      suggestion: null,
    },
    {
      message: 'What is PresetAI?',
      sender: 'user',
      suggestion: null,
    },
  ]);
  return (
    <section className="mx-auto max-w-3xl px-4 py-4 lg:px-6 backdrop-blur-lg bg-slate-200/20 dark:bg-primary-foreground rounded-3xl mt-20 max-h-[40rem]">
      <div className="flex flex-col w-full sm:col-span-6 self-start rounded-3xl drop-shadow-sm">
        <div className="flex flex-col overflow-auto p-4">
          <div>
            {messages.map((message) => {
              return (
                <div key={message.message}>
                  {message.sender === 'ChatGPT' ||
                  message.sender === 'assistant' ? (
                    <div className="flex p-4 gap-2 backdrop-blur-lg rounded-md">
                      <img
                        className="rounded-xl w-10 h-10 bg-amber-50"
                        src={logo}
                        alt="bot"
                      />
                      <div className="flex items-center w-full">
                        <div className="text-gray-600 animate__animated animate__fadeInDown">
                          <ReactMarkdown
                            remarkPlugins={[
                              [remarkGfm, { singleTilde: false }],
                            ]}
                            className="prose prose-slate dark:text-gray-50"
                          >
                            {message.message}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 my-6">
                      <div className="ml-auto flex flex-col">
                        <div className="bg-primary/90 text-primary-foreground shadow-lg p-3 rounded-xl">
                          {message.message}
                        </div>
                      </div>
                      <div className="flex items-center justify-center border-2 border-primary w-10 h-10 rounded-md">
                        <PersonRoundedIcon />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-auto px-6">
          <div className="flex items-center">
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
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="text-muted-foreground text-sm rounded-lg focus:ring-black focus:border-black block w-full pl-10 p-2.5 py-3 dark:placeholder-gray-400"
                placeholder="Chat here..."
                autoComplete="off"
                required
              />
            </div>
            {isTyping ? (
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-indigo-600/90 shadow-xl rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled
              >
                <SendRoundedIcon />
                <span className="sr-only">Search</span>
              </button>
            ) : (
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-primary-foreground bg-primary/90 shadow-xl rounded-lg"
              >
                <SendRoundedIcon />
                <span className="sr-only">Search</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Chatbot;
