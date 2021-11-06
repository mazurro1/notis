exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/company/)) {
    page.matchPath = "/company/*"
    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/company-profil/)) {
    page.matchPath = "/company-profil/*"
    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/confirm-added-worker-to-company/)) {
    page.matchPath = "/confirm-added-worker-to-company/*"
    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/login-facebook/)) {
    page.matchPath = "/login-facebook/*"
    // Update the page.
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
