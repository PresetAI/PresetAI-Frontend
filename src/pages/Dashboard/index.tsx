import React from 'react';
import { Sidebar } from '@/layouts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function Dashboard() {
  const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

\`\`\`js
console.log('Hello, world!');
\`\`\`

`;
  return (
    <Sidebar
      projectId="123"
      component={
        <div>
          <h1>Dashboard</h1>
          <ReactMarkdown
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            className="prose lg:prose-xl"
          >
            {markdown}
          </ReactMarkdown>
        </div>
      }
    />
  );
}
export default Dashboard;
