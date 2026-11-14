import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { EvolutionPortfolio } from '@/components/evolution-portfolio';
import { RecruiterPortfolio } from '@/components/recruiter-portfolio';
import '@/app/globals.css';

function App() {
  return window.location.pathname.startsWith('/directions/evolution') ? <EvolutionPortfolio /> : <RecruiterPortfolio />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);

