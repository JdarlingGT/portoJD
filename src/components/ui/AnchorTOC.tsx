import React, { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  label: string;
}

interface AnchorTOCProps {
  items: TOCItem[];
}

const AnchorTOC: React.FC<AnchorTOCProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      let currentId = '';
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top < window.innerHeight / 2) {
          currentId = item.id;
          break;
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active item

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <aside className="fixed top-1/2 -translate-y-1/2 left-4 z-50 hidden xl:block">
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center space-x-3 group transition-all duration-200 ease-in-out`}
              >
                <span
                  className={`block h-px w-6 bg-slate-500 group-hover:w-12 group-hover:bg-cyan-400 transition-all duration-200 ease-in-out ${
                    activeId === item.id ? 'w-12 bg-cyan-400' : ''
                  }`}
                ></span>
                <span
                  className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                    activeId === item.id
                      ? 'text-cyan-400'
                      : 'text-slate-500 group-hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AnchorTOC;