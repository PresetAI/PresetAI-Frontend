import {
  ArrowPathIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid';
import {
  BoltIcon,
  CalendarDaysIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LogoCloud from './components/LogoCloud';
import Feature from './components/Feature';
import Stats from './components/Stats';
import CTA from './components/CTA';
import { Footer } from '../../layouts';

function Home() {
  return (
    <main className="bg-gray-900 block">
      <Header />
      <Hero />
      <LogoCloud />
      <Feature />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}

export default Home;
