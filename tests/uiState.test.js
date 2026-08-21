import { describe, expect, it, vi } from 'vitest';
import { createUiState } from '../src/state/uiState.js';

const toolIds = ['pen', 'eraser', 'compass'];

describe('ui state', () => {
  it('starts with a stable whiteboard shell snapshot', () => {
    const state = createUiState({ toolIds });

    expect(state.getSnapshot()).toEqual({
      activeTool: 'pen',
      background: 'plain',
      focusMode: false,
      openPanel: null,
      toolbarPosition: { x: 0, y: 0 },
    });
    expect(Object.isFrozen(state.getSnapshot())).toBe(true);
    expect(Object.isFrozen(state.getSnapshot().toolbarPosition)).toBe(true);
  });

  it('publishes validated state changes to subscribers', () => {
    const state = createUiState({ toolIds });
    const listener = vi.fn();
    const unsubscribe = state.subscribe(listener);

    state.selectTool('compass');
    state.setBackground('grid');
    state.togglePanel('media');
    state.setToolbarPosition(24, 12);
    state.toggleFocus();

    expect(listener).toHaveBeenLastCalledWith(
      expect.objectContaining({
        activeTool: 'compass',
        background: 'grid',
        focusMode: true,
        openPanel: null,
        toolbarPosition: { x: 24, y: 12 },
      }),
    );

    unsubscribe();
    const count = listener.mock.calls.length;
    state.selectTool('eraser');
    expect(listener).toHaveBeenCalledTimes(count);
  });

  it('rejects unknown values and invalid coordinates', () => {
    const state = createUiState({ toolIds });

    expect(() => state.selectTool('paint')).toThrow(RangeError);
    expect(() => state.setBackground('paper')).toThrow(RangeError);
    expect(() => state.setPanel('layers')).toThrow(RangeError);
    expect(() => state.setToolbarPosition(Number.NaN, 0)).toThrow(TypeError);
  });
});
