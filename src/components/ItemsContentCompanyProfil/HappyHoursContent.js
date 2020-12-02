import React from "react"

const HappyHoursContent = ({
  companyEditProfilProps = {},
  isCompanyEditProfil = false,
  colorBlind,
  TitleRightColumn,
}) => {
  return (
    <>
      <TitleRightColumn {...companyEditProfilProps} colorBlind={colorBlind}>
        Happy hours
      </TitleRightColumn>
    </>
  )
}
export default HappyHoursContent
