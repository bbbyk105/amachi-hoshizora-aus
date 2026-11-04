import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

type JsonLdItem = Record<string, unknown>;
type FaqQuestion = { name: string; acceptedAnswer: { text: string } };

async function readPage(baseUrl: string | undefined, path: string) {
  const response = await fetch(new URL(path, baseUrl));
  const html = await response.text();
  const scripts = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  // 1 つの script に配列で入っていても、1 件ずつの形にそろえる
  const items: JsonLdItem[] = Array.from(scripts).flatMap((match) => JSON.parse(match[1]));
  return { html, items };
}

const typesOf = (items: JsonLdItem[]) => items.map((item) => item['@type']);

test('全ページ共通は組織とサイトの情報を script で出す', async ({ app }) => {
  const { html, items } = await readPage(app.baseUrl, '/en');

  expect(typesOf(items)).toEqual(['Organization', 'WebSite']);
  expect(html.includes('name="application/ld+json"')).toBe(false);
});

test('サイトに書いていない所在地を出さない', async ({ app }) => {
  const { items } = await readPage(app.baseUrl, '/en');

  expect(items[0]).not.toHaveProperty('address');
  expect(items[0]).not.toHaveProperty('areaServed');
});

test('実データのない評価や存在しない検索ページを出さない', async ({ app }) => {
  const { html } = await readPage(app.baseUrl, '/en');

  expect(html.includes('aggregateRating')).toBe(false);
  expect(html.includes('SearchAction')).toBe(false);
});

test('商品ページに実際の価格の構造化データを出す', async ({ app }) => {
  const { items } = await readPage(app.baseUrl, '/en/products/1');

  expect(items.find((item) => item['@type'] === 'Product')).toMatchObject({
    name: 'Amachi Hoshisora Junmai Daiginjo 720ml',
    offers: {
      '@type': 'Offer',
      price: 120,
      priceCurrency: 'AUD',
      url: expect.stringContaining('/en/products/1'),
    },
  });
});

test('FAQ ページに画面と同じ質問と回答の構造化データを出す', async ({ app }) => {
  const { html, items } = await readPage(app.baseUrl, '/ja/faq');
  const faq = items.find((item) => item['@type'] === 'FAQPage');
  const questions = faq?.mainEntity as FaqQuestion[];
  const pageHtml = html.replace(/<script[\s\S]*?<\/script>/g, '');

  expect(questions).toHaveLength(8);
  for (const { name, acceptedAnswer } of questions) {
    expect(pageHtml.includes(name)).toBe(true);
    expect(pageHtml.includes(acceptedAnswer.text.slice(0, 20))).toBe(true);
  }
});

test('FAQ の回答は開くまで見えない', async ({ app, screen }) => {
  const { items } = await readPage(app.baseUrl, '/ja/faq');
  const faq = items.find((item) => item['@type'] === 'FAQPage');
  const [first] = faq?.mainEntity as FaqQuestion[];

  await app.open('/ja/faq');
  await screen.getByRole('button', '20歳以上です').tap();
  await expect(screen.getByText(first.acceptedAnswer.text)).toBeHidden();

  await screen.getByText(first.name).tap();

  await expect(screen.getByText(first.acceptedAnswer.text)).toBeVisible();
});
