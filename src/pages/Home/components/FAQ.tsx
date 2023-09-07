import React from 'react';

const faqs = [
  {
    id: 1,
    question: "What's the PresetAI?",
    answer:
      'PresetAI is a powerhouse for chat-based search operations. We specialize in addressing developer documentation queries with simplicity and efficiency. Integration is effortless, and achievable everywhere with just a single line of code.',
  },
  {
    id: 2,
    question: 'Is it free?',
    answer: 'Our complimentary plan allows up to 100 chats per month.',
  },
];

function FAQ() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
      <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-gray-100">
        Frequently asked questions
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300">
        Have a different question and can’t find the answer you’re looking for?
        Reach out to our support team by{' '}
        <a
          href="#"
          className="font-semibold text-primary hover:text-primary/70"
        >
          sending us an email
        </a>{' '}
        and we’ll get back to you as soon as we can.
      </p>
      <div className="mt-20">
        <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                {faq.question}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default FAQ;
