import { iconMarkup } from './icons.js';

const ITEMS = Object.freeze([
  { id: 'ruled', label: '橫線', icon: 'ruled', background: 'ruled' },
  { id: 'grid', label: '網格', icon: 'grid', background: 'grid' },
  { id: 'dots', label: '點網格', icon: 'dots', background: 'dots' },
  { id: 'import', label: '匯入', icon: 'import' },
  { id: 'scan', label: '掃描', icon: 'scan' },
  { id: 'template', label: '模板', icon: 'template' },
]);

export function createBottomDock({ onBackground, onAction }) {
  const dock = document.createElement('nav');
  dock.className = 'bottom-dock';
  dock.setAttribute('aria-label', '空白畫布快捷功能');

  ITEMS.forEach((item, index) => {
    if (index === 3) {
      const divider = document.createElement('span');
      divider.className = 'dock-divider';
      divider.setAttribute('aria-hidden', 'true');
      dock.append(divider);
    }

    const button = document.createElement('button');
    button.className = 'dock-button';
    button.type = 'button';
    button.dataset.action = item.id;
    if (item.background) {
      button.dataset.background = item.background;
    }
    button.innerHTML = `${iconMarkup(item.icon)}<span>${item.label}</span>`;
    button.addEventListener('click', () => {
      if (item.background) {
        onBackground(item.background);
      } else {
        onAction(item.id);
      }
    });
    dock.append(button);
  });

  function sync(snapshot) {
    dock.querySelectorAll('[data-background]').forEach((button) => {
      const selected = button.dataset.background === snapshot.background;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  return { element: dock, sync };
}
