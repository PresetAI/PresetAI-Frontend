import React from 'react';
import github from '@/assets/icons/github.png';
import slack from '@/assets/icons/slack.png';
import website from '@/assets/icons/website.png';

function Platform() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 backdrop-blur-lg bg-slate-200/20 rounded-xl dark:bg-slate-500/10 ">
      <div className="grid grid-cols-9 px-8 py-4">
        <div className="col-span-3 space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
            Why Choose Us
          </h2>
          <p className="text-gray-800/90 font-semibold max-w-[300px] dark:text-gray-100">
            Build your Own ChatBot Across Multiple platform
          </p>
        </div>
        <div className="flex items-center gap-4 justify-center col-span-2">
          <div className="bg-white p-3 rounded-full">
            <img src={github} alt="github" />
          </div>
          <div className="text-xl font-bold">Github Issue</div>
        </div>
        <div className="flex items-center gap-4 justify-center col-span-2">
          <div className="bg-white p-3 rounded-full">
            <img src={slack} alt="slack" />
          </div>
          <div className="text-xl font-bold">Slack Plugin</div>
        </div>
        <div className="flex items-center gap-4 justify-center col-span-2">
          <div className="bg-white p-3 rounded-full">
            <img src={website} alt="website" />
          </div>
          <div className="text-xl font-bold">Own Website</div>
        </div>
        {/*<div className="grid grid-cols-3 uten w-full">*/}
        {/*  */}
        {/*</div>*/}
      </div>
    </section>
  );
}

export default Platform;
