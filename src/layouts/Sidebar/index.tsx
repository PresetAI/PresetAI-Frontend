import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { AuthContext } from '@/contexts/auth_context';
import SkeletonComponent from '@/components/Skeleton';
import { styled } from '@mui/material/styles';
import { Badge as BadgeShadcn } from '@/components/ui/badge';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import BreadcrumbsComponent from '@/components/Breadcrumbs';
import logo_white from '@/assets/logo_white.svg';
import { ProjectDetailTutorial } from '@/components/Tutorial/ProjectDetailTutorial';
import ModeToggle from '@/components/ModeToggle';

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
  const { userInfo, projectName, fetchLoading, signout, mode } =
    useContext(AuthContext);

  const { component, projectId } = props;
  const [tutorialOpen, setTutorialOpen] = useState<boolean>(false);
  const [chatbotOpen, setChatbotOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [navigation, setNavigation] = useState([
    {
      name: 'Quick Start',
      href: `/project/quick-start/${projectId}`,
      icon: PlayCircleFilledWhiteOutlinedIcon,
      current: true,
    },
    {
      name: 'Playground',
      href: `/project/playground/${projectId}`,
      icon: SmartToyOutlinedIcon,
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
    <main className="min-h-screen block bg-gradient-to-b from-white from-10% via-slate-50 via-30% to-slate-100 to-100% dark:from-primary-foreground dark:via-primary-foreground dark:to-primary-foreground">
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
                <div className="flex flex-col w-full">
                  <div className="bg-popover flex grow flex-col gap-y-4 overflow-y-auto border-r border-gray-200 px-6 pb-4">
                    <div className="flex justify-between h-16 shrink-0 items-center">
                      {mode === 'light' ? (
                        <img
                          className="h-8 w-auto"
                          src={logo}
                          alt="Your Company"
                        />
                      ) : (
                        <img
                          className="h-8 w-auto"
                          src={logo_white}
                          alt="logo white"
                        />
                      )}
                      <ModeToggle />
                    </div>
                    <div>
                      <span>Project: </span>
                      <BadgeShadcn variant="outline" className="text-sm">
                        {projectName}
                      </BadgeShadcn>
                      {/*<span className="font-bold">{projectName}</span>*/}
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
                                      ? 'bg-secondary font-bold'
                                      : 'hover:bg-secondary font-medium',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 '
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? ''
                                        : 'text-gray-500 dark:text-gray-200',
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
                          <div className="text-xs font-semibold leading-6 text-muted-foreground">
                            Your teams
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-secondary'
                                      : 'hover:bg-secondary',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? 'text-primary border-secondary'
                                        : 'text-gray-400 border-gray-200 group-hover:border-primary group-hover:text-muted-foreground',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          {tutorialOpen ? (
                            <ProjectDetailTutorial
                              open={tutorialOpen}
                              setOpen={setTutorialOpen}
                            />
                          ) : null}
                          <div
                            className="group cursor-pointer -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-secondary-foreground hover:bg-secondary"
                            onClick={() => setTutorialOpen(true)}
                          >
                            <LiveHelpOutlinedIcon
                              className="h-6 w-6 shrink-0 text-secondary-foreground"
                              aria-hidden="true"
                            />
                            Tutorial
                          </div>
                          <Link
                            to="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-secondary-foreground hover:bg-secondary"
                          >
                            <AssignmentOutlinedIcon
                              className="h-6 w-6 shrink-0 text-secondary-foreground"
                              aria-hidden="true"
                            />
                            Docs(Cooming Soon)
                          </Link>
                          <span
                            onClick={signout}
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-secondary-foreground hover:bg-secondary cursor-pointer"
                          >
                            <ArrowLeftOnRectangleIcon
                              className="h-6 w-6 shrink-0 text-secondary-foreground"
                              aria-hidden="true"
                            />
                            Sign Out
                          </span>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="bg-slate-200/50 dark:bg-gray-900/90 border-r border-gray-200 p-6">
                    <div className="flex gap-4 items-center">
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar alt="Avatar" src={userInfo.avatar} />
                      </StyledBadge>
                      <div>
                        <div className="text-sm font-bold text-primary">
                          {userInfo.username}
                        </div>
                        <div className="text-xs font-medium text-secondary-foreground">
                          {userInfo.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div></div>
        <div className="bg-popover flex grow flex-col gap-y-4 overflow-y-auto border-r border-gray-200 px-6 pb-4">
          <div className="flex justify-between h-16 shrink-0 items-center">
            {mode === 'light' ? (
              <img className="h-8 w-auto" src={logo} alt="Your Company" />
            ) : (
              <img className="h-8 w-auto" src={logo_white} alt="logo white" />
            )}
            <ModeToggle />
          </div>
          <div>
            <span>Project: </span>
            <BadgeShadcn variant="outline" className="text-sm">
              {projectName}
            </BadgeShadcn>
            {/*<span className="font-bold">{projectName}</span>*/}
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
                            ? 'bg-secondary font-bold'
                            : 'hover:bg-secondary font-medium',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 '
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? ''
                              : 'text-gray-500 dark:text-gray-200',
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
                <div className="text-xs font-semibold leading-6 text-muted-foreground">
                  Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams.map((team) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className={classNames(
                          team.current ? 'bg-secondary' : 'hover:bg-secondary',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <span
                          className={classNames(
                            team.current
                              ? 'text-primary border-secondary'
                              : 'text-gray-400 border-gray-200 group-hover:border-primary group-hover:text-muted-foreground',
                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                          )}
                        >
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                {tutorialOpen ? (
                  <ProjectDetailTutorial
                    open={tutorialOpen}
                    setOpen={setTutorialOpen}
                  />
                ) : null}
                <div
                  className="group cursor-pointer -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-secondary-foreground hover:bg-secondary"
                  onClick={() => setTutorialOpen(true)}
                >
                  <LiveHelpOutlinedIcon
                    className="h-6 w-6 shrink-0 text-secondary-foreground"
                    aria-hidden="true"
                  />
                  Tutorial
                </div>
                <Link
                  to="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-secondary-foreground hover:bg-secondary"
                >
                  <AssignmentOutlinedIcon
                    className="h-6 w-6 shrink-0 text-secondary-foreground"
                    aria-hidden="true"
                  />
                  Docs(Cooming Soon)
                </Link>
                <span
                  onClick={signout}
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-secondary-foreground hover:bg-secondary cursor-pointer"
                >
                  <ArrowLeftOnRectangleIcon
                    className="h-6 w-6 shrink-0 text-secondary-foreground"
                    aria-hidden="true"
                  />
                  Sign Out
                </span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="bg-slate-200/50 dark:bg-gray-900/90 border-r border-gray-200 p-6">
          <div className="flex gap-4 items-center">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="Avatar" src={userInfo.avatar} />
            </StyledBadge>
            <div>
              <div className="text-sm font-bold text-primary">
                {userInfo.username}
              </div>
              <div className="text-xs font-medium text-secondary-foreground">
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
            className="-m-2.5 p-2.5 text-primary lg:hidden h-20"
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
          {fetchLoading ? <SkeletonComponent mode={mode} /> : component}
        </main>
      </div>
    </main>
  );
}

export default Sidebar;
