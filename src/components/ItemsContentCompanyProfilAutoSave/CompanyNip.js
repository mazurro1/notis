import React, { useEffect } from "react"
import { Element, scroller } from "react-scroll"
import { useDispatch, useSelector } from "react-redux"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import styled from "styled-components"
import CompanyNipContent from "./CompanyNipContent"
import { changeRestartCompanyNip } from "../../state/actions"

const MarginTopReserwation = styled.div`
  margin-top: 30px;
`

const CompanyNip = ({
  RightColumnItem,
  companyEditProfilProps,
  siteProps,
  TitleRightColumn,
  company,
  user,
  isCompanyEditProfil = false,
  ButtonEditPosition,
  editCompanyNip,
  setEditCompanyNip,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
  dataToInvoice = null,
  premiumActive,
}) => {
  const restartCompanyNip = useSelector(state => state.restartCompanyNip)
  const dispatch = useDispatch()
  useEffect(() => {
    if (restartCompanyNip) {
      setEditCompanyNip(false)
      dispatch(changeRestartCompanyNip())
    }
  }, [company.linkPath, editMode, setEditCompanyNip, restartCompanyNip])

  const handleEdit = setChange => {
    scroller.scrollTo("companyNipScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    setChange(prevState => !prevState)
  }

  return (
    <MarginTopReserwation>
      <RightColumnItem
        isCompanyEditProfil={isCompanyEditProfil}
        siteProps={siteProps}
        active={editCompanyNip}
        disabledEditButtons={disabledEditButtons}
        premiumActive={premiumActive}
      >
        <Element name="companyNipScrollElement" className="element">
          <CompanyNipContent
            TitleRightColumn={TitleRightColumn}
            companyEditProfilProps={companyEditProfilProps}
            {...companyEditProfilProps}
            editable={editCompanyNip}
            siteProps={siteProps}
            onClickEdit={() => handleEdit(setEditCompanyNip)}
            company={company}
            editCompanyNip={editCompanyNip}
            editMode={editMode}
            user={user}
            dataToInvoice={dataToInvoice}
          />
          {isCompanyEditProfil && (
            <ButtonEditPosition>
              <div data-tip data-for="disabledButton">
                <ButtonIcon
                  title="Edytuj dane do faktury"
                  uppercase
                  fontIconSize="25"
                  fontSize="14"
                  icon={<MdEdit />}
                  secondColors
                  onClick={() => {
                    handleResetAllEditedComponents()
                    handleEdit(setEditCompanyNip)
                  }}
                  disabled={disabledEditButtons}
                />
              </div>
            </ButtonEditPosition>
          )}
        </Element>
      </RightColumnItem>
    </MarginTopReserwation>
  )
}
export default CompanyNip
