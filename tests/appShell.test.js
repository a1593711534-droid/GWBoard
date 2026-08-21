/** @vitest-environment happy-dom */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app/createApp.js';

class ResizeObserverStub {
  observe() {}

  disconnect() {}
}

describe('application shell interactions', () => {
  let app;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    vi.stubGlobal('ResizeObserver', ResizeObserverStub);
    vi.spyOn(window.HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      clearRect: vi.fn(),
      setTransform: vi.fn(),
    });
    app = createApp(document.querySelector('#app'));
  });

  afterEach(() => {
    app.destroy();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.body.replaceChildren();
  });

  it('renders every phase-one tool and selects the compass workflow', () => {
    const tools = [...document.querySelectorAll('[data-tool]')];
    const compass = document.querySelector('[data-tool="compass"]');

    expect(tools).toHaveLength(11);
    expect(document.querySelector('[data-tool="pen"]').getAttribute('aria-pressed')).toBe('true');

    compass.click();

    expect(compass.getAttribute('aria-pressed')).toBe('true');
    expect(document.querySelector('.tool-options').textContent).toContain('圓心');
    expect(document.querySelector('.tool-options').textContent).toContain('半徑');
    expect(document.querySelector('.tool-options').textContent).toContain('預覽圓');
  });

  it('toggles the grid background and media panel', () => {
    const board = document.querySelector('[data-engine-status="shell"]');
    const grid = document.querySelector('[data-background="grid"]');

    grid.click();
    expect(board.dataset.background).toBe('grid');
    expect(grid.getAttribute('aria-pressed')).toBe('true');

    grid.click();
    expect(board.dataset.background).toBe('plain');

    document.querySelector('[data-tool="add"]').click();
    expect(document.querySelector('[data-panel="media"]').hidden).toBe(false);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(document.querySelector('[data-panel="media"]').hidden).toBe(true);
  });

  it('supports keyboard tool shortcuts and focus mode escape', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '8' }));
    expect(app.state.getSnapshot().activeTool).toBe('compass');

    document.querySelector('[data-action="focus"]').click();
    expect(document.querySelector('.gwboard-shell').classList.contains('is-focus-mode')).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(document.querySelector('.gwboard-shell').classList.contains('is-focus-mode')).toBe(false);
  });
});
