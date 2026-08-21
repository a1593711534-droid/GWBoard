import { describe, expect, it } from 'vitest';
import { TOOL_DEFINITIONS, TOOL_IDS, getToolDefinition } from '../src/app/toolDefinitions.js';

describe('tool definitions', () => {
  it('keeps every tool id unique', () => {
    expect(new Set(TOOL_IDS).size).toBe(TOOL_DEFINITIONS.length);
  });

  it('includes the planned compass workflow entry', () => {
    expect(getToolDefinition('compass')).toMatchObject({
      id: 'compass',
      label: '圓規',
      shortcut: '8',
    });
  });

  it('returns null for an unknown tool', () => {
    expect(getToolDefinition('unknown')).toBeNull();
  });
});
