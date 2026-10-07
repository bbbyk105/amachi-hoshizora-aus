import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// next-intlのプラグインを初期化
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // メタデータのストリーミングを止め、canonical・hreflang・title を常に <head> に出す（<body> 側の canonical は Google が無視する）
  htmlLimitedBots: /.*/,
};

// next-intlプラグインを適用
export default withNextIntl(nextConfig);
