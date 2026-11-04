import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';

export default {
  targets: [{
    engine: web(),
    app: {
      // 別プロジェクトの dev サーバーを誤って使わないよう、他と重なりにくい番号にする
      url: process.env.APP_URL ?? 'http://localhost:3776',
      command: {
        executable: 'npm',
        args: ['run', 'dev', '--', '--port', '{port}'],
        reuseExisting: true,
      },
    },
  }],
} satisfies E2EConfig;
