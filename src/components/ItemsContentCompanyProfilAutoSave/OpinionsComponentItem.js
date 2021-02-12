import React, { useState, useEffect } from "react"
import { Colors } from "../../common/Colors"
import styled from "styled-components"
import { MdStar, MdComment, MdSave, MdArrowBack } from "react-icons/md"
import ButtonIcon from "../ButtonIcon"
import { CSSTransition } from "react-transition-group"
import InputIcon from "../InputIcon"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchAddReplayOpinion,
  resetOpinionFunction,
} from "../../state/actions"

const BackgroundEdit = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`

const BackgroundEditContentBg = styled.div`
  width: 90%;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  border-radius: 5px;
  max-height: 90%;
  overflow: hidden;
`

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
  text-align: right;
  font-size: 0.9rem;
  color: ${props =>
    props.siteProps.dark || props.siteProps.blind
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(0, 0, 0, 0.3)"};
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

const TitleAddOpnion = styled.div`
  position: relative;
  padding: 5px 10px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props => Colors(props.siteProps).primaryColorDark};
  margin-bottom: 10px;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const PaddingBackground = styled.div`
  padding: 10px;
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
    dispatch(resetOpinionFunction())
  }, [opinion, resetOpinion])

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
    userName = Buffer.from(opinion.user.name, "base64").toString("ascii")
  }
  let workerName = "Brak pracownika"
  let workerSurname = ""
  if (!!opinion.reserwationId.toWorkerUserId) {
    workerName = Buffer.from(
      opinion.reserwationId.toWorkerUserId.name,
      "base64"
    ).toString("ascii")
    workerSurname = Buffer.from(
      opinion.reserwationId.toWorkerUserId.surname,
      "base64"
    ).toString("ascii")
  }

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
        <TimeCreateStyle siteProps={siteProps}>
          {timeCreateRender}
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
        <CSSTransition
          in={addReplay}
          timeout={400}
          classNames="popup"
          unmountOnExit
        >
          <BackgroundEdit>
            <BackgroundEditContentBg siteProps={siteProps}>
              <TitleAddOpnion>
                {!!opinion.replayOpinionMessage
                  ? "Edytuj opinie"
                  : "Odpowiedz na opinie"}
              </TitleAddOpnion>
              <PaddingBackground>
                <InputIcon
                  icon={<MdComment />}
                  placeholder="Odpowiedz"
                  value={opinionText}
                  onChange={handleChangeTextOpinion}
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
                      disabled={opinionText.length < 2}
                    />
                  </ButtonMargin>
                </ButtonsAddPositionOpinion>
              </PaddingBackground>
            </BackgroundEditContentBg>
          </BackgroundEdit>
        </CSSTransition>
      </OpinionStyle>
    </div>
  )
}

export default OpinionsComponentItem