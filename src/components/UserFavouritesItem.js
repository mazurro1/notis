import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { LinkEffect } from "../common/LinkEffect"
import { FaChrome } from "react-icons/fa"
import { MdDelete, MdArrowBack } from "react-icons/md"
import { Colors } from "../common/Colors"
import ReactTooltip from "react-tooltip"
import ButtonIcon from "./ButtonIcon"
import { deleteCompanyFavourites } from "../state/actions"
import { useDispatch } from "react-redux"
import { Site } from "../common/Site"
import Popup from "./Popup"

const TitleCategory = styled.div`
  position: relative;
  font-size: 1.25rem;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props => Colors(props.siteProps).primaryColor};
  padding: 10px;
  border-radius: 5px;
  padding-right: 150px;
  overflow: hidden;
  user-select: none;
  text-transform: uppercase;
  padding-right: 100px;
  margin-bottom: 10px;
  overflow: hidden;
  transition-property: padding-bottom, background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    padding-bottom: 40px;
    padding-right: 10px;
  }
`

const PositionCompanyLink = styled.div`
  position: absolute;
  right: 50px;
  top: 0px;
  border-radius: 5px;
  font-size: 1.8rem;
  padding: 8px;
  padding-bottom: 5px;
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  a {
    color: ${props => Colors(props.siteProps).textNormalWhite};
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }
  &:hover {
    transform: scale(1.1);
    a {
      color: ${props => Colors(props.siteProps).primaryColorDark};
    }
  }
  @media all and (max-width: ${Site.mobileSize + "px"}) {
    top: auto;
    bottom: -5px;
  }
`

const PositionCompanyFavDelete = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  border-radius: 5px;
  font-size: 1.8rem;
  padding: 8px;
  padding-bottom: 5px;
  cursor: pointer;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    transform: scale(1.2);
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }
  @media all and (max-width: ${Site.mobileSize + "px"}) {
    top: auto;
    bottom: 0px;
  }
`

const PositionRelative = styled.div`
  position: relative;
`

const ButtonsAddPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const UserFavouritesItem = ({
  siteProps,
  favourite,
  index,
  user,
  userResetFavourites,
  handleClose,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    setConfirmDelete(false)
  }, [userResetFavourites])

  const dispatch = useDispatch()

  const handleClickContentNoClicked = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    handleClose()
  }

  const handleClickConfirmDelete = () => {
    setConfirmDelete(prevState => !prevState)
  }

  const handleDeleteFromFav = () => {
    dispatch(deleteCompanyFavourites(user.token, favourite._id))
  }

  return (
    <PositionRelative>
      <ReactTooltip
        id={`goToWebsiteFav${index}`}
        effect="float"
        multiline={true}
      >
        <span>Przejdz do strony internetowej firmy</span>
      </ReactTooltip>
      <ReactTooltip
        id={`deleteFromFav${index}`}
        effect="float"
        multiline={true}
      >
        <span>Usuń z ulubionych</span>
      </ReactTooltip>
      <TitleCategory siteProps={siteProps}>
        {favourite.name}
        <PositionCompanyLink
          onClick={handleClickContentNoClicked}
          siteProps={siteProps}
          data-tip
          data-for={`goToWebsiteFav${index}`}
        >
          <LinkEffect
            path={`/company?${favourite.linkPath}`}
            text={<FaChrome />}
          />
        </PositionCompanyLink>
        <PositionCompanyFavDelete
          data-tip
          data-for={`deleteFromFav${index}`}
          onClick={handleClickConfirmDelete}
        >
          <MdDelete />
        </PositionCompanyFavDelete>
      </TitleCategory>
      <Popup
        popupEnable={confirmDelete}
        position="absolute"
        borderRadius
        noContent
      >
        <ButtonsAddPosition>
          <ButtonMargin>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="20"
              fontSize="15"
              icon={<MdArrowBack />}
              onClick={handleClickConfirmDelete}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
            />
          </ButtonMargin>
          <ButtonMargin>
            <ButtonIcon
              title="Usuń z ulubionych"
              uppercase
              fontIconSize="20"
              fontSize="15"
              icon={<MdDelete />}
              onClick={handleDeleteFromFav}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
            />
          </ButtonMargin>
        </ButtonsAddPosition>
      </Popup>
    </PositionRelative>
  )
}
export default UserFavouritesItem
