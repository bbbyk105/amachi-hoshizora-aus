import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';

export default {
  targets: [{
    engine: web(),
    app: {
      // 別プロジェクトの dev サーバーを誤って使わないよう、他と重なりにくい番号にする
      url: 'http://localhost:3776',
      command: {
        executable: 'npm',
        args: ['run', 'dev', '--', '--port', '{port}'],
        // 本番の鍵で決済セッションを作らないよう、テスト用のサーバーには Stripe の鍵を渡さない。
        // 動いているサーバーには鍵が入っているかもしれないので、再利用（reuseExisting）はしない
        env: { STRIPE_SECRET_KEY: '' },
      },
    },
  }],
} satisfies E2EConfig;
