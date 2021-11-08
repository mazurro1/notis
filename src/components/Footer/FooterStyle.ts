import { Colors } from "@common/Colors"
import styled from "styled-components"
import { SitePropsInterface } from "@common/types"

export const WrapperFooter = styled.div<{
  siteProps: SitePropsInterface
}>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => Colors(props.siteProps).navBackground};
`

export const FooterDiv = styled.div<{
  siteProps: SitePropsInterface
}>`
  color: ${props => Colors(props.siteProps).navText};
  background-color: ${props => Colors(props.siteProps).navBackground};
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 30px;
  padding-top: 30px;
`

export const ReservedRights = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  text-align: center;
  font-size: 0.9rem;
  user-select: none;
  color: #bdbdbd;
`

export const LinkRoutes = styled.div<{
  siteProps: SitePropsInterface
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.9rem;

  a {
    padding: 10px;
    color: #bdbdbd;
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;

    &:hover {
      color: ${props => Colors(props.siteProps).primaryColor};
    }
  }
`

export const FacebookIcon = styled.div<{
  siteProps: SitePropsInterface
}>`
  text-align: center;

  a {
    font-size: 4rem;
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    color: white;

    &:hover {
      color: ${props => Colors(props.siteProps).primaryColor};
    }
  }
`
