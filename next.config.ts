import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// next-intlのプラグインを初期化
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {};

// next-intlプラグインを適用
export default withNextIntl(nextConfig);
