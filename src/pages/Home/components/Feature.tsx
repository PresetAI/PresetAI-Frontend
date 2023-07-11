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
    name: 'AI-Driven Product Recommendations',
    description:
      'Transform your customer service with our AI chatbot. Provide your customers with efficient and highly personalized product recommendations.',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Customer Behavior Insights',
    description:
      'Track and analyze customer interactions, enabling you to gain valuable insights into customer preferences and shopping habits.',
    icon: ChartBarIcon,
  },
  {
    name: 'Product Copilots',
    description:
      'Create smart applications that guide your customers in exploring and understanding the potential and specifics of your products.',
    icon: SmartToyOutlinedIcon,
  },
  {
    name: 'Fast Document Navigation',
    description:
      'Quickly ingest and deploy AI Chat Search apps for efficient navigation of both external and internal documents within minutes.',
    icon: DocumentTextIcon,
  },
];

function Feature() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 __text_gradient">
          From Personal Shopping Assistants to Intelligent Product Guides
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-skin-black sm:text-4xl">
          Build for Multitude of Scenarios
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Revolutionize your digital retail with our multi-purpose AI chatbot
          that caters to customer support, employee training, product guidance,
          and document navigation.
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
              <dd className="mt-2 text-base leading-7 text-gray-600">
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
