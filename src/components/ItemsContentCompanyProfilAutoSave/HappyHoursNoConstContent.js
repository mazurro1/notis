import React from "react"

const HappyHoursNoConstContent = ({
  companyEditProfilProps = {},
  isCompanyEditProfil = false,
  siteProps,
  TitleRightColumn,
  happyHoursNoConst = [],
  editNoConstHappyHours,
  setEditNoConstHappyHours,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
}) => {
  return (
    <>
      <TitleRightColumn isCompanyEditProfil={false} siteProps={siteProps}>
        Zmienne Happy Hours
      </TitleRightColumn>
    </>
  )
}
export default HappyHoursNoConstContent
