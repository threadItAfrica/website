"use client";

interface TableOfContentsProps {
  headers: string[];
}

export const TableOfContents = ({ headers }: TableOfContentsProps) => {
  if (!headers.length) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector('header');
      const headerOffset = header ? header.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset - 20; // 20px extra padding

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="my-8 p-6 rounded-lg font-body">
      <h2 className="text-lg md:text-xl font-heading font-semibold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headers.map((header, index) => {
          const id = header.toLowerCase().replace(/\s+/g, "-");
          return (
            <li key={index}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className="text-gray-600 hover:text-primary transition-colors duration-200 block text-sm md:text-base leading-relaxed cursor-pointer"
              >
                {header}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};