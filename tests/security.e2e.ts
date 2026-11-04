import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('ページにセキュリティヘッダーを付ける', async ({ app }) => {
  const { headers } = await fetch(new URL('/en', app.baseUrl));

  expect(headers.get('x-frame-options')).toBe('DENY');
  expect(headers.get('content-security-policy')).toContain("frame-ancestors 'none'");
  expect(headers.get('x-content-type-options')).toBe('nosniff');
  expect(headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin');
  expect(headers.get('strict-transport-security')).toContain('max-age=');
  expect(headers.get('x-powered-by')).toBeNull();
});

test('決済に失敗しても内部の文言を返さない', async ({ app }) => {
  // テスト用のサーバーには Stripe の鍵を渡していないので、Stripe に接続する前に失敗する（e2e.config.ts）
  const response = await fetch(new URL('/api/checkout', app.baseUrl), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      items: [{ id: 1, quantity: 1 }],
      paymentMethod: 'online',
      locale: 'en',
    }),
  });

  expect(response.status).toBe(500);
  expect(await response.json()).toEqual({});
});
