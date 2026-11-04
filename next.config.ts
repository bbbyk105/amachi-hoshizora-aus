import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// next-intlのプラグインを初期化
const withNextIntl = createNextIntlPlugin();

// script の CSP は、インラインのスクリプトに nonce が要り静的生成と両立しないので入れていない
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  headers: async () => [{ source: "/:path*", headers: securityHeaders }],
  // メタデータのストリーミングを止め、canonical・hreflang・title を常に <head> に出す（<body> 側の canonical は Google が無視する）
  htmlLimitedBots: /.*/,
};

// next-intlプラグインを適用
export default withNextIntl(nextConfig);
