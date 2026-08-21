const ICONS = Object.freeze({
  add: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/>',
  arrowLeft: '<path d="m14.5 6-6 6 6 6"/><path d="M9 12h9"/>',
  camera: '<path d="M5 8h2l1.3-2h7.4L17 8h2v10H5z"/><circle cx="12" cy="13" r="3"/>',
  close: '<path d="m7 7 10 10M17 7 7 17"/>',
  compass: '<circle cx="12" cy="6.5" r="2"/><path d="m10.8 8.2-4 10.3M13.2 8.2l4 10.3M8.2 15.2h7.6"/><circle cx="6.5" cy="19" r="1"/><path d="M17.5 18v3"/>',
  dots: '<circle cx="6" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1" fill="currentColor" stroke="none"/>',
  eraser: '<path d="m8 18-3-3 8.5-9a2.1 2.1 0 0 1 3 0l1.5 1.5a2.1 2.1 0 0 1 0 3L11 18H8Z"/><path d="m10 9.5 5 5M8 18h10"/>',
  export: '<path d="M12 4v10M8.5 7.5 12 4l3.5 3.5"/><path d="M6 12v7h12v-7"/>',
  focus: '<path d="M8 4H4v4M16 4h4v4M20 16v4h-4M8 20H4v-4"/>',
  grid: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M4 15h16M10 4v16M15 4v16"/>',
  hand: '<path d="M8.5 11V6.5a1.5 1.5 0 0 1 3 0V10M11.5 10V5.5a1.5 1.5 0 0 1 3 0V10M14.5 10V7a1.5 1.5 0 0 1 3 0v6M8.5 10.5 7 9a1.6 1.6 0 0 0-2.3 2.2l4.8 6.1A5 5 0 0 0 13.4 19h.6a5 5 0 0 0 5-5v-3a1.5 1.5 0 0 0-1.5-1.5"/>',
  highlighter: '<path d="m8 16-3-3 8-8 3 3-8 8Z"/><path d="m8 16 3 3M4 20h8M12 6l3 3"/>',
  image: '<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m6 17 4-4 3 3 2-2 3 3"/>',
  import: '<path d="M12 4v10M8.5 10.5 12 14l3.5-3.5"/><path d="M5 17v3h14v-3"/>',
  laser: '<path d="m6 18 8-8M13 6l5 5M15.5 3.5v3M20.5 8.5h-3M18.8 4.8l-2.1 2.1"/><circle cx="7" cy="18" r="2"/>',
  layers: '<path d="m12 4 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 16l8 4 8-4"/>',
  more: '<circle cx="6" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1" fill="currentColor" stroke="none"/>',
  pen: '<path d="m6 18 2-5 7.5-7.5a2.1 2.1 0 0 1 3 3L11 16l-5 2Z"/><path d="m13.5 7.5 3 3M8 13l3 3M5 20h6"/>',
  pencil: '<path d="m5 17 1-4L15.5 3.5a1.8 1.8 0 0 1 2.5 0l2.5 2.5a1.8 1.8 0 0 1 0 2.5L11 18l-4 1-2-2Z"/><path d="m14 5 5 5M6 13l5 5"/>',
  redo: '<path d="M19 8h-5a6 6 0 1 0 5.2 9"/><path d="m16 5 3 3-3 3"/>',
  ruler: '<path d="m5 16 11-11 3 3L8 19l-3-3Z"/><path d="m12 9 3 3M9.5 11.5l1.5 1.5M14.5 6.5 16 8"/>',
  ruled: '<rect x="5" y="4" width="14" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/>',
  scan: '<path d="M8 4H4v4M16 4h4v4M20 16v4h-4M8 20H4v-4"/><rect x="7" y="8" width="10" height="8" rx="1"/><path d="M9 11h6M9 13h4"/>',
  select: '<path stroke-dasharray="2.5 2.5" d="M19 12a7 7 0 1 1-2.1-5"/><path d="m16 4 3 1-1 3"/>',
  sparkles: '<path d="m12 3 1.1 3.2L16 8l-2.9 1.8L12 13l-1.1-3.2L8 8l2.9-1.8L12 3ZM18.5 13l.7 2.1L21 16l-1.8.9-.7 2.1-.7-2.1L16 16l1.8-.9.7-2.1ZM6 14l.7 2 1.8.8-1.8.9-.7 2-.7-2-1.8-.9 1.8-.8.7-2Z"/>',
  template: '<rect x="5" y="4" width="14" height="16" rx="2"/><path d="M8 8h8M8 12h3M13 12h3M8 16h8"/>',
  text: '<path d="M5 6V4h14v2M12 4v16M8 20h8"/>',
  undo: '<path d="M5 8h5a6 6 0 1 1-5.2 9"/><path d="m8 5-3 3 3 3"/>',
});

export function iconMarkup(name, className = '') {
  const content = ICONS[name];
  if (!content) {
    throw new RangeError(`Unknown icon: ${name}`);
  }

  return `<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${content}</svg>`;
}
