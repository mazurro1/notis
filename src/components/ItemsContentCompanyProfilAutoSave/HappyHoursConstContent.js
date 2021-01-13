import React from "react"

const HappyHoursConstContent = ({
  companyEditProfilProps = {},
  isCompanyEditProfil = false,
  siteProps,
  TitleRightColumn,
  happyHoursConst = [],
}) => {
  return (
    <>
      <TitleRightColumn {...companyEditProfilProps} siteProps={siteProps}>
        Stałe Happy Hours
      </TitleRightColumn>
    </>
  )
}
export default HappyHoursConstContent
