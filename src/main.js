import './styles/tokens.css';
import './styles/reset.css';
import './styles/layout.css';
import './styles/toolbar.css';
import './styles/panels.css';
import './styles/responsive.css';
import { createApp } from './app/createApp.js';

const root = document.querySelector('#app');

if (!root) {
  throw new Error('GWBoard mount point was not found.');
}

createApp(root);
