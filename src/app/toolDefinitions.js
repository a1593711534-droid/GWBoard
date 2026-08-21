export const TOOL_DEFINITIONS = Object.freeze([
  { id: 'pen', label: '鋼筆', icon: 'pen', shortcut: '1' },
  { id: 'pencil', label: '鉛筆', icon: 'pencil', shortcut: '2' },
  { id: 'highlighter', label: '螢光筆', icon: 'highlighter', shortcut: '3' },
  { id: 'eraser', label: '橡皮擦', icon: 'eraser', shortcut: '4' },
  { id: 'select', label: '選取', icon: 'select', shortcut: '5' },
  { id: 'add', label: '加入', icon: 'add', shortcut: '6' },
  { id: 'ruler', label: '直尺', icon: 'ruler', shortcut: '7' },
  { id: 'compass', label: '圓規', icon: 'compass', shortcut: '8' },
  { id: 'laser', label: '雷射筆', icon: 'laser', shortcut: '9' },
  { id: 'hand', label: '手勢', icon: 'hand', shortcut: '0' },
  { id: 'text', label: '文字', icon: 'text', shortcut: 'T' },
]);

export const TOOL_IDS = Object.freeze(TOOL_DEFINITIONS.map(({ id }) => id));

export function getToolDefinition(id) {
  return TOOL_DEFINITIONS.find((tool) => tool.id === id) ?? null;
}
