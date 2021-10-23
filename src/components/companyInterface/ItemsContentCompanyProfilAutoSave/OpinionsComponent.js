import React, { useEffect, useState } from "react"
import { Colors } from "@common/Colors"
import styled from "styled-components"
import OpinionsComponentItem from "./OpinionsComponentItem"
import { MdStar, MdStarHalf, MdComment, MdReport } from "react-icons/md"
import sal from "sal.js"
import { ButtonIcon, Popup, SelectCreated } from "@ui"
import { useDispatch } from "react-redux"
import { fetchLoadMoreOpinions, fetchAddReport } from "@state/actions"
import { ReportsInfo } from "@common/Reports"

const TextSelect = styled.div`
  font-size: 1rem;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  margin-bottom: 10px;

  span {
    font-family: "Poppins-Bold", sans-serif;
  }
`

const StyledSelect = styled.div`
  margin-bottom: 150px;
`

const OpinionsComponentStyle = styled.div`
  position: relative;
  width: 100%;
  border-radius: 5px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  padding: 5px 10px;
  margin-bottom: 20px;
  margin-top: 20px;

  @media all and (min-width: 499px) {
    padding-right: 145px;
  }
`

const TitleRightColumnOpinion = styled.h2`
  position: relative;
  display: inline-block;
  font-family: ${props => (props.adress ? "Poppins-Bold" : "Poppins-Regular")};
  word-wrap: break-word;
  font-size: 2rem;
  border-bottom: 2px solid
    ${props =>
      props.isCompanyEditProfil
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor};
`

const OpinionsSummary = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid transparent;
  border-color: ${props =>
    props.siteProps.dark || props.siteProps.blind
      ? "rgba(255, 255, 255, 0.6)"
      : "rgba(0, 0, 0, 0.2)"};

  @media all and (max-width: 498px) {
    position: relative;
    margin-bottom: 30px;
  }
`

const StarItem = styled.div`
  font-size: 1.4rem;
  color: ${props =>
    props.active ? "#ffc107" : Colors(props.siteProps).disabled};
`

const StarsContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const CountOpinionContent = styled.div`
  text-align: center;
  font-size: 1.8rem;

  span {
    font-size: 1rem;
  }
`

const AllOpinionsSummary = styled.div`
  text-align: center;
  font-size: 0.9rem;
  font-family: "Poppins-Medium", sans-serif;
  color: ${props =>
    props.siteProps.dark || props.siteProps.blind
      ? "rgba(255, 255, 255, 0.8)"
      : "rgba(0, 0, 0, 0.6)"};
`

const ButtonMoreOpinion = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const OpinionsComponent = ({
  companyOpinions = [],
  siteProps,
  opinionsCount = 0,
  opinionsValue = 0,
  companyName = "",
  companyId = null,
  isAdmin,
  isCompanyEditProfil,
  user,
}) => {
  const [pageOpinions, setPAgeOpinions] = useState(1)
  const [reportActive, setReportActive] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)
  const [selectedOpinionId, setSelectedOpinionId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    sal({
      threshold: 0.1,
      once: true,
    })
  }, [companyOpinions])

  const handleLoadMoreOpinions = () => {
    dispatch(fetchLoadMoreOpinions(pageOpinions, companyId))
    setPAgeOpinions(prevState => prevState + 1)
  }

  const handleClickReport = messageId => {
    setReportActive(prevState => !prevState)
    if (!!messageId) {
      setSelectedOpinionId(messageId)
    }
  }

  const handleChangeSelect = value => {
    setSelectedReport(value)
  }

  const handleConfirmReport = () => {
    setReportActive(false)
    setSelectedReport(null)
    dispatch(
      fetchAddReport(
        user.token,
        companyId,
        selectedReport.value,
        selectedOpinionId
      )
    )
  }

  const mapOpinions = companyOpinions.map((item, index) => {
    return (
      <OpinionsComponentItem
        opinion={item}
        siteProps={siteProps}
        key={index}
        StarsContent={StarsContent}
        companyName={companyName}
        index={index}
        isAdmin={isAdmin}
        isCompanyEditProfil={isCompanyEditProfil}
        ButtonMoreOpinion={ButtonMoreOpinion}
        user={user}
        companyId={companyId}
        handleClickReport={handleClickReport}
      />
    )
  })

  const opinionSummary =
    opinionsValue > 0 && opinionsCount > 0
      ? Math.round((opinionsValue / opinionsCount) * 10) / 10
      : 0

  const renderStars = [...Array(5)].map((_, index) => {
    const starActive = opinionSummary >= index + 1
    const halfStar =
      opinionSummary >= index + 0.5 && opinionSummary >= index + 0.01
    return (
      <StarItem
        key={index}
        active={starActive || halfStar}
        siteProps={siteProps}
      >
        {starActive ? <MdStar /> : halfStar ? <MdStarHalf /> : <MdStar />}
      </StarItem>
    )
  })

  return (
    companyOpinions.length > 0 && (
      <>
        <OpinionsComponentStyle siteProps={siteProps}>
          <div>
            <TitleRightColumnOpinion siteProps={siteProps}>
              Opinie
            </TitleRightColumnOpinion>
          </div>
          <OpinionsSummary siteProps={siteProps}>
            <CountOpinionContent>
              {opinionSummary}
              <span>/5</span>
            </CountOpinionContent>
            <StarsContent>{renderStars}</StarsContent>
            <AllOpinionsSummary siteProps={siteProps}>
              Opinie: {opinionsCount}
            </AllOpinionsSummary>
          </OpinionsSummary>
          {mapOpinions}
          {!(opinionsCount <= companyOpinions.length) && (
            <ButtonMoreOpinion>
              <ButtonIcon
                title="Pokaż więcej opinii"
                uppercase
                fontIconSize="20"
                fontSize="16"
                icon={<MdComment />}
                onClick={handleLoadMoreOpinions}
              />
            </ButtonMoreOpinion>
          )}
        </OpinionsComponentStyle>
        <Popup
          popupEnable={reportActive && !!user}
          position="fixed"
          title="Zgłoś opinie"
          borderRadius
          closeTitle={true}
          handleClose={handleClickReport}
          maxWidth={400}
        >
          <div>
            <TextSelect siteProps={siteProps}>Wybierz powód skargi:</TextSelect>
            <StyledSelect>
              <SelectCreated
                options={ReportsInfo}
                value={selectedReport}
                handleChange={handleChangeSelect}
                placeholder="Wybierz odpowiadającą opcję..."
                defaultMenuIsOpen={true}
                isClearable={false}
                closeMenuOnSelect={false}
                width="100%"
              />
            </StyledSelect>
            <TextSelect>
              <span>Uwaga</span>: Można dokonać raport tylko{" "}
              <span>3 razy dziennie!</span>
            </TextSelect>
            <ButtonIcon
              title="Zgłoś opinie"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdReport />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleConfirmReport}
              disabled={!!!selectedReport}
            />
          </div>
        </Popup>
      </>
    )
  )
}

export default OpinionsComponent
