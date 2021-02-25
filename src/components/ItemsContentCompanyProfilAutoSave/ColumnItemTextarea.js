import React, { useState, useEffect } from "react"
import ButtonIcon from "../ButtonIcon"
import TextareaCustom from "../TextareaCustom"
import styled from "styled-components"
import { checkIfBadValue } from "../../common/Functions"
import { CSSTransition } from "react-transition-group"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { Colors } from "../../common/Colors"

const HeightComponentLinks = styled.div`
  padding-bottom: ${props =>
    props.isCompanyEditProfil && props.editable ? "150px" : "auto"};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const ButtonPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin-left: 5px;
`

const ButtonSubmit = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
`

const BackgroundEdit = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BackgroundEditContent = styled.div`
  width: 90%;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  border-radius: 5px;
  max-height: 90%;
  overflow-y: auto;
`

const PaddingContent = styled.div`
  padding: 10px;
`

const TitleRightColumnEdit = styled.div`
  padding: 5px 10px;
  background-color: ${props => Colors(props.siteProps).secondColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: 1rem;
`

const ColumnItemTextarea = ({
  titleColumnItem = "",
  TitleRightColumn,
  ParagraphRightColumn,
  ButtonEditPosition,
  isCompanyEditProfil = false,
  title = "",
  editable = false,
  onClickEdit = () => {},
  setTextEditedChange,
  textEdited,
  siteProps,
  handleSaveTextarea,
  editMode = false,
}) => {
  const [textTitle, handleTextAbout] = useState(textEdited ? textEdited : title)
  const [isErrorText, setIsErrorText] = useState(false)

  useEffect(() => {
    setTextEditedChange(null)
    handleTextAbout(title)
    setIsErrorText(false)
  }, [editable, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTextAboutOnChange = e => {
    handleTextAbout(e.target.value)

    const ifGoodValue = checkIfBadValue(e.target.value)

    if (ifGoodValue) {
      setIsErrorText(true)
    } else {
      setIsErrorText(false)
    }
  }

  const handleSaveButton = e => {
    e.preventDefault()
    if (!isErrorText && textTitle !== title) {
      setTextEditedChange(textTitle)
      handleSaveTextarea(textTitle)
    }
  }

  const handleResetButton = e => {
    setTextEditedChange(null)
    handleTextAbout(title)
    onClickEdit()
    setIsErrorText(false)
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const disabledSave = textTitle === title || isErrorText

  return (
    <HeightComponentLinks
      isCompanyEditProfil={isCompanyEditProfil}
      editable={editable}
    >
      <TitleRightColumn
        isCompanyEditProfil={isCompanyEditProfil}
        siteProps={siteProps}
      >
        {titleColumnItem}
      </TitleRightColumn>
      <ParagraphRightColumn>{textTitle}</ParagraphRightColumn>

      {isCompanyEditProfil && (
        <>
          <CSSTransition
            in={editable}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            <BackgroundEdit>
              <BackgroundEditContent
                onClick={handleClickContent}
                siteProps={siteProps}
              >
                <TitleRightColumnEdit>Edytuj tekst</TitleRightColumnEdit>
                <PaddingContent>
                  <form onSubmit={handleSaveButton}>
                    <TextareaCustom
                      textareaActive={editable}
                      value={textTitle}
                      onChange={handleTextAboutOnChange}
                      maxLength={1000}
                      isErrorText={isErrorText}
                    />
                    <ButtonPosition>
                      <ButtonMargin>
                        <ButtonSubmit>
                          <ButtonIcon
                            title="Cofnij"
                            uppercase
                            fontIconSize="16"
                            fontSize="14"
                            icon={<FaArrowLeft />}
                            customColorButton={
                              Colors(siteProps).dangerColorDark
                            }
                            customColorIcon={Colors(siteProps).dangerColor}
                            onClick={handleResetButton}
                          />
                        </ButtonSubmit>
                      </ButtonMargin>
                      <ButtonSubmit type="submit">
                        <ButtonMargin>
                          <ButtonIcon
                            title="Zapisz"
                            uppercase
                            fontIconSize="16"
                            fontSize="14"
                            icon={<FaSave />}
                            customColorButton={
                              Colors(siteProps).successColorDark
                            }
                            customColorIcon={Colors(siteProps).successColor}
                            disabled={disabledSave}
                          />
                        </ButtonMargin>
                      </ButtonSubmit>
                    </ButtonPosition>
                  </form>
                </PaddingContent>
              </BackgroundEditContent>
            </BackgroundEdit>
          </CSSTransition>
        </>
      )}
    </HeightComponentLinks>
  )
}
export default ColumnItemTextarea
