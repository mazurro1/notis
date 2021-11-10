import React from "react"
import { Routes, RoutesInterface } from "@common/Routes"
import { FaFacebookSquare } from "react-icons/fa"
import { LinkEffect } from "@common/LinkEffect"
import { useSelector } from "react-redux"
import { ParagraphText, withTranslates } from "@ui"
import * as styles from "./FooterStyle"
import { IFooterInterface } from "@common/Translates/Footer"
import { LoginUserInterface } from "@common/types"

const Footer = ({ texts }: { texts: IFooterInterface }) => {
  const siteProps = useSelector((state: any) => state.siteProps)
  const user: LoginUserInterface = useSelector((state: any) => state.user)
  console.log(user)
  const mapRoutes = Routes.map((item: RoutesInterface, index: number) => {
    return (
      <LinkEffect
        path={item.path}
        key={index}
        text={item.name}
        fontSize={0.95}
      />
    )
  })

  return (
    <styles.WrapperFooter siteProps={siteProps}>
      <styles.FooterDiv siteProps={siteProps}>
        <styles.LinkRoutes siteProps={siteProps}>{mapRoutes}</styles.LinkRoutes>
        <styles.FacebookIcon siteProps={siteProps}>
          <a href={texts.linkFacebook} target="__blank">
            <FaFacebookSquare />
          </a>
        </styles.FacebookIcon>
        <styles.ReservedRights>
          <ParagraphText
            text={texts.copyright}
            fontColor="GRAY"
            fontSize="SMALL"
          />
        </styles.ReservedRights>
      </styles.FooterDiv>
    </styles.WrapperFooter>
  )
}

export default withTranslates(Footer, "Footer")
