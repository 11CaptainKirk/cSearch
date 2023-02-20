const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()({
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.lcsc.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
});
