import * as React from 'react';

interface TableOfContentsProps {
  headers: string[]
}

export const TableOfContents = ({ headers }: TableOfContentsProps) => {
  return (
    <div className="hidden md:block h-fit p-4">
      <h3 className="text-lg font-semibold mb-4">In this post...</h3>
      <nav>
        <ul className="space-y-2 list-disc pl-5">
          {headers.map((header, index) => (
            <li key={index}>
              <a 
                href={`#${header.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-600 hover:text-primary text-md"
              >
                {header}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}