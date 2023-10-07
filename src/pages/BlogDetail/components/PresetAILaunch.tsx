import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'PresetAI Launch Day',
    href: '#',
    description:
      'B2B AI-Powered Private Knowledge Base Chatbot - The Next Chapter in Context-aware AI Copilots',
    imageUrl:
      'https://cs410032002121be004.blob.core.windows.net/preset/blog1.jpeg',
    date: 'Oct 01, 2023',
    datetime: '2020-10-01',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
];

export default function PresetAILaunch() {
  return (
    <div className="py-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="mt-2 text-sm leading-8 text-muted-foreground">
            Oct 01, 2023
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            PresetAI Launch Day
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            B2B AI-Powered Private Knowledge Base Chatbot - The Next Chapter in
            Context-aware AI Copilots
          </p>
        </div>
        <div className="mx-auto mt-4 max-w-3xl text-center">
          <img
            className="rounded-xl"
            src="https://cs410032002121be004.blob.core.windows.net/preset/presetai-launch.jpg"
            alt="presetai-launch"
          />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="mt-12">
            <h2 className="text-2xl font-semibold">What is PresetAI?</h2>
            <p className="text-secondary-foreground mt-2 text-lg">
              PresetAI is an AI-powered B2B private Knowledge Base Chatbot that
              seamlessly integrates across various platforms, including Github,
              Slack, Discord, and even your own website. With a
              developer-centric approach, it offers chat-powered search
              functionality, enabling businesses to provide detailed, accurate,
              and contextually relevant responses to customer inquiries. The
              innovative design of PresetAI is composed of a series of powerful
              and highly customizable components, which ensure that answers are
              tailored from your own data and documentation. What sets it apart?
              You can effortlessly integrate it with just a single line of code,
              bridging the gap between your valuable information and your users.
            </p>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold">
              Easy Integration & Comprehensive Solutions
            </h2>
            <p className="text-secondary-foreground mt-2 text-lg">
              Exciting news! You can use PresetAI FOR FREE right now. We are
              deeply committed to enhancing the user experience, and over the
              next few weeks, we'll be fine-tuning our platform and rolling out
              a comprehensive guide to help you maximize the benefits of
              PresetAI.
            </p>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold">
              Unlock PresetAI for Free & Shape Its Future:
            </h2>
            <p className="text-secondary-foreground mt-2 text-lg">
              We truly VALUE your feedback! Your insights are the cornerstone of
              our growth and refinement. If there are any areas you believe need
              improvement or if you have suggestions to enhance our offering,
              please share them with us.
            </p>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold">
              Introducing the Future of Data Interaction with PresetAI:
            </h2>
            <p className="text-secondary-foreground mt-2 text-lg">
              Introducing PresetAI to the world is a momentous occasion for us.
              We envision a future where businesses can communicate with their
              data in an intuitive and seamless manner, revolutionizing the way
              industries engage with information. Stay connected for more
              exciting updates on our journey, and thank you for joining us on
              this venture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
