import React from "react"
import * as styled from "./ParagraphTextStyle"
import { useSelector } from "react-redux"
import { Colors } from "@common/Colors"

const ButtonIcon = ({
  fontSize = "MEDIUM",
  spanSize = "MEDIUM",
  fontUppercase = false,
  spanUppercase = false,
  id = "",
  text,
  fontBold = false,
  spanBold = false,
  fontColor = "BLACK",
  spanColor = "BLACK",
  margin = "0px",
  padding = "0px",
}: {
  margin?: string
  padding?: string
  fontSize?: "SMALL" | "MEDIUM" | "LARGE" | "TITLE" | "TITLE_SMALL"
  spanSize?: "SMALL" | "MEDIUM" | "LARGE"
  fontUppercase?: boolean
  spanUppercase?: boolean
  id?: string
  text: string
  fontBold?: boolean
  spanBold?: boolean
  fontColor?:
    | "BLACK"
    | "BLACK_FORCE"
    | "WHITE"
    | "WHITE_FORCE"
    | "BLUE"
    | "BLUE_DARK"
    | "ORANGE"
    | "ORANGE_DARK"
    | "GRAY"
  spanColor?:
    | "BLACK"
    | "BLACK_FORCE"
    | "WHITE"
    | "WHITE_FORCE"
    | "BLUE"
    | "BLUE_DARK"
    | "ORANGE"
    | "ORANGE_DARK"
}) => {
  const siteProps = useSelector((state: any) => state.siteProps)

  const fontSizeCheck: string =
    fontSize === "SMALL"
      ? 14 + "px"
      : fontSize === "MEDIUM"
      ? 16 + "px"
      : fontSize === "LARGE"
      ? 18 + "px"
      : fontSize === "TITLE"
      ? 1.4 + "rem"
      : fontSize === "TITLE_SMALL"
      ? 1 + "rem"
      : 14 + "px"

  const spanSizeCheck: number =
    spanSize === "SMALL" ? 14 : spanSize === "MEDIUM" ? 16 : 18

  let checkSpanColor: string = `${Colors(siteProps).textNormalBlack}`
  if (spanColor === "BLACK_FORCE") {
    checkSpanColor = Colors(siteProps).textBlack
  } else if (spanColor === "WHITE") {
    checkSpanColor = Colors(siteProps).textNormalWhite
  } else if (spanColor === "WHITE_FORCE") {
    checkSpanColor = "white"
  } else if (spanColor === "BLUE") {
    checkSpanColor = Colors(siteProps).primaryColor
  } else if (spanColor === "BLUE_DARK") {
    checkSpanColor = Colors(siteProps).primaryColorDark
  } else if (spanColor === "ORANGE") {
    checkSpanColor = Colors(siteProps).secondColor
  } else if (spanColor === "ORANGE_DARK") {
    checkSpanColor = Colors(siteProps).secondDarkColor
  }

  let checkFontColor: string = `${Colors(siteProps).textNormalBlack}`
  if (fontColor === "BLACK_FORCE") {
    checkFontColor = Colors(siteProps).textBlack
  } else if (fontColor === "WHITE") {
    checkFontColor = Colors(siteProps).textNormalWhite
  } else if (fontColor === "WHITE_FORCE") {
    checkFontColor = "white"
  } else if (fontColor === "BLUE") {
    checkFontColor = Colors(siteProps).primaryColor
  } else if (fontColor === "BLUE_DARK") {
    checkFontColor = Colors(siteProps).primaryColorDark
  } else if (fontColor === "ORANGE") {
    checkFontColor = Colors(siteProps).secondColor
  } else if (fontColor === "ORANGE_DARK") {
    checkFontColor = Colors(siteProps).secondDarkColor
  } else if (fontColor === "GRAY") {
    checkFontColor = Colors(siteProps).darkColorLight
  }

  interface idElementPInterface {
    id: string
  }

  const idElementP: idElementPInterface | {} = !!id ? { id: id } : {}

  return (
    <styled.ParagraphStyle
      {...idElementP}
      fontUppercase={fontUppercase}
      fontColor={checkFontColor}
      fontSize={fontSizeCheck}
      fontBold={fontBold}
      spanUppercase={spanUppercase}
      spanColor={checkSpanColor}
      spanSize={spanSizeCheck}
      spanBold={spanBold}
      margin={margin}
      padding={padding}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}

export default ButtonIcon
