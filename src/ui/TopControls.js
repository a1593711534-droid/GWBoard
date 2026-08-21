import { iconMarkup } from './icons.js';

function controlButton({ icon, label, action, disabled = false }) {
  return `<button class="top-control" type="button" data-action="${action}" aria-label="${label}" title="${label}" ${disabled ? 'disabled' : ''}>${iconMarkup(icon)}</button>`;
}

export function createTopControls({ onAction }) {
  const wrapper = document.createElement('nav');
  wrapper.className = 'top-controls glass-panel';
  wrapper.setAttribute('aria-label', '文件控制');
  wrapper.innerHTML = [
    controlButton({ icon: 'undo', label: '復原（尚無操作）', action: 'undo', disabled: true }),
    controlButton({ icon: 'redo', label: '重做（尚無操作）', action: 'redo', disabled: true }),
    controlButton({ icon: 'more', label: '更多選項', action: 'more' }),
    controlButton({ icon: 'focus', label: '專注模式', action: 'focus' }),
    controlButton({ icon: 'export', label: '匯出', action: 'export' }),
  ].join('');

  wrapper.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (button && !button.disabled) {
      onAction(button.dataset.action);
    }
  });

  return wrapper;
}
