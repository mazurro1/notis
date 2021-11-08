import React from "react"
import { Routes, RoutesInterface } from "@common/Routes"
import { FaFacebookSquare } from "react-icons/fa"
import { LinkEffect } from "@common/LinkEffect"
import { useSelector } from "react-redux"
import { ParagraphText } from "@ui"
import * as styles from "./FooterStyle"

const Footer = () => {
  const siteProps = useSelector((state: any) => state.siteProps)
  const mapRoutes = Routes.map((item: RoutesInterface, index: number) => {
    return <LinkEffect path={item.path} key={index} text={item.name} />
  })

  return (
    <styles.WrapperFooter siteProps={siteProps}>
      <styles.FooterDiv siteProps={siteProps}>
        <styles.LinkRoutes siteProps={siteProps}>{mapRoutes}</styles.LinkRoutes>
        <styles.FacebookIcon siteProps={siteProps}>
          <a href="https://www.facebook.com/" target="__blank">
            <FaFacebookSquare />
          </a>
        </styles.FacebookIcon>
        <styles.ReservedRights>
          <ParagraphText
            text="© 2020 Meetsy Wszystkie prawa zastrzeżone"
            fontColor="GRAY"
          />
        </styles.ReservedRights>
      </styles.FooterDiv>
    </styles.WrapperFooter>
  )
}

export default Footer
