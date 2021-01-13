import React from "react"

const HappyHoursNoConstContent = ({
  companyEditProfilProps = {},
  isCompanyEditProfil = false,
  siteProps,
  TitleRightColumn,
  happyHoursNoConst = [],
}) => {
  return (
    <>
      <TitleRightColumn {...companyEditProfilProps} siteProps={siteProps}>
        Zmienne Happy Hours
      </TitleRightColumn>
    </>
  )
}
export default HappyHoursNoConstContent
