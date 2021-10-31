/*eslint-disable eqeqeq*/
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { ButtonIcon, Popup, InputIcon, SelectCreated } from "@ui"
import { FaArrowLeft, FaSave, FaPercentage, FaStamp } from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import { Checkbox } from "react-input-checkbox"
import { useDispatch, useSelector } from "react-redux"
import { companyUpdateStamp, resetUpdateStamps } from "@state/actions"

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
  stamp,
  services,
  companyStamps,
  user,
}) => {
  const [promotionPercent, setPromotionPercent] = useState("0")
  const [stampCount, setStampCount] = useState("0")
  const [reset, setReset] = useState(false)
  const [selectedServicesIds, setSelectedServicesIds] = useState([])
  const [disabledStamp, setDisabledStamp] = useState(false)
  const stampsUpdate = useSelector(state => state.stampsUpdate)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!stamp.promotionPercent) {
      setPromotionPercent(stamp.promotionPercent)
    }
    if (!!stamp.countStampsToActive) {
      setStampCount(stamp.countStampsToActive)
    }
    setDisabledStamp(!!stamp.disabled)
    setReset(false)

    const mapServicesInPromotion = stamp.servicesId.map(servicePromotion => {
      const findService = services.find(
        service => service._id === servicePromotion
      )
      return {
        value: servicePromotion,
        label: !!findService ? findService.serviceName : servicePromotion,
      }
    })
    setSelectedServicesIds(mapServicesInPromotion)
    setEditedItemEnable(false)
    dispatch(resetUpdateStamps())
  }, [reset, companyStamps, stampsUpdate]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleSaveEditedStamp = () => {
    const mapOnlyServicesIds = selectedServicesIds.map(item => item.value)
    const stampData = {
      stampId: stamp._id,
      stampCount: Number(stampCount),
      disabledStamp: disabledStamp,
      promotionPercent: Number(promotionPercent),
      selectedServicesIds: mapOnlyServicesIds,
    }
    dispatch(companyUpdateStamp(user.token, user.company._id, stampData))
  }

  const mapServices = services.map(item => {
    return {
      value: item._id,
      label: item.serviceName,
    }
  })
  const oldItemToCompare = {
    countStampsToActive: Number(stamp.countStampsToActive),
    disabled: stamp.disabled,
    promotionPercent: Number(stamp.promotionPercent),
    _id: stamp._id,
    servicesId: stamp.servicesId,
  }

  const mapOnlyServicesIds = selectedServicesIds.map(item => item.value)
  const newItemToCompare = {
    countStampsToActive: Number(stampCount),
    disabled: disabledStamp,
    promotionPercent: Number(promotionPercent),
    _id: stamp._id,
    servicesId: mapOnlyServicesIds,
  }

  const isEq =
    JSON.stringify(oldItemToCompare) == JSON.stringify(newItemToCompare)

  const disabledSave = !isEq && selectedServicesIds.length > 0

  return (
    <Popup
      popupEnable={editedItemEnable}
      position="absolute"
      title="Edytuj pieczątke"
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
            fontSize="14"
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
                fontSize="14"
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
              fontSize="14"
              icon={<FaSave />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              onClick={handleSaveEditedStamp}
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
