module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `react-app`,
  alias: [
    ["@components", "./src/components"],
    ["@state", "./src/state"],
  ],
  node: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    paths: ["./src"],
  },
}
