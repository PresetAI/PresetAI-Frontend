import React from 'react';
import HeaderLight from '@/layouts/Header/HeaderLight';
import Footer from '@/layouts/Footer';
import BlogList from '@/pages/Blog/components/BlogList';

function Blog() {
  return (
    <div className="bg-background block">
      <HeaderLight />
      <main className="isolate block">
        <BlogList />
      </main>
      <Footer />
    </div>
  );
}
export default Blog;
