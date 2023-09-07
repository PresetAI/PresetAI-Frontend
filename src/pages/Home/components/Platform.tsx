import React from 'react';
import github from '@/assets/icons/github.png';
import slack from '@/assets/icons/slack.png';
import website from '@/assets/icons/website.png';

function Platform() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 backdrop-blur-lg bg-slate-200/20 rounded-xl dark:bg-slate-500/10 ">
      <div className="grid grid-cols-9 px-4 md:px-8 py-4 gap-8">
        <div className="col-span-9 space-y-2 md:col-span-3">
          <h2 className="text-primary text-2xl font-bold ">Why Choose Us</h2>
          <p className="text-muted-foreground font-semibold md:max-w-[300px]">
            Build your Own ChatBot Across Multiple platform
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-center col-span-3 md:col-span-2">
          <div className="bg-white p-3 rounded-full">
            <img src={github} alt="github" />
          </div>
          <div className="text-base font-semibold md:text-xl md:font-bold text-center">
            Github Issue
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-center col-span-3 md:col-span-2">
          <div className="bg-white p-3 rounded-full">
            <img src={slack} alt="slack" />
          </div>
          <div className="text-base font-semibold md:text-xl md:font-bold text-center">
            Slack Plugin
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-center col-span-3 md:col-span-2">
          <div className="bg-white p-3 rounded-full">
            <img src={website} alt="website" />
          </div>
          <div className="text-base font-semibold md:text-xl md:font-bold text-center">
            Own Website
          </div>
        </div>
      </div>
    </section>
  );
}

export default Platform;
