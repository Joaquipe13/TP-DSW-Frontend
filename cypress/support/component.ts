import './commands';
import './data';
import React from 'react';
import { createRoot } from 'react-dom/client';

interface MountOptions {
  props?: Record<string, any>;
}

Cypress.Commands.add('mount', (component: React.ReactElement, options?: MountOptions) => {
  const container = document.getElementById('root') || document.createElement('div');
  
  if (!container.id) {
    container.id = 'root';
    document.body.appendChild(container);
  }

  const root = createRoot(container);
  root.render(component);
});


