import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { AuthContext } from '@/contexts/auth_context';
import SkeletonComponent from '@/components/Skeleton';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import BreadcrumbsComponent from '@/components/Breadcrumbs';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const teams = [
  { id: 1, name: 'Team', href: '#', initial: 'T', current: false },
];
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  component: any;
  projectId: string | undefined;
};

function Sidebar(props: Props) {
  const { userInfo, projectName, fetchLoading } = useContext(AuthContext);
  const { component, projectId } = props;
  const [chatbotOpen, setChatbotOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [navigation, setNavigation] = useState([
    {
      name: 'Playground',
      href: `/project/playground/${projectId}`,
      icon: PlayCircleFilledRoundedIcon,
      current: true,
    },
    {
      name: 'Manage Data Sources',
      href: `/project/file-management/${projectId}`,
      icon: FolderCopyOutlinedIcon,
      current: false,
    },
    {
      name: 'Add Data Sources',
      href: `/project/upload-data-source/${projectId}`,
      icon: BackupOutlinedIcon,
      current: false,
    },
    {
      name: 'Upload History',
      href: `/project/upload-history/${projectId}`,
      icon: HistoryOutlinedIcon,
      current: false,
    },
    {
      name: 'API Keys',
      href: `/project/api-keys/${projectId}`,
      icon: KeyOutlinedIcon,
      current: false,
    },
  ]);

  useEffect(() => {
    // set navigation data current status based on url
    const newNavigationData = navigation.map((item) => {
      return {
        ...item,
        current: item.href === window.location.pathname,
      };
    });
    setNavigation(newNavigationData);
    setCurrentPath(newNavigationData.filter((item) => item.current)[0].name);
  }, []);

  return (
    <main className="min-h-screen block bg-gradient-to-b from-white from-10% via-slate-50 via-30% to-slate-100 to-100% dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1 bg-[#f1f1f1]">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-4 overflow-y-auto bg-skin-main px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <img className="h-8 w-auto" src={logo} alt="Your Company" />
                  </div>
                  <div>
                    <span>Project: </span>
                    <span className="font-medium">{projectName}</span>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-white font-bold'
                                    : 'text-gray-700 hover:bg-gray-50 font-medium',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current ? '' : 'text-gray-500',
                                    'h-6 w-6 shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">
                          Your teams
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {teams.map((team) => (
                            <li key={team.name}>
                              <Link
                                to={team.href}
                                className={classNames(
                                  team.current
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                <span
                                  className={classNames(
                                    team.current
                                      ? 'text-indigo-600 border-indigo-600'
                                      : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                  )}
                                >
                                  {team.initial}
                                </span>
                                <span className="truncate">{team.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <Link
                          to="#"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        >
                          <Cog6ToothIcon
                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                          Settings
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="bg-[#f1f1f1] hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-4 overflow-y-auto border-r border-gray-200 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img className="h-8 w-auto" src={logo} alt="Your Company" />
          </div>
          <div>
            <span>Project: </span>
            <span className="font-medium">{projectName}</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-white font-bold'
                            : 'text-gray-700 hover:bg-gray-50 font-medium',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? '' : 'text-gray-500',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams.map((team) => (
                    <li key={team.name}>
                      <Link
                        to={team.href}
                        className={classNames(
                          team.current
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <span
                          className={classNames(
                            team.current
                              ? 'text-indigo-600 border-indigo-600'
                              : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                          )}
                        >
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  to="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <Cog6ToothIcon
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                    aria-hidden="true"
                  />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="bg-slate-200/50 border-r border-gray-200 p-6">
          <div className="flex gap-4 items-center">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="Avatar" src={userInfo.avatar} />
            </StyledBadge>
            <div>
              <div className="text-sm font-bold text-gray-900">
                {userInfo.username}
              </div>
              <div className="text-xs font-medium text-gray-500">
                {userInfo.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex shrink-0 items-center gap-x-4 bg-skin-main px-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden h-20"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />
        </div>

        <div className="px-4 sm:px-8 lg:px-12 md:pt-8">
          <BreadcrumbsComponent path={currentPath} />
        </div>
        <main className="px-4 py-4 sm:px-8 lg:px-12 pt-4 md:pt-4 lg:pt-8">
          {/*<ChatbotPalette open={chatbotOpen} setOpen={setChatbotOpen} />*/}
          {/*<button*/}
          {/*  className="w-[20rem] text-left border border-gray-300 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300/30 hover:text-gray-800 transition duration-150 cursor-pointer drop-shadow-md font-medium"*/}
          {/*  onClick={() => setChatbotOpen(true)}*/}
          {/*>*/}
          {/*  <span>Search Documentation...</span>*/}
          {/*</button>*/}
          {fetchLoading ? <SkeletonComponent /> : component}
        </main>
      </div>
    </main>
  );
}

export default Sidebar;
