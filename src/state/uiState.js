const BACKGROUNDS = new Set(['plain', 'ruled', 'grid', 'dots']);
const PANELS = new Set(['media', 'more']);

function frozenSnapshot(state) {
  return Object.freeze({
    ...state,
    toolbarPosition: Object.freeze({ ...state.toolbarPosition }),
  });
}

export function createUiState({ toolIds, initialTool = 'pen' }) {
  const allowedTools = new Set(toolIds);

  if (!allowedTools.has(initialTool)) {
    throw new RangeError(`Unknown initial tool: ${initialTool}`);
  }

  let current = frozenSnapshot({
    activeTool: initialTool,
    background: 'plain',
    focusMode: false,
    openPanel: null,
    toolbarPosition: { x: 0, y: 0 },
  });
  const listeners = new Set();

  function publish(patch) {
    current = frozenSnapshot({ ...current, ...patch });
    listeners.forEach((listener) => listener(current));
  }

  return Object.freeze({
    getSnapshot() {
      return current;
    },

    subscribe(listener) {
      listeners.add(listener);
      listener(current);
      return () => listeners.delete(listener);
    },

    selectTool(toolId) {
      if (!allowedTools.has(toolId)) {
        throw new RangeError(`Unknown tool: ${toolId}`);
      }
      publish({ activeTool: toolId });
    },

    setBackground(background) {
      if (!BACKGROUNDS.has(background)) {
        throw new RangeError(`Unknown background: ${background}`);
      }
      publish({ background });
    },

    setPanel(panel) {
      if (panel !== null && !PANELS.has(panel)) {
        throw new RangeError(`Unknown panel: ${panel}`);
      }
      publish({ openPanel: panel });
    },

    togglePanel(panel) {
      if (!PANELS.has(panel)) {
        throw new RangeError(`Unknown panel: ${panel}`);
      }
      publish({ openPanel: current.openPanel === panel ? null : panel });
    },

    toggleFocus() {
      publish({ focusMode: !current.focusMode, openPanel: null });
    },

    setToolbarPosition(x, y) {
      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        throw new TypeError('Toolbar position must be finite.');
      }
      publish({ toolbarPosition: { x, y } });
    },
  });
}
