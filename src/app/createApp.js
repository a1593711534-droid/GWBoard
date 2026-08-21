import { InfiniteCanvasShell } from '../canvas/InfiniteCanvasShell.js';
import { TOOL_DEFINITIONS, TOOL_IDS, getToolDefinition } from './toolDefinitions.js';
import { createUiState } from '../state/uiState.js';
import { createBottomDock } from '../ui/BottomDock.js';
import { iconMarkup } from '../ui/icons.js';
import { createMediaPanel, createMorePanel } from '../ui/Panels.js';
import { createToastRegion } from '../ui/Toast.js';
import { createToolbar } from '../ui/Toolbar.js';
import { createTopControls } from '../ui/TopControls.js';

export function createApp(root) {
  const state = createUiState({ toolIds: TOOL_IDS });
  const shell = document.createElement('main');
  shell.className = 'gwboard-shell';
  shell.innerHTML = `
    <div class="board-host"></div>
    <button class="back-button glass-panel" type="button" aria-label="返回" title="返回">
      ${iconMarkup('arrowLeft')}
    </button>
    <div class="stage-status" aria-label="目前開發階段">
      <span></span>
      <strong>階段 1</strong>
      <span>介面骨架</span>
    </div>
    <button class="focus-exit glass-panel" type="button" aria-label="離開專注模式">
      ${iconMarkup('focus')}<span>離開專注</span>
    </button>`;
  root.replaceChildren(shell);

  const canvasShell = new InfiniteCanvasShell(shell.querySelector('.board-host'));
  const toast = createToastRegion();

  function showPlaceholder(message) {
    toast.show(message);
  }

  function selectTool(toolId) {
    state.selectTool(toolId);
    state.setPanel(toolId === 'add' ? 'media' : null);
  }

  const toolbar = createToolbar({
    tools: TOOL_DEFINITIONS,
    state,
    onToolSelect: selectTool,
    onPlaceholder: showPlaceholder,
  });

  const topControls = createTopControls({
    onAction(action) {
      if (action === 'more') {
        state.togglePanel('more');
      } else if (action === 'focus') {
        state.toggleFocus();
      } else if (action === 'export') {
        showPlaceholder('匯出會在資料與分享階段啟用');
      }
    },
  });

  const bottomDock = createBottomDock({
    onBackground(background) {
      const next = state.getSnapshot().background === background ? 'plain' : background;
      state.setBackground(next);
    },
    onAction(action) {
      const messages = {
        import: '檔案匯入會在媒體階段啟用',
        scan: '掃描會在媒體階段啟用',
        template: '模板庫會在背景與文件階段啟用',
      };
      showPlaceholder(messages[action]);
    },
  });

  const mediaPanel = createMediaPanel({
    onClose: () => state.setPanel(null),
    onPlaceholder: showPlaceholder,
  });
  const morePanel = createMorePanel({
    onClose: () => state.setPanel(null),
    onAction(action) {
      if (action === 'plain') {
        state.setBackground('plain');
        state.setPanel(null);
      } else {
        showPlaceholder('GWBoard 0.1.0 · 階段 1');
      }
    },
  });

  shell.append(
    toolbar.element,
    topControls,
    bottomDock.element,
    mediaPanel,
    morePanel,
    toast.element,
  );

  shell.querySelector('.back-button').addEventListener('click', () => {
    showPlaceholder('這是獨立單頁白板，尚未建立文件列表');
  });
  shell.querySelector('.focus-exit').addEventListener('click', () => state.toggleFocus());

  const shortcutMap = new Map(
    TOOL_DEFINITIONS.map((tool) => [tool.shortcut.toUpperCase(), tool.id]),
  );

  function onKeyDown(event) {
    const target = event.target;
    if (target instanceof HTMLElement && (target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(target.tagName))) {
      return;
    }

    if (event.key === 'Escape') {
      if (state.getSnapshot().openPanel) {
        state.setPanel(null);
      } else if (state.getSnapshot().focusMode) {
        state.toggleFocus();
      }
      return;
    }

    const toolId = shortcutMap.get(event.key.toUpperCase());
    if (toolId && !event.metaKey && !event.ctrlKey && !event.altKey) {
      selectTool(toolId);
    }
  }
  window.addEventListener('keydown', onKeyDown);

  const unsubscribe = state.subscribe((snapshot) => {
    shell.classList.toggle('is-focus-mode', snapshot.focusMode);
    shell.dataset.activeTool = snapshot.activeTool;
    canvasShell.setBackground(snapshot.background);
    toolbar.sync(snapshot);
    bottomDock.sync(snapshot);
    mediaPanel.hidden = snapshot.openPanel !== 'media';
    morePanel.hidden = snapshot.openPanel !== 'more';

    const activeTool = getToolDefinition(snapshot.activeTool);
    shell.style.setProperty('--active-tool-label', `"${activeTool.label}"`);
  });

  return Object.freeze({
    state,
    destroy() {
      unsubscribe();
      canvasShell.destroy();
      window.removeEventListener('keydown', onKeyDown);
      root.replaceChildren();
    },
  });
}
