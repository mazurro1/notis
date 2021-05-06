import React, { useState, useEffect } from "react"
import { Colors } from "../../common/Colors"
import styled from "styled-components"
import {
  MdStar,
  MdComment,
  MdSave,
  MdArrowBack,
  MdReport,
} from "react-icons/md"
import ButtonIcon from "../ButtonIcon"
import InputIcon from "../InputIcon"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchAddReplayOpinion,
  resetOpinionFunction,
} from "../../state/actions"
import Popup from "../Popup"
import ReactTooltip from "react-tooltip"

const ButtonsAddPositionOpinion = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const StarItem = styled.div`
  font-size: 1rem;
  color: ${props =>
    props.active ? "#ffc107" : Colors(props.siteProps).disabled};
`

const OpinionStyle = styled.div`
  position: relative;
  margin-bottom: 30px;
`

const BackgroundOpinion = styled.div`
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  padding: 10px 20px;
  border-radius: 5px;
  padding-bottom: ${props => (props.active ? "100px" : "10px")};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const ExtraInOpinion = styled.div`
  font-size: 0.85rem;
  color: ${props =>
    props.siteProps.dark || props.siteProps.blind
      ? "rgba(255, 255, 255, 0.4)"
      : "rgba(0, 0, 0, 0.4)"};

  span {
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const UserNameStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

const AllStarsContent = styled.div`
  margin-left: 10px;
  padding-top: 5px;
`

const UserStyle = styled.div`
  font-size: 1.2rem;
`

const TimeCreateStyle = styled.div`
  position: relative;
  text-align: right;
  font-size: 0.9rem;
  padding-right: ${props => (props.disabledReport ? "0" : "30px")};
  color: ${props =>
    props.siteProps.dark || props.siteProps.blind
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(0, 0, 0, 0.3)"};

  span {
    position: absolute;
    right: 0;
    color: ${props =>
      props.disabledReport
        ? Colors(props.siteProps).disabled
        : Colors(props.siteProps).dangerColor};
    font-size: 1.2rem;
    cursor: ${props => (props.disabledReport ? "default" : "pointer")};
    display: ${props => (props.disabledReport ? "none" : "inline-block")};
  }
`

const ReplayMessage = styled.div`
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const ReplayMessageBackground = styled.div`
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  border-radius: 5px;
  padding: 5px 10px;
  overflow-wrap: break-word;
  word-wrap: break-word;
`

const OpinionWrap = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
`

const ReplayStyle = styled.div`
  font-size: 0.9rem;
  color: ${props => Colors(props.siteProps).primaryColorDark};
`

const EditedMessage = styled.div`
  margin-bottom: 10px;

  .editedSmallText {
    font-size: 0.85rem;
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const NoEditedMessage = styled.div`
  .editedSmallText {
    font-size: 0.85rem;
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const OpinionsComponentItem = ({
  siteProps,
  opinion,
  StarsContent,
  companyName,
  index,
  isAdmin,
  isCompanyEditProfil,
  ButtonMoreOpinion,
  user,
  companyId,
  handleClickReport,
}) => {
  const [addReplay, setAddReplay] = useState(false)
  const [opinionText, setOpinionText] = useState("")
  const resetOpinion = useSelector(state => state.resetOpinion)

  useEffect(() => {
    setAddReplay(false)
    let opinionCompanyItem = ""
    if (!!opinion.replayOpinionMessage) {
      opinionCompanyItem = opinion.replayOpinionMessage
    }
    setOpinionText(opinionCompanyItem)
  }, [opinion, resetOpinion])

  useEffect(() => {
    if (!!resetOpinion) {
      dispatch(resetOpinionFunction())
    }
  }, [resetOpinion]) // eslint-disable-line react-hooks/exhaustive-deps

  const dispatch = useDispatch()

  const handleAddReplay = () => {
    setAddReplay(prevState => !prevState)
  }

  const handleChangeTextOpinion = e => {
    setOpinionText(e.target.value)
  }

  const handleResetReplay = () => {
    let opinionCompanyItem = ""
    if (!!opinion.replayOpinionMessage) {
      opinionCompanyItem = opinion.replayOpinionMessage
    }
    setOpinionText(opinionCompanyItem)
    setAddReplay(false)
  }

  const handleAddReplayFetch = () => {
    dispatch(
      fetchAddReplayOpinion(user.token, companyId, opinionText, opinion._id)
    )
  }

  const renderStars = [...Array(5)].map((_, index) => {
    const starActive = opinion.opinionStars >= index + 1
    return (
      <StarItem key={index} active={starActive} siteProps={siteProps}>
        <MdStar />
      </StarItem>
    )
  })
  const timeCreate = new Date(!!opinion.createdAt ? opinion.createdAt : "")
  const timeCreateRender = `${
    timeCreate.getDate() < 10
      ? `0${timeCreate.getDate()}`
      : timeCreate.getDate()
  }-${
    timeCreate.getMonth() + 1 < 10
      ? `0${timeCreate.getMonth() + 1}`
      : timeCreate.getMonth() + 1
  }-${timeCreate.getFullYear()}`

  let userName = "Brak użytkownika"
  if (!!opinion.user) {
    userName = Buffer.from(opinion.user.name, "base64").toString("utf-8")
  }
  let workerName = "Brak pracownika"
  let workerSurname = ""
  if (!!opinion.reserwationId.toWorkerUserId) {
    workerName = Buffer.from(
      opinion.reserwationId.toWorkerUserId.name,
      "base64"
    ).toString("utf-8")
    workerSurname = Buffer.from(
      opinion.reserwationId.toWorkerUserId.surname,
      "base64"
    ).toString("utf-8")
  }

  const disabledSaveOpinion = !!opinion.replayOpinionMessage
    ? opinionText.length < 2 || opinionText === opinion.replayOpinionMessage
    : opinionText.length < 2

  return (
    <div
      data-sal={index % 2 === 0 ? "zoom-in" : "zoom-in"}
      data-sal-duration="500"
      data-sal-easing="ease-out-bounce"
    >
      <OpinionStyle siteProps={siteProps}>
        <UserNameStyle>
          <UserStyle>{userName}</UserStyle>
          <AllStarsContent>
            <StarsContent>{renderStars}</StarsContent>
          </AllStarsContent>
        </UserNameStyle>
        <ExtraInOpinion siteProps={siteProps}>
          Usługa: <span>{opinion.reserwationId.serviceName}</span>
        </ExtraInOpinion>
        <ExtraInOpinion siteProps={siteProps}>
          Pracownik: <span>{`${workerName} ${workerSurname}`}</span>
        </ExtraInOpinion>
        <BackgroundOpinion siteProps={siteProps} active={addReplay}>
          <OpinionWrap>
            {!!opinion.editedOpinionMessage && (
              <EditedMessage siteProps={siteProps}>
                <div className="editedSmallText">Edytowana opinia:</div>
                {opinion.editedOpinionMessage}
              </EditedMessage>
            )}
            <NoEditedMessage siteProps={siteProps}>
              <div className="editedSmallText">Opinia:</div>
              {opinion.opinionMessage}
            </NoEditedMessage>
          </OpinionWrap>
          {!!opinion.replayOpinionMessage && (
            <ReplayMessage siteProps={siteProps}>
              <ReplayStyle siteProps={siteProps}>
                {companyName.toUpperCase()}
              </ReplayStyle>
              <ReplayMessageBackground siteProps={siteProps}>
                {opinion.replayOpinionMessage}
              </ReplayMessageBackground>
            </ReplayMessage>
          )}
        </BackgroundOpinion>
        {!!user && (
          <ReactTooltip
            id={`reportMessage${index}`}
            effect="float"
            multiline={true}
          >
            <span>Zgłoś opinie</span>
          </ReactTooltip>
        )}
        <TimeCreateStyle siteProps={siteProps} disabledReport={!!!user}>
          {timeCreateRender}
          <span
            data-tip
            data-for={`reportMessage${index}`}
            onClick={() => {
              if (!!user) {
                handleClickReport(opinion._id)
              }
            }}
          >
            <MdReport />
          </span>
        </TimeCreateStyle>
        {isAdmin && isCompanyEditProfil && (
          <ButtonMoreOpinion>
            <ButtonIcon
              title={
                !!!opinion.replayOpinionMessage
                  ? "Odpowiedz na opinie"
                  : "Edytuj opinie"
              }
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdComment />}
              secondColors
              onClick={handleAddReplay}
            />
          </ButtonMoreOpinion>
        )}
        <Popup
          popupEnable={addReplay}
          position="absolute"
          title={
            !!opinion.replayOpinionMessage
              ? "Edytuj opinie"
              : "Odpowiedz na opinie"
          }
          borderRadius
          closeTitle={false}
          smallTitle
          secondColors
        >
          <InputIcon
            icon={<MdComment />}
            placeholder="Odpowiedz"
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
                onClick={handleResetReplay}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
              />
            </ButtonMargin>
            <ButtonMargin>
              <ButtonIcon
                title={
                  !!opinion.replayOpinionMessage
                    ? "Aktualizuj opinie"
                    : "Dodaj opinie"
                }
                uppercase
                fontIconSize="20"
                fontSize="15"
                icon={<MdSave />}
                onClick={handleAddReplayFetch}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
                disabled={disabledSaveOpinion}
              />
            </ButtonMargin>
          </ButtonsAddPositionOpinion>
        </Popup>
      </OpinionStyle>
    </div>
  )
}

export default OpinionsComponentItem
