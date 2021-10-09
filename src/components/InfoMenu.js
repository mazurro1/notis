import React from "react"
import styled from "styled-components"
import { MdHelp, MdClose, MdArrowBack } from "react-icons/md"
import { Colors } from "../common/Colors"
import Popup from "./Popup"
import { addAlertItem } from "../state/actions"
import { useDispatch } from "react-redux"
import ButtonIcon from "../components/ButtonIcon"
import InfoMenuItem from "./InfoMenuItem"

const PositionInfoMenu = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  z-index: 200;
  background-color: ${props => Colors(props.siteProps).primaryColor};
  padding: 10px;
  transform: ${props =>
    props.helpVisible ? "translateX(0%)" : "translateX(100%)"};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: 2rem;
  line-height: 0;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0 0 10px 2px rgb(0, 0, 0, 0.2);
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const ContentInfo = styled.div``

const ContentInfoHeight = styled.div`
  margin-bottom: 40px;
  height: calc(90vh - 41px - 60px);
  overflow-y: auto;
`

const ContentInfoMenuButtons = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
`

const MarginButtons = styled.div`
  margin: 10px;
  margin-left: 0px;
  margin-right: 20px;
`

const PopupContent = styled.div`
  position: relative;
  background-color: white;
  max-width: 900px;
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  border-radius: 5px;
  max-height: 90vh;
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  overflow: hidden;
`

const TitlePagePopup = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: 1.4rem;
  padding: 5px 10px;
  padding-right: 35px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2) inset;

  @media all and (max-width: 767px) {
    font-size: 1.2rem;
  }
`

const PaddingContnent = styled.div`
  padding: 10px 15px;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: ${props => (props.maxHeight ? "calc(100% - 41px)" : "auto")};
  max-height: ${props => (props.maxHeight ? "calc(90vh - 41px)" : "auto")};
`

const PopupWindow = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: default;
  transform: ${props =>
    props.helpContentVisible ? "translateX(0%)" : "translateX(100%)"};

  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const InfoMenu = props => {
  const {
    siteProps,
    helpVisible,
    setHelpVisible,
    setHelpContentVisible,
    helpContentVisible,
    location,
  } = props

  const dispatch = useDispatch()

  const menuInfo = [
    {
      title: "Gdzie znajdują się usługi firmy?",
      steps: [
        {
          title:
            "Znajdz odpowiadającą Tobie firmę, a następnie kliknij przycisk Rezerwuj",
          path: "/",
          elementId: "PlaceItem",
          elementName: "Pokaż firmy",
          enableRoute: true,
          routeName: "Przejdz do strony wyboru firm",
        },
        {
          title: "Gdy wybierzesz już firmę to przejdz do usług",
          path: "/company",
          elementId: "AllCategoryOfServices",
          elementName: "Pokaż usługi",
          enableRoute: false,
          routeName: null,
        },
      ],
    },
  ]

  const handleClickInfo = elementId => {
    console.log(elementId)
    if (!!elementId) {
      const selectedElement = `#${elementId}`
      const elements = document.querySelectorAll(selectedElement)
      if (!!elements) {
        if (elements.length > 0) {
          setHelpContentVisible(false)
          for (const itemElement of elements) {
            itemElement.classList.add("selectedInfoElement")
            setTimeout(() => {
              itemElement.classList.remove("selectedInfoElement")
            }, 2000)
          }
          window.scrollTo(0, elements[0].offsetTop - 30)
        } else {
          dispatch(addAlertItem("Nie znaleziono elementu", "red"))
        }
      } else {
        dispatch(addAlertItem("Nie znaleziono elementu", "red"))
      }
    }
  }

  const handleClickShowContentHelp = () => {
    setHelpContentVisible(prevState => !prevState)
  }

  const handleCloseHelp = () => {
    setHelpContentVisible(false)
    setTimeout(() => {
      setHelpVisible(false)
    }, 300)
  }

  const mapMenuInfo = menuInfo.map((itemMenu, itemMenuIndex) => {
    return (
      <InfoMenuItem
        key={itemMenuIndex}
        itemMenu={itemMenu}
        itemMenuIndex={itemMenuIndex}
        handleClickInfo={handleClickInfo}
        pathname={location.pathname}
        siteProps={siteProps}
        handleClickShowContentHelp={handleClickShowContentHelp}
      />
    )
  })

  return (
    <>
      <PositionInfoMenu
        helpVisible={helpVisible}
        siteProps={siteProps}
        onClick={handleClickShowContentHelp}
      >
        <MdHelp />
      </PositionInfoMenu>
      {helpVisible && (
        <PopupWindow helpContentVisible={helpContentVisible}>
          <PopupContent>
            <TitlePagePopup siteProps={siteProps}>Pomoc</TitlePagePopup>
            <PaddingContnent maxHeight>
              <div>
                <ContentInfoHeight>
                  <ContentInfo>{mapMenuInfo}</ContentInfo>
                </ContentInfoHeight>
                <ContentInfoMenuButtons>
                  <MarginButtons>
                    <ButtonIcon
                      title="Schowaj"
                      uppercase
                      fontIconSize="22"
                      fontSize="16"
                      icon={<MdArrowBack />}
                      customColorButton={Colors(siteProps).primaryColorDark}
                      customColorIcon={Colors(siteProps).primaryColor}
                      onClick={handleClickShowContentHelp}
                    />
                  </MarginButtons>
                  <MarginButtons>
                    <ButtonIcon
                      title="Zamknij"
                      uppercase
                      fontIconSize="22"
                      fontSize="16"
                      icon={<MdClose />}
                      customColorButton={Colors(siteProps).dangerColorDark}
                      customColorIcon={Colors(siteProps).dangerColor}
                      onClick={handleCloseHelp}
                    />
                  </MarginButtons>
                </ContentInfoMenuButtons>
              </div>
            </PaddingContnent>
          </PopupContent>
        </PopupWindow>
      )}
    </>
  )
}
export default InfoMenu
