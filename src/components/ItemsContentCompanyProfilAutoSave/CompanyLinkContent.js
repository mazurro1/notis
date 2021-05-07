import React, { useState, useEffect } from "react"
import ButtonIcon from "../ButtonIcon"
import { FaChrome } from "react-icons/fa"
import styled from "styled-components"
import InputIcon from "../InputIcon"
import { Colors } from "../../common/Colors"
import { convertLinkString } from "../../common/Functions"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { addAlertItem, fetchAddCompanyLink } from "../../state/actions"
import { useDispatch } from "react-redux"
import Popup from "../Popup"
import { Site } from "../../common/Site"

const ButtonPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin-left: 5px;
`

const LinkPresentation = styled.div`
  font-family: "Poppins-Medium";
  color: ${props => Colors(props.siteProps).textNormalBlack};
  margin-bottom: 20px;
  span {
    font-family: "Poppins-Medium";
    color: ${props => Colors(props.siteProps).secondDarkColor};
    font-size: 0.9rem;
  }
`

const ComapnyLinkText = styled.div`
  font-family: "Poppins-Medium";
  color: ${props => Colors(props.siteProps).primaryColorDark};
  font-size: 0.9rem;
`

const ButtonSubmit = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
`

const HeightComponentLinks = styled.div`
  padding-bottom: ${props =>
    props.isCompanyEditProfil && props.editable ? "200px" : "auto"};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const CompanyLinkContent = ({
  TitleRightColumn,
  isCompanyEditProfil = false,
  editable = false,
  onClickEdit = () => {},
  linkPath,
  siteProps,
  company,
  editMode,
  editCompanyLink,
  user,
}) => {
  const [linkPathInput, setLinkPathInput] = useState(linkPath)

  const dispatch = useDispatch()

  useEffect(() => {
    setLinkPathInput(linkPath)
  }, [company.linkPath]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLinkPathInput(linkPath)
  }, [editCompanyLink, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const disabledButtonSave =
    linkPathInput !== linkPath && linkPathInput.length > 5

  const handleSaveButton = e => {
    e.preventDefault()
    if (!disabledButtonSave) {
      dispatch(addAlertItem("Niepoprawny link", "red"))
    } else {
      dispatch(
        fetchAddCompanyLink(
          user.token,
          user.company._id,
          encodeURI(convertLinkString(linkPathInput))
        )
      )
    }
  }

  const handleResetButton = () => {
    onClickEdit()
    setLinkPathInput(linkPath)
  }

  const handleChangeInputs = (e, setChange) => {
    setChange(e.target.value)
  }

  return (
    <HeightComponentLinks isCompanyEditProfil={editable} editable={editable}>
      <TitleRightColumn isCompanyEditProfil={editable} siteProps={siteProps}>
        LINK FIRMOWY
      </TitleRightColumn>
      <ComapnyLinkText siteProps={siteProps}>
        {`${Site.siteUrl}/company/?${encodeURI(
          convertLinkString(linkPathInput)
        )}`}
      </ComapnyLinkText>
      {isCompanyEditProfil && (
        <>
          <Popup
            popupEnable={editable}
            position="absolute"
            title="Edycja linku firmowego"
            borderRadius
            closeTitle={false}
            smallTitle
            secondColors
          >
            <form onSubmit={handleSaveButton}>
              <InputIcon
                icon={<FaChrome />}
                placeholder="Link firmowy"
                type="text"
                secondColor={isCompanyEditProfil}
                onChange={e => handleChangeInputs(e, setLinkPathInput)}
                value={linkPathInput}
                validText="Minimum 6 znaków"
              />
              <LinkPresentation siteProps={siteProps}>
                <div>Podgląd linku:</div>
                <span>{encodeURI(convertLinkString(linkPathInput))}</span>
              </LinkPresentation>
              <ButtonPosition>
                <>
                  <ButtonMargin>
                    <ButtonIcon
                      title="Cofnij"
                      uppercase
                      fontIconSize="16"
                      fontSize="13"
                      icon={<FaArrowLeft />}
                      customColorButton={Colors(siteProps).dangerColorDark}
                      customColorIcon={Colors(siteProps).dangerColor}
                      onClick={handleResetButton}
                    />
                  </ButtonMargin>
                </>
                <ButtonSubmit type="submit">
                  <ButtonMargin>
                    <ButtonIcon
                      title="Zapisz"
                      uppercase
                      fontIconSize="16"
                      fontSize="13"
                      icon={<FaSave />}
                      customColorButton={Colors(siteProps).successColorDark}
                      customColorIcon={Colors(siteProps).successColor}
                      disabled={!disabledButtonSave}
                    />
                  </ButtonMargin>
                </ButtonSubmit>
              </ButtonPosition>
            </form>
          </Popup>
        </>
      )}
    </HeightComponentLinks>
  )
}
export default CompanyLinkContent
