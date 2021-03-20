/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Nootis rezerwations`,
    author: `Hubert Mazur`,
    description: `Rezerwacje online`,
  },

  plugins: [
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

    "gatsby-plugin-transition-link",
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-offline`,
  ],
}

const siteMetadata = module.exports.siteMetadata

module.exports.plugins.push({
  resolve: `gatsby-plugin-manifest`,
  options: {
    name: siteMetadata.title,
    short_name: `Nootis`,
    start_url: `/`,
    background_color: `#FF453C`,
    theme_color: `#070707`,
    display: "standalone",
    icon: "src/images/favicon-32x32.png",
    legacy: true,
  },
})
