import { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { BASE_URL } from '@/config/domain';
import logo from '@/assets/logo.svg';
import logo_white from '@/assets/logo_white.svg';
import { AuthContext } from '@/contexts/auth_context';
import ModeToggle from '@/components/ModeToggle';

const navigation = [
  { name: 'Docs', href: '#' },
  { name: 'Pricing', href: '/pricing' },
  // { name: 'TBD', href: '#' },
  // { name: 'TBD', href: '#' },
];

function HeaderLight() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [isUsingDeviceMode, setIsUsingDeviceMode] = useState(
    () => !('theme' in localStorage)
  );

  // const redirectToGoggleSSO = async () => {
  //   const googleLoginURL = `${BASE_URL}/users/login`;
  //   const newWindow = window.open(googleLoginURL, '', 'width=500,height=600');
  // };

  const login = () => {
    window.location.href = `${BASE_URL}/user/login`;
  };

  const signout = () => {
    window.location.href = `${BASE_URL}/user/logout`;
  };

  return (
    <header className="fixed backdrop-blur-lg bg-white/30 dark:bg-primary-foreground/30 inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          {/*<Link*/}
          {/*  to="/"*/}
          {/*  className="flex items-center text-2xl font-semibold tracking-widest xl:text-4xl"*/}
          {/*>*/}
          {/*  PresetAI*/}
          {/*</Link>*/}
          <Link
            to="/"
            className="flex items-center text-2xl font-semibold tracking-widest xl:text-4xl"
          >
            <img className="h-8" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-4 lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? (
            <div className="flex gap-4">
              <Link
                to="/projects"
                className="text-sm font-semibold leading-6 hover:text-gray-500 duration-300"
              >
                Dashboard
              </Link>
              <span
                className="text-sm font-semibold leading-6 cursor-pointer hover:text-gray-500 duration-300"
                onClick={signout}
              >
                Sign out
              </span>
            </div>
          ) : (
            <span
              onClick={login}
              className="text-sm font-semibold leading-6 cursor-pointer hover:text-gray-500 duration-300"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </span>
          )}
          <ModeToggle />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-primary-foreground px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            {/*<a href="#" className="-m-1.5 p-1.5">*/}
            {/*  <span className="sr-only">Your Company</span>*/}
            {/*  <img*/}
            {/*    className="h-8 w-auto"*/}
            {/*    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"*/}
            {/*    alt=""*/}
            {/*  />*/}
            {/*</a>*/}
            {/*<Link*/}
            {/*  to="/"*/}
            {/*  className="flex items-center text-skin-black text-xl font-semibold tracking-widest xl:text-4xl"*/}
            {/*>*/}
            {/*  PresetAI*/}
            {/*</Link>*/}
            <img className="h-8" src={logo} alt="logo" />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-500"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <a
                  href={`${BASE_URL}/users/login`}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-500"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4">
            <ModeToggle />
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
export default HeaderLight;
