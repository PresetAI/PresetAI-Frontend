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
    <div className="bg-background block">
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
