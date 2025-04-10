const config = {
  plugins: [
    "@tailwindcss/postcss",
    // Add cssnano in production
    ...(process.env.NODE_ENV === "production"
        ? [
        [
          "cssnano",
          {
            preset: [
              "default",
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          },
        ],
      ]
        : []),
  ],
};

export default config;
