import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

// 特商法のページは本文がすべてサーバーで描画されるので、HTML の本文だけを読む
async function readPageText(baseUrl: string | undefined, path: string) {
  const response = await fetch(new URL(path, baseUrl));
  expect(response.ok).toBe(true);
  const html = await response.text();
  return html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
}

test('英語の特商法ページの送料は決済と同じ', async ({ app }) => {
  const text = await readPageText(app.baseUrl, '/en/commerce');

  expect(text.includes('$50.00')).toBe(true);
  expect(text.includes('$600.00')).toBe(true);
  expect(text.includes('¥')).toBe(false);
});

test('日本語の特商法ページの送料は決済と同じ', async ({ app }) => {
  const text = await readPageText(app.baseUrl, '/ja/commerce');

  expect(text.includes('$50.00')).toBe(true);
  expect(text.includes('$600.00')).toBe(true);
  expect(text.includes('¥')).toBe(false);
});

test('英語の送料は配送のときだけの費用だと分かる', async ({ app }) => {
  const text = await readPageText(app.baseUrl, '/en/commerce');

  expect(text.includes('Additional Fees (for delivery orders)')).toBe(true);
});

test('商品ページに決済と同じ送料を表示する', async ({ app }) => {
  const en = await readPageText(app.baseUrl, '/en/products/1');
  const ja = await readPageText(app.baseUrl, '/ja/products/1');

  for (const text of [en, ja]) {
    expect(text.includes('$50.00')).toBe(true);
    expect(text.includes('$600.00')).toBe(true);
  }
});

test('受けていない配送日時の指定を FAQ に書かない', async ({ app }) => {
  const en = await readPageText(app.baseUrl, '/en/faq');
  const ja = await readPageText(app.baseUrl, '/ja/faq');

  expect(en.includes('How is delivery handled?')).toBe(true);
  expect(en.includes('delivery date')).toBe(false);
  expect(ja.includes('配送日時')).toBe(false);
});

test('FAQ の配送の回答は特商法の表記と同じ内容にする', async ({ app }) => {
  const en = await readPageText(app.baseUrl, '/en/faq');
  const ja = await readPageText(app.baseUrl, '/ja/faq');

  expect(en.includes('temperature control')).toBe(false);
  expect(en.includes('3-5 business days')).toBe(true);
  expect(ja.includes('温度管理')).toBe(false);
  expect(ja.includes('3-5営業日')).toBe(true);
});

test('扱っていない支払い方法と配送を書かない', async ({ app }) => {
  const en = await readPageText(app.baseUrl, '/en/commerce');
  const ja = await readPageText(app.baseUrl, '/ja/commerce');

  for (const word of ['Cash on Delivery', 'Bank Transfer', 'Cool delivery']) {
    expect(en.includes(word)).toBe(false);
  }
  for (const word of ['代金引換', '振込', 'クール便']) {
    expect(ja.includes(word)).toBe(false);
  }
});

test('免許番号の仮の文字を出さない', async ({ app }) => {
  const en = await readPageText(app.baseUrl, '/en/commerce');
  const ja = await readPageText(app.baseUrl, '/ja/commerce');

  expect(en.includes('〇〇')).toBe(false);
  expect(ja.includes('〇〇')).toBe(false);
  expect(en.includes('Alcohol Sales License')).toBe(true);
  expect(ja.includes('酒類販売業免許')).toBe(true);
});
