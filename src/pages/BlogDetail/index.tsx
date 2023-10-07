import React from 'react';
import HeaderLight from '@/layouts/Header/HeaderLight';
import Footer from '@/layouts/Footer';
import { useParams } from 'react-router-dom';
import PresetAILaunch from '@/pages/BlogDetail/components/PresetAILaunch';

function BlogDetail() {
  const { title } = useParams<{ title: string | undefined }>();
  return (
    <div className="bg-background block">
      <HeaderLight />
      <main className="isolate block">
        {title === 'presetai-launch' ? <PresetAILaunch /> : null}
      </main>
      <Footer />
    </div>
  );
}
export default BlogDetail;
