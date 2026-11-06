import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/dialogs.css';
import { App } from './App';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production builds ship prerendered HTML to hydrate. The dev server starts empty.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
