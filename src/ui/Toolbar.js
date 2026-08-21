import { iconMarkup } from './icons.js';

const OPTION_CONTENT = Object.freeze({
  pen: `
    <div class="color-swatches" aria-label="鋼筆色彩">
      <button class="swatch is-selected" type="button" aria-label="珊瑚紅" aria-pressed="true" style="--swatch:#ff4f43"></button>
      <button class="swatch" type="button" aria-label="白色" aria-pressed="false" style="--swatch:#f6f7f8"></button>
      <button class="swatch" type="button" aria-label="萊姆綠" aria-pressed="false" style="--swatch:#8df000"></button>
      <button class="swatch swatch-add" type="button" aria-label="加入色彩">+</button>
    </div>
    <div class="option-divider"></div>
    <div class="stroke-widths" aria-label="筆畫粗細">
      <button class="width-dot" type="button" aria-label="細" aria-pressed="false" style="--dot:3px"></button>
      <button class="width-dot is-selected" type="button" aria-label="中" aria-pressed="true" style="--dot:6px"></button>
      <button class="width-dot" type="button" aria-label="粗" aria-pressed="false" style="--dot:9px"></button>
    </div>
    <div class="option-divider"></div>
    <button class="line-preview" type="button" aria-label="線條樣式"><span></span></button>`,
  pencil: `
    <div class="color-swatches" aria-label="鉛筆色彩">
      <button class="swatch is-selected" type="button" aria-label="石墨灰" aria-pressed="true" style="--swatch:#d4d9df"></button>
      <button class="swatch" type="button" aria-label="藍色" aria-pressed="false" style="--swatch:#5ba7ff"></button>
      <button class="swatch" type="button" aria-label="紅色" aria-pressed="false" style="--swatch:#ff5e54"></button>
    </div>
    <div class="option-divider"></div>
    <span class="option-note">壓力感應將於繪圖階段啟用</span>`,
  highlighter: `
    <div class="color-swatches" aria-label="螢光筆色彩">
      <button class="swatch is-selected" type="button" aria-label="薄荷綠" aria-pressed="true" style="--swatch:#83f6c7"></button>
      <button class="swatch" type="button" aria-label="黃色" aria-pressed="false" style="--swatch:#fff312"></button>
      <button class="swatch" type="button" aria-label="萊姆綠" aria-pressed="false" style="--swatch:#83e600"></button>
      <button class="swatch swatch-add" type="button" aria-label="加入色彩">+</button>
    </div>
    <div class="option-divider"></div>
    <div class="stroke-widths" aria-label="螢光筆粗細">
      <button class="width-dot" type="button" aria-label="細" aria-pressed="false" style="--dot:5px"></button>
      <button class="width-dot is-selected" type="button" aria-label="中" aria-pressed="true" style="--dot:9px"></button>
      <button class="width-dot" type="button" aria-label="粗" aria-pressed="false" style="--dot:13px"></button>
    </div>
    <div class="option-divider"></div>
    <button class="line-preview" type="button" aria-label="線條樣式"><span></span></button>`,
  eraser: `
    <div class="stroke-widths" aria-label="橡皮擦大小">
      <button class="width-dot" type="button" aria-label="小" aria-pressed="false" style="--dot:5px"></button>
      <button class="width-dot is-selected" type="button" aria-label="中" aria-pressed="true" style="--dot:10px"></button>
      <button class="width-dot" type="button" aria-label="大" aria-pressed="false" style="--dot:15px"></button>
    </div>
    <div class="option-divider"></div>
    <div class="segmented-control" aria-label="擦除方式">
      <button class="is-selected" type="button" aria-pressed="true">整個</button>
      <button type="button" aria-pressed="false">局部</button>
    </div>`,
  select: `
    <div class="segmented-control" aria-label="選取方式">
      <button class="is-selected" type="button" aria-pressed="true">自由選取</button>
      <button type="button" aria-pressed="false">方形選取</button>
    </div>`,
  add: `<span class="option-note option-note-strong">加入內容面板</span><span class="phase-badge">介面骨架</span>`,
  ruler: `<span class="geometry-preview">${iconMarkup('ruler')} 直尺</span><span class="option-note">旋轉與吸附將於幾何階段啟用</span>`,
  compass: `<span class="geometry-preview geometry-preview-compass">${iconMarkup('compass')} 圓規</span><span class="geometry-step">圓心</span><span class="geometry-arrow">→</span><span class="geometry-step">半徑</span><span class="geometry-arrow">→</span><span class="geometry-step">預覽圓</span>`,
  laser: `
    <div class="color-swatches" aria-label="雷射筆色彩">
      <button class="swatch is-selected" type="button" aria-label="紅色" aria-pressed="true" style="--swatch:#ff4438"></button>
      <button class="swatch" type="button" aria-label="藍色" aria-pressed="false" style="--swatch:#3f92ff"></button>
      <button class="swatch" type="button" aria-label="綠色" aria-pressed="false" style="--swatch:#79ee48"></button>
    </div>
    <div class="option-divider"></div>
    <div class="segmented-control" aria-label="雷射尾跡">
      <button class="is-selected" type="button" aria-pressed="true">尾跡</button>
      <button type="button" aria-pressed="false">無尾跡</button>
    </div>`,
  hand: `<span class="option-note option-note-strong">拖動畫布</span><span class="phase-badge">無限畫布階段</span>`,
  text: `<span class="option-note option-note-strong">文字方塊</span><span class="phase-badge">物件階段</span>`,
});

function makeToolButton(tool) {
  const button = document.createElement('button');
  button.className = 'tool-button';
  button.type = 'button';
  button.dataset.tool = tool.id;
  button.title = `${tool.label}（${tool.shortcut}）`;
  button.setAttribute('aria-label', tool.label);
  button.setAttribute('aria-pressed', 'false');
  button.innerHTML = `${iconMarkup(tool.icon)}<span class="tool-active-mark"></span>`;
  return button;
}

function bindOptionGroups(options) {
  options.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || button.classList.contains('swatch-add') || button.classList.contains('line-preview')) {
      return;
    }

    const group = button.closest('.color-swatches, .stroke-widths, .segmented-control');
    if (!group) {
      return;
    }

    group.querySelectorAll('button').forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle('is-selected', selected);
      candidate.setAttribute('aria-pressed', String(selected));
    });
  });
}

export function createToolbar({ tools, state, onToolSelect, onPlaceholder }) {
  const palette = document.createElement('section');
  palette.className = 'tool-palette';
  palette.dataset.testid = 'tool-palette';
  palette.setAttribute('aria-label', '白板工具列');
  palette.innerHTML = `
    <div class="palette-primary-row">
      <button class="palette-drag-handle" type="button" aria-label="拖曳移動工具列" title="拖曳移動工具列">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </button>
      <div class="tool-list" role="toolbar" aria-label="白板工具"></div>
      <button class="palette-collapse" type="button" aria-label="收合設定列" aria-expanded="true">›</button>
    </div>
    <div class="tool-options" aria-label="工具設定"></div>`;

  const toolList = palette.querySelector('.tool-list');
  const options = palette.querySelector('.tool-options');
  const collapse = palette.querySelector('.palette-collapse');
  const dragHandle = palette.querySelector('.palette-drag-handle');
  const buttons = new Map();

  tools.forEach((tool) => {
    const button = makeToolButton(tool);
    button.addEventListener('click', () => onToolSelect(tool.id));
    toolList.append(button);
    buttons.set(tool.id, button);
  });

  bindOptionGroups(options);

  collapse.addEventListener('click', () => {
    const collapsed = palette.classList.toggle('is-collapsed');
    collapse.setAttribute('aria-expanded', String(!collapsed));
    collapse.setAttribute('aria-label', collapsed ? '展開設定列' : '收合設定列');
  });

  options.addEventListener('click', (event) => {
    if (event.target.closest('.swatch-add, .line-preview')) {
      onPlaceholder('自訂色彩與進階線條會在繪圖階段啟用');
    }
  });

  let drag = null;
  dragHandle.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) {
      return;
    }
    const { toolbarPosition } = state.getSnapshot();
    drag = {
      pointerId: event.pointerId,
      originX: event.clientX,
      originY: event.clientY,
      startX: toolbarPosition.x,
      startY: toolbarPosition.y,
    };
    dragHandle.setPointerCapture(event.pointerId);
    palette.classList.add('is-dragging');
  });

  dragHandle.addEventListener('pointermove', (event) => {
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }
    const rect = palette.getBoundingClientRect();
    const maxX = Math.max(0, (window.innerWidth - Math.min(rect.width, window.innerWidth)) / 2);
    const minY = -18;
    const maxY = Math.max(minY, window.innerHeight - rect.height - 30);
    const nextX = Math.max(-maxX, Math.min(maxX, drag.startX + event.clientX - drag.originX));
    const nextY = Math.max(minY, Math.min(maxY, drag.startY + event.clientY - drag.originY));
    state.setToolbarPosition(nextX, nextY);
  });

  function endDrag(event) {
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }
    dragHandle.releasePointerCapture(event.pointerId);
    drag = null;
    palette.classList.remove('is-dragging');
  }

  dragHandle.addEventListener('pointerup', endDrag);
  dragHandle.addEventListener('pointercancel', endDrag);

  function sync(snapshot) {
    buttons.forEach((button, id) => {
      const selected = id === snapshot.activeTool;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    options.innerHTML = OPTION_CONTENT[snapshot.activeTool];
    palette.style.setProperty('--palette-offset-x', `${snapshot.toolbarPosition.x}px`);
    palette.style.setProperty('--palette-offset-y', `${snapshot.toolbarPosition.y}px`);
  }

  return { element: palette, sync };
}
