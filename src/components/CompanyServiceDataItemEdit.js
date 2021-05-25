import React, { useState, useEffect } from "react"
import { AllStatusService } from "../common/AllStatusService"
import SelectCreated from "./SelectCreated"
import InputIcon from "./InputIcon"
import { FaTools } from "react-icons/fa"
import {
  MdBorderColor,
  MdAttachMoney,
  MdArrowBack,
  MdSave,
} from "react-icons/md"
import ButtonIcon from "./ButtonIcon"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { useDispatch } from "react-redux"
import { addAlertItem, fetchUpdateCompanyService } from "../state/actions"

const ButtonsPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const StyleButtonAddSubmit = styled.button`
  margin: 5px;
  border: none;
  outline: none;
  background-color: transparent;
`

const MarginTopSelect = styled.div`
  margin-top: 10px;
`

const CompanyServiceDataItemEdit = ({
  user,
  siteProps,
  item,
  handleClickEdit,
  workersWithOwner,
  workerHasAccessServices,
}) => {
  const [descriptionInput, setDescriptionInput] = useState("")
  const [costInput, setCostInput] = useState("")
  const [objectInput, setObjectInput] = useState("")
  const [statusValue, setStatusValue] = useState(null)
  const [selectedWorker, setSelectedWorker] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    setObjectInput(item.objectName)
    setCostInput(!!item.cost ? item.cost : "")
    setDescriptionInput(item.description)
    const findStatus = AllStatusService.find(
      itemStatus => itemStatus.value === item.statusValue
    )
    if (!!findStatus) {
      setStatusValue(findStatus)
    }
    let findWorker = null
    if (!!item.workerUserId._id) {
      findWorker = workersWithOwner.find(
        itemWorker => itemWorker.value === item.workerUserId._id
      )
    }

    if (!!findWorker) {
      setSelectedWorker(findWorker)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeInputs = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleChangeSelectStatus = value => {
    setStatusValue(value)
  }

  const handleChangeSelectedWorker = value => {
    setSelectedWorker(value)
  }
  let isChanges = false
  if (!!item && !!statusValue) {
    if (!!item.workerUserId && !!statusValue.value) {
      const itemCostValid = !!item.cost ? item.cost : ""
      const validWorkers = !!selectedWorker
        ? workersWithOwner.length > 0
          ? selectedWorker.value !== item.workerUserId._id
          : false
        : false

      isChanges =
        descriptionInput !== item.description ||
        objectInput !== item.objectName ||
        costInput.toString() !== itemCostValid.toString() ||
        validWorkers ||
        statusValue.value.toString() !== item.statusValue.toString()
    }
  }

  const validSave =
    descriptionInput.length >= 3 && objectInput.length >= 3 && isChanges

  const handleSubmit = e => {
    e.preventDefault()
    if (validSave) {
      dispatch(
        fetchUpdateCompanyService(
          user.token,
          user.company._id,
          item._id,
          descriptionInput,
          objectInput,
          costInput,
          workerHasAccessServices ? selectedWorker.value : user.userId,
          statusValue.value
        )
      )
    } else {
      if (descriptionInput.length < 3) {
        dispatch(addAlertItem("Uzupełnij opis przedmiotu", "red"))
      } else if (objectInput.length < 3) {
        dispatch(addAlertItem("Uzupełnij nazwe przedmiotu", "red"))
      } else {
        dispatch(addAlertItem("Brak zmian", "red"))
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputIcon
          icon={<FaTools />}
          placeholder="Przedmiot"
          value={objectInput}
          onChange={e => handleChangeInputs(e, setObjectInput)}
          required
          validText="Minimum 3 znaki"
        />
        <InputIcon
          icon={<MdBorderColor />}
          placeholder="Opis serwisu"
          value={descriptionInput}
          onChange={e => handleChangeInputs(e, setDescriptionInput)}
          required
          validText="Minimum 3 znaki"
        />
        <InputIcon
          icon={<MdAttachMoney />}
          placeholder="Koszt serwisu w zł"
          type="number"
          value={costInput}
          onChange={e => handleChangeInputs(e, setCostInput)}
          validText="Nie wymagane"
        />
        {workerHasAccessServices && (
          <MarginTopSelect>
            <SelectCreated
              options={workersWithOwner}
              value={selectedWorker}
              handleChange={handleChangeSelectedWorker}
              placeholder="Pracownik"
              defaultMenuIsOpen={false}
              isClearable={false}
              widthAuto
              deleteItem={false}
              textUp
              darkSelect
              top
            />
          </MarginTopSelect>
        )}
        <MarginTopSelect>
          <SelectCreated
            options={AllStatusService}
            value={statusValue}
            handleChange={handleChangeSelectStatus}
            placeholder="Status serwisu"
            defaultMenuIsOpen={false}
            isClearable={false}
            widthAuto
            deleteItem={false}
            darkSelect
            textUp
            top
          />
        </MarginTopSelect>

        <ButtonsPosition>
          <ButtonMargin>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="40"
              fontSize="14"
              icon={<MdArrowBack />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleClickEdit}
            />
          </ButtonMargin>
          <StyleButtonAddSubmit type="submit">
            <ButtonIcon
              title="Zapisz"
              uppercase
              fontIconSize="20"
              fontSize="14"
              icon={<MdSave />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              disabled={!validSave}
            />
          </StyleButtonAddSubmit>
        </ButtonsPosition>
      </form>
    </div>
  )
}
export default CompanyServiceDataItemEdit
