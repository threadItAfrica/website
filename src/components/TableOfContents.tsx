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
      const offset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="my-8 p-6 rounded-lg font-body">
      <h2 className="text-lg md:text-xl font-heading font-semibold mb-4">Sections In This Post</h2>
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