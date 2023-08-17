import React from 'react';
import Hero from './components/Hero';
import Feature from './components/Feature';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import HeaderLight from '@/layouts/Header/HeaderLight';
import Footer from '@/layouts/Footer';
import Platform from '@/pages/Home/components/Platform';
import Chatbot from '@/pages/Home/components/Chatbot';
import Testimonial from '@/pages/Home/components/Testimonial';

function Home() {
  return (
    <div className="bg-skin-main block bg-gradient-to-b from-white from-10% via-slate-100 via-30% to-slate-200 to-100% dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <HeaderLight />
      <main className="isolate block">
        <Hero />
        <Platform />
        <Chatbot />
        <Feature />
        <Testimonial />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
export default Home;
