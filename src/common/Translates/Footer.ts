interface IFooterInterface {
  linkFacebook: string
  copyright: string
}

const Footer = {
  PL: {
    linkFacebook: "https://www.facebook.com/",
    copyright: "© 2020 Meetsy Wszystkie prawa zastrzeżone",
  },
  EN: {
    linkFacebook: "https://www.facebook.com/",
    copyright: "© 2020 Meetsy All rights reserved",
  },
}

export { Footer, IFooterInterface }
