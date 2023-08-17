import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import logo from '@/assets/logo.svg';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ClipboardIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import avatar from '@/assets/icons/avatar.png';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

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
    <section className="mx-auto max-w-3xl px-4 py-4 lg:px-6 backdrop-blur-lg bg-slate-200/70 rounded-3xl dark:bg-slate-500/10 mt-20 max-h-[40rem] shadow-slate-200 shadow-2xl dark:shadow-slate-800">
      <div className="flex flex-col w-full sm:col-span-6 self-start rounded-3xl drop-shadow-sm">
        <div className="flex flex-col overflow-auto p-4">
          <div>
            {messages.map((message) => {
              return (
                <div key={message.message}>
                  {message.sender === 'ChatGPT' ||
                  message.sender === 'assistant' ? (
                    <div className="flex p-4 gap-2 backdrop-blur-lg bg-slate-50 rounded-2xl shadow-lg shadow-gray-50/40 dark:bg-slate-800 dark:shadow-slate-700/50">
                      <img
                        className="rounded-full w-12 h-12 bg-amber-50"
                        src={logo}
                        alt="bot"
                      />
                      <div className="flex flex-col w-full">
                        <div className="__chat_box pt-3 text-gray-600 animate__animated animate__fadeInDown">
                          <ReactMarkdown
                            remarkPlugins={[
                              [remarkGfm, { singleTilde: false }],
                            ]}
                            className="prose prose-slate dark:text-gray-50"
                          >
                            {message.message}
                          </ReactMarkdown>
                        </div>
                        <div className="flex items-center mt-4">
                          <div>
                            <div className="flex gap-2">
                              <div className="bg-white rounded-full p-2">
                                <HandThumbUpIcon className="h-4 w-4 dark:text-black" />
                              </div>
                              <div className="bg-white rounded-full p-2">
                                <HandThumbDownIcon className="h-4 w-4 dark:text-black" />
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="ml-auto bg-white text-gray-500 p-2 rounded-xl text-sm cursor-pointer hover:bg-green-100 transition duration-300"
                          >
                            <ClipboardIcon className="inline-block h-4 w-4" />
                            copy
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 my-6">
                      <div className="ml-auto flex flex-col">
                        <div className="bg-indigo-500/90 shadow-lg p-3 rounded-xl text-gray-100">
                          {message.message}
                        </div>
                      </div>
                      <img
                        className="rounded-full w-12 h-12"
                        src={avatar}
                        alt="avatar"
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
          </div>
        </div>
        <div className="mt-auto px-6">
          <form className="flex items-center">
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
                className="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Chat here..."
                autoComplete="off"
                required
              />
            </div>
            {isTyping ? (
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-indigo-600/90 shadow-xl rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled
              >
                <SendRoundedIcon />
                <span className="sr-only">Search</span>
              </button>
            ) : (
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-indigo-600/90 shadow-xl rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <SendRoundedIcon />
                <span className="sr-only">Search</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
export default Chatbot;
