exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
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
}
