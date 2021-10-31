import React, { useState, useEffect } from "react"
import { ButtonIcon, Popup, SelectCreated } from "@ui"
import { Colors } from "@common/Colors"
import styled from "styled-components"
import { MdReport } from "react-icons/md"
import { ReportsInfo } from "@common/Reports"
import { useDispatch } from "react-redux"
import { fetchAddReport } from "@state/actions"

const StyledReport = styled.div`
  margin-top: 20px;
`

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

const ReportCompany = ({
  siteProps,
  user,
  company,
  disabledEditButtons = false,
  premiumActive,
}) => {
  const [reportActive, setReportActive] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    setSelectedReport(null)
    setReportActive(false)
  }, [])

  const handleClickReport = () => {
    setReportActive(prevState => !prevState)
  }

  const handleChangeSelect = value => {
    setSelectedReport(value)
  }

  const handleConfirmReport = () => {
    setReportActive(false)
    setSelectedReport(null)
    dispatch(fetchAddReport(user.token, company._id, selectedReport.value))
  }

  return (
    <StyledReport>
      {premiumActive ? (
        <div data-tip data-for="disabledButton">
          <ButtonIcon
            title="Zgłoś firmę"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdReport />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleClickReport}
            disabled={disabledEditButtons || !!!user}
          />
        </div>
      ) : !!!user ? (
        <div data-tip data-for="noUserLoginButton">
          <ButtonIcon
            title="Zgłoś firmę"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdReport />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleClickReport}
            disabled={!!!user}
          />
        </div>
      ) : (
        <ButtonIcon
          title="Zgłoś firmę"
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<MdReport />}
          customColorButton={Colors(siteProps).dangerColorDark}
          customColorIcon={Colors(siteProps).dangerColor}
          onClick={handleClickReport}
          disabled={!!!user}
        />
      )}

      <Popup
        popupEnable={reportActive && !!user}
        position="fixed"
        title="Zgłoś firmę"
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
            title="Zgłoś firmę"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdReport />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleConfirmReport}
            disabled={!!!selectedReport || !!!user}
            isFetchToBlock
          />
        </div>
      </Popup>
    </StyledReport>
  )
}
export default ReportCompany
