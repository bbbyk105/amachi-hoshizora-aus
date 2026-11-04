import { beforeEach, describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

const LEGACY_LOCATION_KEY = 'amachi_location_v1';

// 位置情報 API の呼び出しを数える。返事は返さない（許可ダイアログを放置している状態）
function countGeolocationCalls() {
  const w = window as unknown as { __geoCalls: number };
  w.__geoCalls = 0;
  navigator.geolocation.getCurrentPosition = () => {
    w.__geoCalls += 1;
  };
}

const geoCalls = () => (window as unknown as { __geoCalls: number }).__geoCalls;

describe('年齢確認', () => {
  beforeEach(async ({ browser }) => {
    await browser.setViewport({ width: 1280, height: 800 });
    await browser.addInitScript(countGeolocationCalls);
  });

  for (const [path, confirmLabel] of [
    ['/ja', '20歳以上です'],
    ['/en', 'I am 18 or older'],
  ] as const) {
    test(`${path} は確認するとすぐ入れて、位置情報を求めない`, async ({ app, browser, screen }) => {
      await app.open(path);

      await screen.getByRole('button', confirmLabel).tap();

      await expect(screen.getByRole('dialog')).toBeHidden();
      await expect(screen.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await browser.evaluate(geoCalls)).toBe(0);
    });
  }

  test('確認画面に位置情報の案内を出さない', async ({ app, screen }) => {
    await app.open('/ja');

    await expect(screen.getByRole('button', '20歳以上です')).toBeVisible();
    await expect(screen.getByText(/位置情報/)).toHaveCount(0);
  });

  test('以前の版が保存した位置情報を消す', async ({ app, browser }) => {
    await app.open('/ja');
    await browser.evaluate((key) => {
      localStorage.setItem(key, '{"lat":-33.87,"lng":151.21}');
      return true;
    }, LEGACY_LOCATION_KEY);

    await browser.reload();

    await expect
      .poll(() => browser.evaluate((key) => localStorage.getItem(key), LEGACY_LOCATION_KEY))
      .toBeNull();
  });

  test('2回目以降は確認画面が出ない', async ({ app, browser, screen }) => {
    await app.open('/ja');
    await screen.getByRole('button', '20歳以上です').tap();
    await expect(screen.getByRole('dialog')).toBeHidden();

    await browser.reload();

    // 確認画面はハイドレーション後に描画されるので、終わるのを待ってから確かめる
    await expect(browser.locator('html.motion-ready')).toBeAttached();
    await expect(screen.getByRole('dialog')).toBeHidden();
  });
});
