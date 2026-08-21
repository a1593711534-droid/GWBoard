import { iconMarkup } from './icons.js';

export function createMediaPanel({ onClose, onPlaceholder }) {
  const panel = document.createElement('aside');
  panel.className = 'side-panel media-panel glass-panel';
  panel.dataset.panel = 'media';
  panel.setAttribute('aria-label', '加入內容');
  panel.hidden = true;
  panel.innerHTML = `
    <header class="panel-header">
      <div>
        <span class="panel-kicker">加入</span>
        <h2>內容</h2>
      </div>
      <button class="panel-close" type="button" aria-label="關閉加入內容面板">${iconMarkup('close')}</button>
    </header>
    <div class="media-grid">
      <button type="button" data-media="photo">${iconMarkup('image')}<span>照片</span></button>
      <button type="button" data-media="camera">${iconMarkup('camera')}<span>相機</span></button>
      <button type="button" data-media="shape">${iconMarkup('sparkles')}<span>圖形</span></button>
      <button type="button" data-media="note">${iconMarkup('layers')}<span>便利貼</span></button>
    </div>
    <div class="panel-placeholder">
      <span class="placeholder-icon">${iconMarkup('image')}</span>
      <strong>媒體匯入介面已就緒</strong>
      <p>檔案解碼、拖放與物件化會在媒體階段啟用。</p>
    </div>`;

  panel.querySelector('.panel-close').addEventListener('click', onClose);
  panel.querySelector('.media-grid').addEventListener('click', (event) => {
    if (event.target.closest('[data-media]')) {
      onPlaceholder('媒體匯入會在後續物件階段啟用');
    }
  });
  return panel;
}

export function createMorePanel({ onClose, onAction }) {
  const panel = document.createElement('aside');
  panel.className = 'popover-panel more-panel glass-panel';
  panel.dataset.panel = 'more';
  panel.setAttribute('aria-label', '更多選項');
  panel.hidden = true;
  panel.innerHTML = `
    <header class="compact-panel-header">
      <strong>白板設定</strong>
      <button class="panel-close" type="button" aria-label="關閉更多選項">${iconMarkup('close')}</button>
    </header>
    <button class="setting-row" type="button" data-setting="plain">
      <span><strong>清除背景樣式</strong><small>回到純色無限畫布</small></span><span>純色</span>
    </button>
    <button class="setting-row" type="button" data-setting="about">
      <span><strong>版本資訊</strong><small>階段 1 · 介面與部署骨架</small></span><span>0.1.0</span>
    </button>`;

  panel.querySelector('.panel-close').addEventListener('click', onClose);
  panel.addEventListener('click', (event) => {
    const row = event.target.closest('[data-setting]');
    if (row) {
      onAction(row.dataset.setting);
    }
  });
  return panel;
}
