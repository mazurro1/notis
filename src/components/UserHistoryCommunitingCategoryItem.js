import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import {
  MdDelete,
  MdArrowBack,
  MdComment,
  MdSave,
  MdStar,
  MdEdit,
} from "react-icons/md"
import { FaArrowLeft, FaChrome } from "react-icons/fa"
import Popup from "./Popup"
import { useDispatch } from "react-redux"
import {
  fetchUserCancelCommunity,
  fetchResetUserMenu,
  fetchAddOpinionCommuniting,
  fetchUpdateEditedOpinionCommuniting,
} from "../state/actions"
import { navigate } from "gatsby"
import ReactTooltip from "react-tooltip"
import InputIcon from "./InputIcon"

const PositionButtonsCancel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props =>
    props.clickDelete
      ? "#ffebee"
      : !!props.canceled
      ? Colors(props.siteProps).dangerLightColor
      : !!props.finished
      ? Colors(props.siteProps).successColorLight
      : !!props.noStartValue
      ? Colors(props.siteProps).companyItemBackground
      : !!props.startValue
      ? Colors(props.siteProps).secondColorLight
      : Colors(props.siteProps).companyItemBackground};

  padding: 10px;
  border-radius: 5px;
  border-top-left-radius: ${props => (props.index ? "0px" : "5px")};
  border-top-right-radius: ${props => (props.index ? "0px" : "5px")};
  margin: 5px 5px;
  margin-top: ${props => (props.index ? "0px" : "5px")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  user-select: none;
  overflow: hidden;
  padding-bottom: ${props => (props.activeEdit ? "150px" : "auto")};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  transition-property: background-color, padding-bottom, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  @media all and (max-width: 990px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const ButtonInline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

const MarginButtonCompany = styled.div`
  margin-left: 5px;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const ServiceDescription = styled.div`
  font-size: 1rem;
  margin-top: 10px;
  span {
    font-family: "Poppins-Bold", sans-serif;
  }
`

const LeftContent = styled.div`
  max-width: 100%;
`

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media all and (max-width: 990px) {
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
    width: 100%;
  }
`

const IconDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  font-size: 1.5rem;
  border-radius: 5px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  cursor: pointer;
  background-color: ${props =>
    props.red
      ? Colors(props.siteProps).dangerColor
      : Colors(props.siteProps).dangerColor};
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props =>
      props.red
        ? Colors(props.siteProps).dangerColorDark
        : Colors(props.siteProps).dangerColorDark};
  }
`

const ButtonsAddPositionOpinion = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const StatusService = styled.div`
  display: inline-block;
  border-radius: 5px;
  padding: 0px 5px;
  margin-left: 5px;
  margin-top: 5px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-family: "Poppins-Regular", sans-serif;
  background-color: ${props =>
    !!props.noStartValue
      ? Colors(props.siteProps).primaryColor
      : !!props.startValue
      ? Colors(props.siteProps).secondColor
      : !!props.finished
      ? Colors(props.siteProps).successColor
      : !!props.canceled
      ? Colors(props.siteProps).dangerColor
      : Colors(props.siteProps).dangerColor};
`

const OpinionTextReserwation = styled.div`
  margin-top: 20px;
  font-family: "Poppins-Bold", sans-serif;
  padding-left: 5px;
`

const OpinionText = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  padding: 10px 20px;
  padding-bottom: 10px;
  width: 100%;
  border-radius: 5px;

  .replayCompany {
    position: relative;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 5px;
    background-color: ${props => Colors(props.siteProps).companyItemBackground};
    color: ${props => Colors(props.siteProps).textNormalBlack};
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 40px;
  }

  .replayCompanyName {
    position: absolute;
    font-size: 0.9rem;
    color: ${props => Colors(props.siteProps).primaryColorDark};
    top: -20px;
    text-transform: uppercase;
  }
`

const StarsPositions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  span {
    margin-right: 10px;
  }
`

const NoEditedMessage = styled.div`
  .editedSmallText {
    font-size: 0.85rem;
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const StarItem = styled.div`
  font-size: 1.4rem;
  margin-top: 4px;
  cursor: pointer;
  color: ${props =>
    props.active ? "#ffc107" : Colors(props.siteProps).disabled};

  transition-property: transform, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    transform: scale(1.4);
  }
`

const EditedMessage = styled.div`
  margin-bottom: 10px;

  .editedSmallText {
    font-size: 0.85rem;
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const UserHistoryCommunitingCategoryItem = ({
  item,
  siteProps,
  itemIndex,
  user,
  resetUserHistoryCommunitings,
  indexCommuniting,
}) => {
  const [cancelCommunityActive, setCancelCommunityActive] = useState(false)
  const [addOpinionCommunityActive, setAddOpinionCommunityActive] = useState(
    false
  )
  const [opinionText, setOpinionText] = useState("")
  const [opinionStars, setOpinionStars] = useState(5)
  const [editedOpinionText, setEditedOpinionText] = useState("")
  const [editedOpinion, setEditedOpinion] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setCancelCommunityActive(false)
    setAddOpinionCommunityActive(false)
    setOpinionText("")
    let numberStars = 5
    let resetEditedOpinionText = ""
    if (!!item.opinionId) {
      numberStars = item.opinionId.opinionStars
      resetEditedOpinionText = !!item.opinionId.opinionMessage
        ? item.opinionId.opinionMessage
        : ""
    }
    setEditedOpinion(false)
    setEditedOpinionText(resetEditedOpinionText)
    setOpinionStars(numberStars)
  }, [resetUserHistoryCommunitings]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleResetAddOpinion = () => {
    setAddOpinionCommunityActive(false)
    setOpinionText("")
    setEditedOpinion(false)
    let numberStars = 5
    let resetEditedOpinionText = ""
    if (!!item.opinionId) {
      numberStars = item.opinionId.opinionStars
      resetEditedOpinionText = !!item.opinionId.opinionMessage
        ? item.opinionId.opinionMessage
        : ""
    }
    setEditedOpinionText(resetEditedOpinionText)
    setOpinionStars(numberStars)
    setEditedOpinion(false)
  }

  const handleUpdateOpinion = () => {
    if (!!item.companyId) {
      const opinionData = {
        opinionStars: opinionStars,
        opinionMessage: opinionText,
        company: item.companyId._id,
        communitingId: item._id,
      }

      dispatch(
        fetchAddOpinionCommuniting(user.token, opinionData, item.companyId._id)
      )
    }
  }

  const handleUpdateEditedOpinion = () => {
    if (!!item.companyId) {
      const opinionData = {
        opinionId: item.opinionId,
        opinionEditedMessage: editedOpinionText,
        company: item.companyId._id,
        communitingId: item._id,
      }

      dispatch(
        fetchUpdateEditedOpinionCommuniting(
          user.token,
          opinionData,
          item.companyId._id
        )
      )
    }
  }

  const handleClickEditOpinion = () => {
    setEditedOpinion(prevState => !prevState)
  }

  const handleChangeTextEditedOpinion = e => {
    setEditedOpinionText(e.target.value)
  }

  const handleClickCancelActive = () => {
    setCancelCommunityActive(prevState => !prevState)
  }

  const handleClickAddOpinion = () => {
    setAddOpinionCommunityActive(prevState => !prevState)
  }

  const handleCancelCommunity = () => {
    dispatch(fetchUserCancelCommunity(user.token, item._id, item.reserwationId))
  }

  const handleChangeTextOpinion = e => {
    setOpinionText(e.target.value)
  }

  const handleClickCompany = () => {
    if (!!item.companyId) {
      navigate(`/company?${item.companyId.linkPath}`)
      dispatch(fetchResetUserMenu(true))
    }
  }

  const handleClickStar = indexStar => {
    setOpinionStars(indexStar)
  }

  const renderStars = [...Array(5)].map((_, index) => {
    const starActive = opinionStars >= index + 1
    return (
      <StarItem
        key={index}
        active={starActive}
        onClick={() => handleClickStar(index + 1)}
        siteProps={siteProps}
      >
        <MdStar />
      </StarItem>
    )
  })

  let unhashedWorkerFullName = ""

  if (!!item.workerUserId._id) {
    const unhashedWorkerName = Buffer.from(
      item.workerUserId.name,
      "base64"
    ).toString("utf-8")

    const unhashedWorkerSurname = Buffer.from(
      item.workerUserId.surname,
      "base64"
    ).toString("utf-8")
    unhashedWorkerFullName = `${unhashedWorkerName} ${unhashedWorkerSurname}`
  }
  const splitDateEndItem = item.timeEnd.split(":")
  const dateItem = new Date(
    item.year,
    item.month - 1,
    item.day,
    Number(splitDateEndItem[0]),
    Number(splitDateEndItem[1])
  )
  const isOldDateItem = dateItem <= new Date()

  let itemHasCompany = false
  if (!!item.companyId) {
    itemHasCompany = true
  }

  let isEditedOpinion = false
  let opinionMessageValid = null
  if (!!item.opinionId) {
    if (!!item.opinionId.editedOpinionMessage) {
      isEditedOpinion = true
    }
    if (!!item.opinionId.opinionMessage) {
      opinionMessageValid = item.opinionId.opinionMessage
    }
  }

  return (
    <ServiceItem
      index={itemIndex === 0}
      siteProps={siteProps}
      noStartValue={item.statusValue === 1}
      startValue={item.statusValue === 2}
      finished={item.statusValue === 3 || isOldDateItem}
      canceled={item.statusValue === 4 || item.statusValue === 5}
      activeEdit={editedOpinion || addOpinionCommunityActive}
    >
      <LeftContent>
        <ServiceDescription>
          <ButtonInline>
            <span>Firma:</span>
            <MarginButtonCompany>
              <ButtonIcon
                title={itemHasCompany ? item.companyId.name : "Firma usunięta"}
                uppercase
                fontIconSize="20"
                fontSize="14"
                icon={<FaChrome />}
                onClick={handleClickCompany}
              />
            </MarginButtonCompany>
          </ButtonInline>
        </ServiceDescription>
        <ServiceDescription>
          <span>Opis:</span> {item.description}
        </ServiceDescription>
        <ServiceDescription>
          <span>Godzina startu:</span> {item.timeStart}
        </ServiceDescription>
        <ServiceDescription>
          <span>Godzina końca:</span> {item.timeEnd}
        </ServiceDescription>
        <ServiceDescription>
          <span>Koszt serwisu:</span>{" "}
          {!!item.cost ? `${item.cost}zł` : "Brak ceny"}
        </ServiceDescription>
        <ServiceDescription>
          <span>Przypisany pracownik:</span> {unhashedWorkerFullName}
        </ServiceDescription>
        <ServiceDescription>
          <span>Status: </span>
          {item.statusValue === 4 ? (
            <StatusService canceled={true} siteProps={siteProps}>
              Dojazd odwołany
            </StatusService>
          ) : item.statusValue === 5 ? (
            <StatusService canceled={true} siteProps={siteProps}>
              Dojazd nie zrealizowany
            </StatusService>
          ) : item.statusValue === 2 && !isOldDateItem ? (
            <StatusService startValue={true} siteProps={siteProps}>
              W drodze
            </StatusService>
          ) : item.statusValue === 3 || isOldDateItem ? (
            <StatusService finished={true} siteProps={siteProps}>
              Dojazd zakończony
            </StatusService>
          ) : (
            item.statusValue === 1 && (
              <StatusService noStartValue={true} siteProps={siteProps}>
                Dojazd zaplanowany
              </StatusService>
            )
          )}
        </ServiceDescription>
        {!!item.opinionId && (
          <>
            <OpinionTextReserwation>Wystawiona opinia:</OpinionTextReserwation>
            <OpinionText siteProps={siteProps}>
              <StarsPositions>
                <span>Ocena: </span>
                {renderStars}
              </StarsPositions>
              {!!item.opinionId.editedOpinionMessage && (
                <EditedMessage siteProps={siteProps}>
                  <div className="editedSmallText">Edytowana opinia:</div>
                  {item.opinionId.editedOpinionMessage}
                </EditedMessage>
              )}
              <NoEditedMessage siteProps={siteProps}>
                <div className="editedSmallText">Opinia:</div>
                {item.opinionId.opinionMessage}
              </NoEditedMessage>

              {!!item.opinionId.replayOpinionMessage && (
                <div className="replayCompany">
                  <div className="replayCompanyName">
                    {!!itemHasCompany ? item.companyId.name : "Firma usunięta"}
                  </div>
                  {item.opinionId.replayOpinionMessage}
                </div>
              )}
            </OpinionText>
          </>
        )}
      </LeftContent>

      {itemHasCompany && (
        <>
          <RightContent>
            {item.statusValue === 1 && !isOldDateItem ? (
              <>
                <ReactTooltip
                  id={`cancelCommuniting${indexCommuniting}${itemIndex}`}
                  effect="float"
                  multiline={true}
                >
                  <span>Odwołaj dojazd.</span>
                </ReactTooltip>
                <ButtonMargin
                  data-tip
                  data-for={`cancelCommuniting${indexCommuniting}${itemIndex}`}
                >
                  <IconDiv red onClick={handleClickCancelActive}>
                    <MdDelete />
                  </IconDiv>
                </ButtonMargin>
              </>
            ) : isOldDateItem &&
              !!!item.opinionId &&
              !isEditedOpinion &&
              item.statusValue !== 5 &&
              item.statusValue !== 4 ? (
              <>
                <ReactTooltip
                  id={`addOpinionCommuniting${indexCommuniting}${itemIndex}`}
                  effect="float"
                  multiline={true}
                >
                  <span>Dodaj opinie.</span>
                </ReactTooltip>
                <ButtonMargin
                  data-tip
                  data-for={`addOpinionCommuniting${indexCommuniting}${itemIndex}`}
                >
                  <IconDiv onClick={handleClickAddOpinion}>
                    <MdComment />
                  </IconDiv>
                </ButtonMargin>
              </>
            ) : (
              isOldDateItem &&
              !!item.opinionId &&
              item.statusValue !== 5 &&
              !isEditedOpinion &&
              item.statusValue !== 4 && (
                <>
                  <ReactTooltip
                    id={`editOpinionCommuniting${indexCommuniting}${itemIndex}`}
                    effect="float"
                    multiline={true}
                  >
                    <span>Edytuj opinie.</span>
                  </ReactTooltip>
                  <ButtonMargin
                    data-tip
                    data-for={`editOpinionCommuniting${indexCommuniting}${itemIndex}`}
                  >
                    <IconDiv onClick={handleClickEditOpinion}>
                      <MdEdit />
                    </IconDiv>
                  </ButtonMargin>
                </>
              )
            )}
          </RightContent>
          <Popup
            popupEnable={
              cancelCommunityActive &&
              !isOldDateItem &&
              item.statusValue !== 5 &&
              item.statusValue !== 4
            }
            position="absolute"
            title="Odwołaj dojazd"
            borderRadius
            closeTitle={false}
            smallTitle
          >
            <PositionButtonsCancel>
              <ButtonMargin>
                <ButtonIcon
                  title="Anuluj"
                  uppercase
                  fontIconSize="20"
                  fontSize="14"
                  icon={<FaArrowLeft />}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  onClick={handleClickCancelActive}
                />
              </ButtonMargin>
              <ButtonMargin>
                <ButtonIcon
                  title="Odwołaj"
                  uppercase
                  fontIconSize="20"
                  fontSize="14"
                  icon={<MdDelete />}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                  onClick={handleCancelCommunity}
                />
              </ButtonMargin>
            </PositionButtonsCancel>
          </Popup>
          <Popup
            popupEnable={
              addOpinionCommunityActive &&
              isOldDateItem &&
              item.statusValue !== 5 &&
              item.statusValue !== 4 &&
              !isEditedOpinion
            }
            position="absolute"
            title="Dodaj opinie"
            borderRadius
            closeTitle={false}
            smallTitle
          >
            <StarsPositions>
              <span>Ocena: </span>
              {renderStars}
            </StarsPositions>
            <InputIcon
              icon={<MdComment />}
              placeholder="Opinia"
              value={opinionText}
              onChange={handleChangeTextOpinion}
              validText="Minimum 2 znaki"
            />
            <ButtonsAddPositionOpinion>
              <ButtonMargin>
                <ButtonIcon
                  title="Anuluj"
                  uppercase
                  fontIconSize="20"
                  fontSize="15"
                  icon={<MdArrowBack />}
                  onClick={handleResetAddOpinion}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                />
              </ButtonMargin>
              <ButtonMargin>
                <ButtonIcon
                  title="Dodaj opinie"
                  uppercase
                  fontIconSize="20"
                  fontSize="15"
                  icon={<MdSave />}
                  onClick={handleUpdateOpinion}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  disabled={opinionText.length < 2}
                />
              </ButtonMargin>
            </ButtonsAddPositionOpinion>
          </Popup>
          <Popup
            popupEnable={editedOpinion && itemHasCompany && !isEditedOpinion}
            position="absolute"
            title="Edytuj opinie"
            borderRadius
            closeTitle={false}
            smallTitle
          >
            <InputIcon
              icon={<MdComment />}
              placeholder="Opinia"
              value={editedOpinionText}
              onChange={handleChangeTextEditedOpinion}
              validText="Minimum 2 znaki"
            />
            <ButtonsAddPositionOpinion>
              <ButtonMargin>
                <ButtonIcon
                  title="Anuluj"
                  uppercase
                  fontIconSize="20"
                  fontSize="15"
                  icon={<MdArrowBack />}
                  onClick={handleResetAddOpinion}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                />
              </ButtonMargin>
              <ButtonMargin>
                <ButtonIcon
                  title="Dodaj opinie"
                  uppercase
                  fontIconSize="20"
                  fontSize="15"
                  icon={<MdSave />}
                  onClick={handleUpdateEditedOpinion}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  disabled={
                    editedOpinionText.length < 2 ||
                    editedOpinionText === opinionMessageValid
                  }
                />
              </ButtonMargin>
            </ButtonsAddPositionOpinion>
          </Popup>
        </>
      )}
    </ServiceItem>
  )
}
export default UserHistoryCommunitingCategoryItem
