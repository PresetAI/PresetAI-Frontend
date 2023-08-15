import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Card } from '@/components/ui/card';
import logo from '@/assets/logo.svg';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ClipboardIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import avatar_right from '@/assets/avatar_right.jpg';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

type ChatbotPaletteProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function ChatbotPalette(props: ChatbotPaletteProps) {
  const { open, setOpen } = props;
  const [copyToClipboard, { success }] = useCopyToClipboard();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<any[]>([
    {
      message: '👋 Hello, How I can help you today?',
      sender: 'ChatGPT',
      suggestion: null,
    },
  ]);

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery('')}
      appear
    >
      <Dialog as="div" className="relative z-50 top-20" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-4xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <div className="w-full h-[40rem] sm:col-span-7 self-start rounded-2xl">
                <Card className="flex flex-col rounded-l-2xl rounded-r-none h-full">
                  <div className="flex flex-col overflow-auto p-4">
                    <div>
                      {messages.map((message) => {
                        return (
                          <div key={message.message}>
                            {message.sender === 'ChatGPT' ||
                            message.sender === 'assistant' ? (
                              <div className="flex p-4 gap-2 backdrop-blur-lg bg-green-100/30 rounded-2xl shadow-lg shadow-green-50/40">
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
                                      className="prose prose-slate"
                                    >
                                      {message.message}
                                    </ReactMarkdown>
                                  </div>
                                  <div className="flex items-center mt-4">
                                    <div>
                                      <div className="flex gap-2">
                                        <div className="bg-white rounded-full p-2">
                                          <HandThumbUpIcon className="h-4 w-4" />
                                        </div>
                                        <div className="bg-white rounded-full p-2">
                                          <HandThumbDownIcon className="h-4 w-4" />
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      className="ml-auto bg-white text-gray-500 p-2 rounded-xl text-sm cursor-pointer hover:bg-green-100 transition duration-300"
                                      onClick={() =>
                                        copyToClipboard(message.message)
                                      }
                                    >
                                      <ClipboardIcon className="inline-block h-4 w-4" />
                                      copy
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex gap-2 mb-2">
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
                    </div>
                  </div>
                  <div className="mt-auto p-6">
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
                      <button
                        type="submit"
                        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <SendRoundedIcon />
                        <span className="sr-only">Search</span>
                      </button>
                    </form>
                    <h3 className="flex mt-2 ml-auto text-sm text-gray-500">
                      Power by &nbsp;
                      <p className="font-medium text-gray-700">PresetAI</p>
                    </h3>
                  </div>
                </Card>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ChatbotPalette;
