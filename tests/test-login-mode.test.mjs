import assert from 'node:assert/strict';
import test from 'node:test';
import { loadConfigFromFile } from 'vite';

async function config(mode) {
  return (await loadConfigFromFile({ mode, command: 'build' })).config;
}

test('production builds cannot enable test login even with the flag set', async () => {
  const previous = process.env.VITE_ENABLE_TEST_LOGIN;
  try {
    process.env.VITE_ENABLE_TEST_LOGIN = 'true';
    for (const mode of ['development', 'staging', 'production']) {
      const result = await config(mode);
      assert.equal(
        JSON.parse(result.define.__TEST_LOGIN_ENABLED__),
        mode !== 'production',
      );
    }
    process.env.VITE_ENABLE_TEST_LOGIN = 'false';
    assert.equal(
      JSON.parse((await config('staging')).define.__TEST_LOGIN_ENABLED__),
      false,
    );
  } finally {
    if (previous === undefined) delete process.env.VITE_ENABLE_TEST_LOGIN;
    else process.env.VITE_ENABLE_TEST_LOGIN = previous;
  }
});
