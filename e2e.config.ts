import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';

export default {
  targets: [{
    engine: web(),
    app: {
      // 別プロジェクトの dev サーバーを誤って使わないよう、他と重なりにくい番号にする
      url: 'http://localhost:3776',
      command: {
        executable: 'sh',
        // 開発サーバーは .next が空のときに同時アクセスで prerender-manifest.json が壊れ、
        // 全ページが 500 になることがあるので、本番ビルドに対して流す
        args: ['-c', 'npm run build && exec npx next start --port {port}'],
        // 本番の鍵で決済セッションを作らないよう、テスト用のサーバーには Stripe の鍵を渡さない。
        // 動いているサーバーには鍵が入っているかもしれないので、再利用（reuseExisting）はしない
        env: { STRIPE_SECRET_KEY: '' },
        log: '.e2e/logs/app.log',
        startupTimeout: 180_000,
      },
    },
  }],
} satisfies E2EConfig;
