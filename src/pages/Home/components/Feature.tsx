import React from 'react';
import {
  CursorArrowRaysIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/20/solid';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

const features = [
  {
    name: 'AI-Powered Documentation Search',
    description:
      'Revolutionize your developer support with our AI chatbot, offering precise and personalized results for complex documentation searches.',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Developer Activity Analysis',
    description:
      'Track and evaluate developer interactions to gain invaluable insights into their search habits and preferred resources.',
    icon: ChartBarIcon,
  },
  {
    name: 'Intelligent Development Assistants',
    description:
      "Forge intelligent applications that guide developers through complex documentations, enhancing understanding and application of your products' features.",
    icon: SmartToyOutlinedIcon,
  },
  {
    name: 'Rapid Document Navigation',
    description:
      'Quickly deploy our AI Chat Search apps for swift and efficient exploration of both external and internal technical documents within minutes.',
    icon: DocumentTextIcon,
  },
];

function Feature() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-32 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 __text_gradient">
          From Personalized Query Assistants to Intelligent Documentation Search
          Guides
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-skin-black sm:text-4xl">
          Engineered for a Range of Use Cases
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Transform your digital development environment with our versatile AI
          chatbot, designed to facilitate efficient developer support, employee
          learning, guide through product documentation, and navigate complex
          technical documents.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-skin-black">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <feature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
export default Feature;
