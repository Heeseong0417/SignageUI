const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/Home',
          permanent: true, // permanent: true는 301 리디렉션을 의미
        },
      ];
    },
  };

  module.exports = nextConfig;