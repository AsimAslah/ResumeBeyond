'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('resumebeyond-theme');
    const nextDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = nextDark ? 'dark' : 'light';
    setDark(nextDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    window.localStorage.setItem('resumebeyond-theme', next ? 'dark' : 'light');
  }

  return (
    <button className="icon-button" type="button" onClick={toggle} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} aria-pressed={dark}>
      {dark ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
    </button>
  );
}

