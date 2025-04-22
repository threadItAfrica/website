import * as React from 'react';

interface TableOfContentsProps {
  headers: string[]
}

export const TableOfContents = ({ headers }: TableOfContentsProps) => {
  return (
    <div className="hidden lg:block sticky top-20 h-fit bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {headers.map((header, index) => (
            <li key={index}>
              <a 
                href={`#${header.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-600 hover:text-primary text-sm"
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