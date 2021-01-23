import React from "react"

const HappyHoursConstContent = ({
  companyEditProfilProps = {},
  isCompanyEditProfil = false,
  siteProps,
  TitleRightColumn,
  happyHoursConst = [],
  editConstHappyHours,
  setEditConstHappyHours,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
}) => {
  return (
    <>
      <TitleRightColumn isCompanyEditProfil={false} siteProps={siteProps}>
        Stałe Happy Hours
      </TitleRightColumn>
    </>
  )
}
export default HappyHoursConstContent
