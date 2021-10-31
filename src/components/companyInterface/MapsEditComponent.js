import React, { useState, useEffect } from "react"
import { ButtonIcon, Popup, InputIcon } from "@ui"
import { MdEdit } from "react-icons/md"
import { FaMapMarkerAlt, FaSave, FaArrowLeft } from "react-icons/fa"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { fetchSaveMaps } from "@state/actions"
import { useDispatch } from "react-redux"

const ParagraphStyle = styled.div`
  overflow-wrap: normal;
  word-break: normal;
  margin-bottom: 10px;
`
const MarginButton = styled.div`
  margin-left: 5px;
`

const PositionRelative = styled.div`
  font-size: 1rem;
  padding-bottom: ${props => (props.editMap ? "250px" : "0px")};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const ButtonTextPositionMap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`

const TitleRightColumnEdit = styled.div`
  padding: 5px 10px;
  background-color: ${props => Colors(props.siteProps).secondColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: 1rem;
`

const MapsEditComponent = ({
  editMap,
  setEditMap,
  disabledEditButtons,
  handleResetAllEditedComponents,
  TitleRightColumn,
  siteProps,
  isCompanyEditProfil,
  ButtonEditPosition,
  companyLat,
  companyLong,
  user,
}) => {
  const [latText, setLatText] = useState("")
  const [longText, setLongText] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!companyLat) {
      setLatText(companyLat)
    } else {
      setLatText("")
    }
    if (!!companyLong) {
      setLongText(companyLong)
    } else {
      setLongText("")
    }
  }, [companyLat, companyLong, editMap])

  useEffect(() => {
    setEditMap(false)
  }, [companyLat, companyLong]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickEdit = () => {
    handleResetAllEditedComponents()
    setEditMap(prevState => !prevState)
  }

  const handleReset = () => {
    setEditMap(false)
  }

  const handleChange = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleSaveMap = () => {
    const maps = {
      lat: latText,
      long: longText,
    }
    dispatch(fetchSaveMaps(user.token, user.company._id, maps))
  }

  const disabledButtonSave =
    (latText !== companyLat || longText !== companyLong) &&
    !!latText &&
    !!longText

  return (
    <PositionRelative editMap={editMap}>
      <TitleRightColumn isCompanyEditProfil={editMap} siteProps={siteProps}>
        MAPA
      </TitleRightColumn>
      {!!!companyLat && !!!companyLong && (
        <ParagraphStyle>
          Aby mapy działały wpisz lokalizacje geograficzną z generatora do
          którego podany jest link w edytorze.
        </ParagraphStyle>
      )}
      <div>Latitude: {!!companyLat ? companyLat : "Brak"}</div>
      <div>Longitude: {!!companyLong ? companyLong : "Brak"}</div>

      {isCompanyEditProfil && (
        <ButtonEditPosition>
          <div data-tip data-for="disabledButton">
            <ButtonIcon
              title="Edytuj mapę"
              uppercase
              fontIconSize="25"
              fontSize="14"
              icon={<MdEdit />}
              secondColors
              onClick={handleClickEdit}
              disabled={disabledEditButtons}
              isFetchToBlock
            />
          </div>
        </ButtonEditPosition>
      )}
      <Popup
        popupEnable={editMap}
        position="absolute"
        title="Edycja mapy"
        borderRadius
        closeTitle={false}
        smallTitle
        secondColors
      >
        <InputIcon
          icon={<FaMapMarkerAlt />}
          placeholder="Latitude"
          value={latText}
          type="number"
          onChange={e => handleChange(e, setLatText)}
          validText="Wartość wymagana"
        />
        <InputIcon
          icon={<FaMapMarkerAlt />}
          placeholder="Longitude"
          value={longText}
          type="number"
          onChange={e => handleChange(e, setLongText)}
          validText="Wartość wymagana"
        />
        <a
          href="https://www.latlong.net/convert-address-to-lat-long.html"
          target="__blank"
        >
          <ButtonIcon
            title="Generator lokalizacji"
            uppercase
            fontIconSize="18"
            fontSize="14"
            icon={<FaMapMarkerAlt />}
            isFetchToBlock
          />
        </a>
        <ButtonTextPositionMap>
          <MarginButton>
            <ButtonIcon
              title="Cofnij"
              uppercase
              fontIconSize="16"
              fontSize="14"
              icon={<FaArrowLeft />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleReset}
            />
          </MarginButton>
          <MarginButton>
            <ButtonIcon
              title="Zapisz"
              uppercase
              fontIconSize="16"
              fontSize="14"
              icon={<FaSave />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              onClick={handleSaveMap}
              disabled={!disabledButtonSave}
              isFetchToBlock
            />
          </MarginButton>
        </ButtonTextPositionMap>
      </Popup>
    </PositionRelative>
  )
}
export default MapsEditComponent
