import React from 'react';
import Hero from './components/Hero';
import Feature from './components/Feature';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import HeaderLight from '@/layouts/Header/HeaderLight';
import Footer from '@/layouts/Footer';

function Home() {
  return (
    <div className="bg-skin-main block">
      <HeaderLight />
      <main className="isolate block">
        <Hero />
        <Feature />
        {/*<Testimonial />*/}
        <FAQ />
        <CTA />
        {/*<Blog />*/}
      </main>
      <Footer />
    </div>
  );
}
export default Home;
