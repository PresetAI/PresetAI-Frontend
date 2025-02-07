import { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon as XMarkIconOutline,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { BASE_URL } from '@/config/domain';
import ModeToggle from '@/components/ModeToggle';
import { AuthContext } from '@/contexts/auth_context';

const navigation = [
  { name: 'Use Cases', href: '#' },
  { name: 'Docs', href: '#' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '#' },
];

function HeaderDark() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const login = () => {
    window.location.href = `${BASE_URL}/users/login`;
  };

  const signout = () => {
    window.location.href = `${BASE_URL}/users/logout`;
  };

  return (
    <header className="bg-gray-900">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="flex items-center text-white text-2xl font-semibold tracking-widest xl:text-4xl"
          >
            PresetAI
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-4 lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? (
            <div className="flex gap-4">
              <Link
                to="/dashboard"
                className="text-sm font-semibold leading-6 text-skin-black hover:text-gray-500 duration-300"
              >
                Dashboard
              </Link>
              <span
                className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:text-gray-500 duration-300"
                onClick={signout}
              >
                Sign out
              </span>
            </div>
          ) : (
            <span
              onClick={login}
              className="text-sm font-semibold leading-6 cursor-pointer text-white hover:text-gray-500 duration-300"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </span>
          )}
          <div className="text-white">
            <ModeToggle />
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIconOutline className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href={`${BASE_URL}/users/login`}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
export default HeaderDark;
