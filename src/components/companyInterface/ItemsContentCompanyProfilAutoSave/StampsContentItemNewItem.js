import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { ButtonIcon, Popup, InputIcon, SelectCreated } from "@ui"
import { FaArrowLeft, FaSave, FaPercentage, FaStamp } from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import { Checkbox } from "react-input-checkbox"
import { useDispatch } from "react-redux"
import { companyAddStamp } from "@state/actions"

const ButtonTextPositionHappy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`

const MarginButton = styled.div`
  margin-left: 5px;
`

const SelectStyles = styled.div`
  margin-bottom: 10px;
`

const CheckboxStyle = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).secondColor};
  }

  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const TextCheckbox = styled.span`
  color: ${props => Colors(props.siteProps).secondColor};
  padding-left: 10px;
  user-select: none;
`

const StampsContentItemEdit = ({
  editedItemEnable,
  setEditedItemEnable,
  siteProps,
  services,
  user,
  companyStamps,
}) => {
  const [promotionPercent, setPromotionPercent] = useState("")
  const [stampCount, setStampCount] = useState("")
  const [reset, setReset] = useState(false)
  const [selectedServicesIds, setSelectedServicesIds] = useState([])
  const [disabledStamp, setDisabledStamp] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setPromotionPercent("")
    setStampCount("")
    setDisabledStamp(false)
    setReset(false)

    setSelectedServicesIds([])
  }, [reset, companyStamps])

  const handleChangePercent = e => {
    if (Number(e.target.value) >= 0) {
      if (e.target.value.length <= 2) {
        setPromotionPercent(e.target.value)
      }
    }
  }

  const handleChangeStampCount = e => {
    if (Number(e.target.value) >= 0) {
      if (e.target.value.length <= 2) {
        setStampCount(e.target.value)
      }
    }
  }

  const handleResetEdit = () => {
    setEditedItemEnable(false)
    setReset(true)
  }

  const handleChangeServicesIds = value => {
    const allValues = value ? value : []
    setSelectedServicesIds(allValues)
  }

  const handleChangeDisabledStamp = () => {
    setDisabledStamp(prevState => !prevState)
  }

  const handleSaveStamp = () => {
    const mapOnlyServicesIds = selectedServicesIds.map(item => item.value)

    const dataStamp = {
      promotionPercent: Number(promotionPercent),
      stampCount: Number(stampCount),
      selectedServicesIds: mapOnlyServicesIds,
      disabledStamp: disabledStamp,
    }

    dispatch(companyAddStamp(user.token, user.company._id, dataStamp))
  }

  const mapServices = services.map(item => {
    return {
      value: item._id,
      label: item.serviceName,
    }
  })

  const disabledSave =
    Number(promotionPercent) > 0 &&
    Number(stampCount) > 0 &&
    selectedServicesIds.length > 0

  return (
    <Popup
      popupEnable={editedItemEnable}
      position="absolute"
      title="NNowa pieczątka"
      borderRadius
      closeTitle={false}
      smallTitle
      secondColors
    >
      <SelectStyles>
        <SelectCreated
          options={mapServices}
          value={selectedServicesIds}
          handleChange={handleChangeServicesIds}
          placeholder="Zaznaczone usługi"
          defaultMenuIsOpen={false}
          widthAuto
          isClearable={false}
          darkSelect
          isMulti
          closeMenuOnSelect={false}
          onlyText
        />
      </SelectStyles>
      <InputIcon
        icon={<FaPercentage />}
        placeholder="Wysokość promocji"
        value={promotionPercent}
        type="number"
        onChange={handleChangePercent}
        required
        secondColor
        validText="Wymagana wartość"
      />
      <InputIcon
        icon={<FaStamp />}
        placeholder="Ilość pieczątek"
        value={stampCount}
        type="number"
        onChange={handleChangeStampCount}
        required
        secondColor
        validText="Wymagana wartość"
      />
      <CheckboxStyle siteProps={siteProps}>
        <Checkbox
          theme="material-checkbox"
          value={disabledStamp}
          onChange={handleChangeDisabledStamp}
        >
          <TextCheckbox siteProps={siteProps}>Wyłącz pieczątki</TextCheckbox>
        </Checkbox>
      </CheckboxStyle>
      <ButtonTextPositionHappy>
        <MarginButton>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="16"
            fontSize="13"
            icon={<FaArrowLeft />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleResetEdit}
          />
        </MarginButton>
        <MarginButton>
          <ReactTooltip id="disabledButtonSave" effect="float" multiline={true}>
            <span>Uzupełnij wszystkie pola.</span>
          </ReactTooltip>
          {!disabledSave ? (
            <div data-tip data-for="disabledButtonSave">
              <ButtonIcon
                title="Zapisz"
                uppercase
                fontIconSize="16"
                fontSize="13"
                icon={<FaSave />}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
                disabled={!disabledSave}
                isFetchToBlock
              />
            </div>
          ) : (
            <ButtonIcon
              title="Zapisz"
              uppercase
              fontIconSize="16"
              fontSize="13"
              icon={<FaSave />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              onClick={handleSaveStamp}
              disabled={!disabledSave}
              isFetchToBlock
            />
          )}
        </MarginButton>
      </ButtonTextPositionHappy>
    </Popup>
  )
}
export default StampsContentItemEdit
