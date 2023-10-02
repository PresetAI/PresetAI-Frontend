import React, { useEffect, useRef, useState } from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import {
  ClipboardIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import avatar_right from '@/assets/avatar_right.jpg';
import logo from '@/assets/logo.svg';
import { Card } from '@/components/ui/card';
import { doChaClientSideUsingPost } from '@/services/ProjectController';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

type Message = {
  message: string;
  sender: string;
  suggestion: string[] | null;
};

type ProjectDetailChatbotProps = {
  projectId: string | undefined;
  projectDetailData: API.Project;
};

function ProjectDetailChatbot(props: ProjectDetailChatbotProps) {
  const [copyToClipboard, { success }] = useCopyToClipboard();

  const { projectId, projectDetailData } = props;
  const [userMessage, setUserMessage] = useState<string>(''); // user input
  const [suggestions, setSuggestions] = useState<any[]>([]); // suggestions items get from backend
  const [isTyping, setIsTyping] = useState<boolean>(false); // is typing]
  const [messages, setMessages] = useState<Message[]>([
    {
      message: '👋 Hello, How I can help you today?',
      sender: 'ChatGPT',
      suggestion: null,
    },
  ]);

  /*
   * Send message to backend and get response
   * */
  const [mess, setMess] = useState<string>('');
  const processMessage = async (chatMessages: any) => {
    setUserMessage('');
    const body: API.DoChaClientSideUsingPostBody = {
      question: chatMessages,
    };
    const response = await doChaClientSideUsingPost(projectId, body);
    if (response.body) {
      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      const newMessage = {
        message: '',
        sender: 'ChatGPT',
        suggestion: null,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // setMess((prevMessages) => prevMessages + value);
        // add prevMessages + value to last message in messages
        setMessages((prevMessages) => {
          // Create a copy of the last message and update its message field
          const updatedLastMessage = {
            ...prevMessages[prevMessages.length - 1],
            message: prevMessages[prevMessages.length - 1].message + value,
          };

          // Replace the last message in the array with the updated version
          return [...prevMessages.slice(0, -1), updatedLastMessage];
        });
      }
    }

    setIsTyping(false);
  };

  /*
   * Handle send message / ask question
   * */
  const handleSend = async (e: any) => {
    e.preventDefault();
    setIsTyping(true);
    const newMessage = {
      message: userMessage,
      sender: 'user',
      suggestion: null,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // Initial system message
    await processMessage(userMessage);
  };

  /*
   * Handle auto scroll to bottom when send the message
   * */
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const smoothScrollTo = (
    element: HTMLDivElement,
    target: number,
    duration: number
  ) => {
    const start = element.scrollTop;
    const change = target - start;
    let startTime = 0;

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      element.scrollTop = easeInOutQuad(progress, start, change, duration);
      if (progress < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    };
    window.requestAnimationFrame(animateScroll);
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      const targetScroll = messagesEndRef.current.scrollHeight;
      smoothScrollTo(messagesEndRef.current, targetScroll, 500);
    }
  }, [messages]);

  return (
    <div className="w-full sm:col-span-6 self-start rounded-3xl drop-shadow-sm">
      <Card className="flex flex-col rounded-3xl w-full max-h-[40rem] overflow-y-auto">
        <div ref={messagesEndRef} className="flex flex-col overflow-auto p-4">
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
                        <div className="text-gray-600">
                          <ReactMarkdown
                            remarkPlugins={[
                              [remarkGfm, { singleTilde: false }],
                            ]}
                            className="prose prose-stone dark:text-gray-50"
                          >
                            {message.message}
                          </ReactMarkdown>
                        </div>
                        {/*<div className="flex items-center mt-4">*/}
                        {/*  <button*/}
                        {/*    type="button"*/}
                        {/*    className="ml-auto bg-white text-gray-500 p-2 rounded-xl text-sm cursor-pointer hover:bg-slate-200 transition duration-100"*/}
                        {/*    onClick={() => copyToClipboard(message.message)}*/}
                        {/*  >*/}
                        {/*    <ClipboardIcon className="inline-block h-4 w-4" />*/}
                        {/*    copy*/}
                        {/*  </button>*/}
                        {/*</div>*/}
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
            {isTyping && (
              <div className="text-black mt-2 flex gap-2">
                <UseAnimations animation={loading} />
                <div>Thinking...</div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-auto p-6">
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
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="text-muted-foreground text-sm bg-slate-200/20 rounded-lg focus:ring-black focus:border-black block w-full pl-10 p-2.5 py-3 dark:placeholder-gray-400"
                placeholder="Chat here..."
                value={userMessage}
                autoComplete="off"
                required
                onChange={(e: any) => setUserMessage(e.target.value)}
              />
            </div>
            {isTyping || userMessage.length === 0 ? (
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-gray-600 rounded-lg"
                disabled
              >
                <SendRoundedIcon />
                <span className="sr-only">Search</span>
              </button>
            ) : (
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-primary-foreground bg-primary/90 shadow-xl rounded-lg"
                onClick={(e) => handleSend(e)}
              >
                <SendRoundedIcon />
                <span className="sr-only">Search</span>
              </button>
            )}
          </form>
          <h3 className="flex mt-2 ml-auto text-sm text-muted-foreground">
            Powered by &nbsp;
            <p className="font-medium text-primary">PresetAI</p>
          </h3>
        </div>
      </Card>
    </div>
  );
}
export default ProjectDetailChatbot;
