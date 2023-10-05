import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/contexts/auth_context';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Hero() {
  const { isAuthenticated, login } = useContext(AuthContext);
  return (
    <div className="relative pt-14">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center gap-2">
              <a
                href="https://www.producthunt.com/posts/presetai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-presetai"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=417600&theme=light"
                  alt="PresetAI - B2B&#0032;AI&#0032;powered&#0032;private&#0032;knowledge&#0032;base&#0032;chatbot | Product Hunt"
                />
              </a>
              <a
                href="https://www.npmjs.com/package/@presetai/search"
                target="_blank"
              >
                <Button className="text-sm font-bold shadow-xl rounded-xl h-full">
                  npm install @presetai/search
                </Button>
              </a>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Build AI-Powered Private Knowledge Base Chatbot
            </h1>
            <p className="mt-6 text-based leading-8 text-slate-600 dark:text-gray-300 sm:text-lg">
              Integrate our AI chatbot into your platform for your private
              knowledge Base search. Easy setup with just one line of code.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {isAuthenticated ? (
                <Link to="/projects">
                  <Button className="text-sm font-semibold shadow-xl transition duration-300 py-6">
                    Get started
                  </Button>
                </Link>
              ) : (
                <Button
                  className="text-sm font-semibold shadow-xl transition duration-300 py-6"
                  onClick={login}
                >
                  Get started
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-sm font-semibold py-6"
                  >
                    Contact
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuGroup>
                    <a href="mailto:thepresetai@gmail.com" target="_blank">
                      <DropdownMenuItem>
                        Email
                        <DropdownMenuShortcut>
                          <EmailOutlinedIcon />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </a>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}

export default Hero;
