import React from "react"

const HappyHoursContent = ({
  companyEditProfilProps = {},
  isCompanyEditProfil = false,
  siteProps,
  TitleRightColumn,
}) => {
  return (
    <>
      <TitleRightColumn {...companyEditProfilProps} siteProps={siteProps}>
        Happy hours
      </TitleRightColumn>
    </>
  )
}
export default HappyHoursContent
