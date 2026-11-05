import test from 'node:test';
import assert from 'node:assert/strict';
import { inventory } from './main.mjs';
test('contrat et limite', () => {
  assert.deepEqual(inventory({ clips: [] }), { clips: [], count: 0, totalSeconds: 0 });
  assert.throws(() => inventory({ clips: [{ name: 'a', durationSeconds: 0 }] }));
});

