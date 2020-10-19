import React, { useState } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { MdEdit, MdPhone } from "react-icons/md"
import InputCustom from "./InputCustom"
import OpinionAndAdressContent from "./ItemsContentCompanyProfil/OpinionAndAdressContent"
import OurWorkersContent from "./ItemsContentCompanyProfil/OurWorkersContent"
import OurLinksContent from "./ItemsContentCompanyProfil/OurLinksContent"
import ColumnItemTextarea from "./ItemsContentCompanyProfil/ColumnItemTextarea"

const TextH1 = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  color: ${Colors.navDownBackground};
  padding: 5px 10px;
  padding-left: 25px;
  text-transform: uppercase;
  font-size: 2rem;
  letter-spacing: 0.5rem;
  text-align: center;
  color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${props =>
    props.isCompanyEditProfil ? Colors.secondColor : Colors.buttonIconColor};
`

const ContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const LeftColumn = styled.div`
  width: 100%;
  min-width: 668px;
  padding: 10px;
  padding-top: 20px;
  @media all and (min-width: 991px) {
    width: 70%;
  }
`

const RightColumn = styled.div`
  width: 100%;
  min-width: 286px;
  padding: 10px;
  @media all and (min-width: 991px) {
    width: 30%;
  }
`

const RightColumnItem = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  background-color: ${props => (props.noBg ? "" : "#f5f4f5")};
  border-radius: 5px;
  padding: ${props => (props.noBg ? "10px 0px" : "10px 15px")};
  margin-bottom: 20px;
  padding-bottom: ${props => (props.isCompanyEditProfil ? "50px" : "10px")};
  min-height: ${props => (props.isCompanyEditProfil ? "240px" : "auto")};
  overflow: hidden;
`

const TitleRightColumn = styled.h2`
  font-size: ${props => (props.adress ? "0.85rem" : "1.25rem")};
  display: inline-block;
  font-weight: ${props => (props.adress ? "700" : "500")};
  word-wrap: break-word;
  border-bottom: 2px solid
    ${props =>
      props.isCompanyEditProfil ? Colors.secondColor : Colors.buttonIconColor};
`

const ParagraphRightColumn = styled.p`
  display: block;
  font-size: 0.9rem;
`

const OpenDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const DayMonth = styled.div`
  font-size: 1.1rem;
  color: ${props =>
    props.isActualDate
      ? props.isCompanyEditProfil
        ? Colors.secondColor
        : Colors.buttonIconColor
      : ""};
`

const DayDate = styled.div`
  text-align: right;
  color: ${props =>
    props.isActualDate
      ? props.isCompanyEditProfil
        ? Colors.secondColor
        : Colors.buttonIconColor
      : ""};
`

const ButtonEditPosition = styled.div`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
`

const BackGroundImageCustomUrl = styled.div`
  height: 500px;
  width: 100%;
  background: url(${props => props.url}) 50% 0 no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1) inset;
`

const ContentCompanyProfil = ({
  company = null,
  isAdmin = false,
  isCompanyEditProfil = false,
}) => {
  const [editOpinionAndAdress, setEditOpinionAndAdress] = useState(false)
  const [editAboutUs, setEditAboutUs] = useState(false)
  const [textAboutUs, setTextAboutUs] = useState("")
  const [editRezerwationText, setEditRezerwationText] = useState(false)
  const [textRezerwationText, setTextRezerwation] = useState("")
  const [editLinks, setEditLinks] = useState(false)
  const [textLinks, setTextLinks] = useState("")

  const handleEdit = setChange => {
    setChange(prevState => !prevState)
  }

  const date = new Date()
  const actualDay = date.getDay()

  const companyEditProfilProps = {
    isCompanyEditProfil: isCompanyEditProfil && isAdmin,
    // isCompanyEditProfil: false,
  }

  const isOpeningDays = !!company.openingDays
  return (
    <div>
      <TextH1 {...companyEditProfilProps}>{company.name}</TextH1>
      <ContentDiv>
        <LeftColumn>
          <BackGroundImageCustomUrl url="https://2.bp.blogspot.com/-HDIxQDdW_nY/UznBk9GuJtI/AAAAAAAAlg4/ubYdAfZFlNs/s1600/01-jolantabork.jpg" />
        </LeftColumn>
        <RightColumn>
          <RightColumnItem noBg {...companyEditProfilProps}>
            <OpinionAndAdressContent
              {...companyEditProfilProps}
              city={company.city}
              district={company.district}
              adress={company.adress}
              TitleRightColumn={TitleRightColumn}
              opinionsCount={company.opinionsCount}
              opinionsValue={company.opinionsValue}
              phone={company.phone}
              ButtonEditPosition={ButtonEditPosition}
              editable={editOpinionAndAdress}
              onClickEdit={() => handleEdit(setEditOpinionAndAdress)}
            />
          </RightColumnItem>
          <InputCustom />
          <RightColumnItem {...companyEditProfilProps}>
            <ColumnItemTextarea
              titleColumnItem="O NAS"
              TitleRightColumn={TitleRightColumn}
              ParagraphRightColumn={ParagraphRightColumn}
              {...companyEditProfilProps}
              ButtonEditPosition={ButtonEditPosition}
              title={company.title}
              editable={editAboutUs}
              onClickEdit={() => handleEdit(setEditAboutUs)}
              setTextEditedChange={setTextAboutUs}
              textEdited={textAboutUs}
            />
          </RightColumnItem>
          <RightColumnItem {...companyEditProfilProps}>
            <TitleRightColumn {...companyEditProfilProps}>
              GODZINY OTWARCIA
            </TitleRightColumn>
            <OpenDate>
              <DayMonth
                isActualDate={actualDay === 1}
                {...companyEditProfilProps}
              >
                Poniedziałek:
              </DayMonth>
              <DayDate
                isActualDate={actualDay === 1}
                {...companyEditProfilProps}
              >
                {isOpeningDays
                  ? company.openingDays.disabled
                    ? "nieczynne"
                    : `${company.openingDays.mon.start} - ${company.openingDays.mon.end}`
                  : "00:00 - 00:00"}
              </DayDate>
            </OpenDate>
            <OpenDate>
              <DayMonth
                isActualDate={actualDay === 2}
                {...companyEditProfilProps}
              >
                Wtorek:
              </DayMonth>
              <DayDate
                isActualDate={actualDay === 2}
                {...companyEditProfilProps}
              >
                {isOpeningDays
                  ? company.openingDays.disabled
                    ? "nieczynne"
                    : `${company.openingDays.tue.start} - ${company.openingDays.tue.end}`
                  : "00:00 - 00:00"}
              </DayDate>
            </OpenDate>
            <OpenDate>
              <DayMonth
                isActualDate={actualDay === 3}
                {...companyEditProfilProps}
              >
                Środa:
              </DayMonth>
              <DayDate
                isActualDate={actualDay === 3}
                {...companyEditProfilProps}
              >
                {isOpeningDays
                  ? company.openingDays.disabled
                    ? "nieczynne"
                    : `${company.openingDays.wed.start} - ${company.openingDays.wed.end}`
                  : "00:00 - 00:00"}
              </DayDate>
            </OpenDate>
            <OpenDate>
              <DayMonth
                isActualDate={actualDay === 4}
                {...companyEditProfilProps}
              >
                Czwartek:
              </DayMonth>
              <DayDate
                isActualDate={actualDay === 4}
                {...companyEditProfilProps}
              >
                {isOpeningDays
                  ? company.openingDays.disabled
                    ? "nieczynne"
                    : `${company.openingDays.thu.start} - ${company.openingDays.thu.end}`
                  : "00:00 - 00:00"}
              </DayDate>
            </OpenDate>
            <OpenDate>
              <DayMonth
                isActualDate={actualDay === 5}
                {...companyEditProfilProps}
              >
                Piątek:
              </DayMonth>
              <DayDate
                isActualDate={actualDay === 5}
                {...companyEditProfilProps}
              >
                {isOpeningDays
                  ? company.openingDays.disabled
                    ? "nieczynne"
                    : `${company.openingDays.fri.start} - ${company.openingDays.fri.end}`
                  : "00:00 - 00:00"}
              </DayDate>
            </OpenDate>
            <OpenDate>
              <DayMonth
                isActualDate={actualDay === 6}
                {...companyEditProfilProps}
              >
                Sobota:
              </DayMonth>
              <DayDate
                isActualDate={actualDay === 6}
                {...companyEditProfilProps}
              >
                {isOpeningDays
                  ? company.openingDays.disabled
                    ? "nieczynne"
                    : `${company.openingDays.sat.start} - ${company.openingDays.sat.end}`
                  : "00:00 - 00:00"}
              </DayDate>
            </OpenDate>
            <OpenDate>
              <DayMonth
                isActualDate={actualDay === 0}
                {...companyEditProfilProps}
              >
                Niedziela:
              </DayMonth>
              <DayDate
                isActualDate={actualDay === 0}
                {...companyEditProfilProps}
              >
                {isOpeningDays
                  ? company.openingDays.disabled
                    ? "nieczynne"
                    : `${company.openingDays.sun.start} - ${company.openingDays.sun.end}`
                  : "00:00 - 00:00"}
              </DayDate>
            </OpenDate>
            {isCompanyEditProfil && (
              <ButtonEditPosition>
                <ButtonIcon
                  title="Edytuj"
                  uppercase
                  fontIconSize="25"
                  fontSize="14"
                  icon={<MdEdit />}
                  secondColors
                />
              </ButtonEditPosition>
            )}
          </RightColumnItem>
          <RightColumnItem {...companyEditProfilProps}>
            <OurWorkersContent
              TitleRightColumn={TitleRightColumn}
              companyEditProfilProps={companyEditProfilProps}
              {...companyEditProfilProps}
              ButtonEditPosition={ButtonEditPosition}
              workers={company.workers}
              owner={company.owner}
              companyId={company._id}
            />
          </RightColumnItem>

          {(company.reserationText || isCompanyEditProfil) && (
            <RightColumnItem {...companyEditProfilProps}>
              <ColumnItemTextarea
                titleColumnItem="ZASADY REZERWACJI"
                TitleRightColumn={TitleRightColumn}
                ParagraphRightColumn={ParagraphRightColumn}
                {...companyEditProfilProps}
                ButtonEditPosition={ButtonEditPosition}
                title={company.reserationText}
                editable={editRezerwationText}
                onClickEdit={() => handleEdit(setEditRezerwationText)}
                setTextEditedChange={setTextRezerwation}
                textEdited={textRezerwationText}
              />
            </RightColumnItem>
          )}
          {(!!company.linkFacebook ||
            !!company.linkiWebsite ||
            !!company.linkInstagram ||
            isCompanyEditProfil) && (
            <RightColumnItem {...companyEditProfilProps}>
              <OurLinksContent
                TitleRightColumn={TitleRightColumn}
                ParagraphRightColumn={ParagraphRightColumn}
                companyEditProfilProps={companyEditProfilProps}
                {...companyEditProfilProps}
                ButtonEditPosition={ButtonEditPosition}
                title={company.reserationText}
                editable={editLinks}
                onClickEdit={() => handleEdit(setEditLinks)}
                setTextEditedChange={setTextLinks}
                textEdited={textLinks}
              />
            </RightColumnItem>
          )}
        </RightColumn>
      </ContentDiv>
    </div>
  )
}
export default ContentCompanyProfil
