/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require("path")
require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Meetsy reserwations`,
    author: `Hubert Mazur`,
    description: `Rezerwacje online`,
  },

  plugins: [
    {
      resolve: "gatsby-plugin-offline",
      options: {
        appendScript: require.resolve("./src/custom-sw.js"),
      },
    },
    {
      resolve: "gatsby-plugin-styled-components",
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: "./src/state/createStore",
        // [optional] - options passed to `serialize-javascript`
        // info: https://github.com/yahoo/serialize-javascript#options
        // will be merged with these defaults:
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
        // [optional] - if true will clean up after itself on the client, default:
        cleanupOnClient: true,
        // [optional] - name of key on `window` where serialized state will be stored, default:
        windowKey: "__PRELOADED_STATE__",
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Sku", "Product", "Price"],
        secretKey:
          "sk_test_51IVJ3xJdVBka0wzfMu79jGftD4HZj5hU5WsujypvG3Z2n5LgKrk2fj6kYyyv0kiiv1UxgJBUNB9QECXjls1VZgKX008JFBZZmQ",
        downloadFiles: true,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": path.resolve(__dirname, "src/components"),
          "@state": path.resolve(__dirname, "src/state"),
          "@common": path.resolve(__dirname, "src/common"),
          "@ui": path.resolve(__dirname, "src/ui"),
        },
        extensions: ["js"],
      },
    },
    "gatsby-plugin-transition-link",
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}

const siteMetadata = module.exports.siteMetadata

module.exports.plugins.push({
  resolve: `gatsby-plugin-manifest`,
  options: {
    name: siteMetadata.title,
    short_name: `Meetsy`,
    start_url: `/`,
    background_color: `#FF453C`,
    theme_color: `#070707`,
    display: "standalone",
    icon: "src/images/favicon-32x32.png",
    legacy: true,
  },
})
