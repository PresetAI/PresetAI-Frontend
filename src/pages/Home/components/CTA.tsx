import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
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
import { AuthContext } from '@/contexts/auth_context';

function CTA() {
  const { isAuthenticated, login } = useContext(AuthContext);
  return (
    <div className="relative -z-10 mt-32 px-6 lg:px-8">
      <div
        className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl sm:bottom-0 sm:right-[calc(50%-6rem)] sm:top-auto sm:translate-y-0 sm:transform-gpu sm:justify-end"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-25"
          style={{
            clipPath:
              'polygon(73.6% 48.6%, 91.7% 88.5%, 100% 53.9%, 97.4% 18.1%, 92.5% 15.4%, 75.7% 36.3%, 55.3% 52.8%, 46.5% 50.9%, 45% 37.4%, 50.3% 13.1%, 21.3% 36.2%, 0.1% 0.1%, 5.4% 49.1%, 21.4% 36.4%, 58.9% 100%, 73.6% 48.6%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Enhance your development environment's efficiency.
          <br />
          Start integrating PresetAI.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          PresetAI delivers smooth integration through an intuitive online
          dashboard and our API. You can effortlessly modify, optimize, or
          augment the AI's search logic for various types of documentation and
          developer requirements.
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
              <Button variant="outline" className="text-sm font-semibold py-6">
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
  );
}
export default CTA;
