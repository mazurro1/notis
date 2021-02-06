import React from "react"

const StampsContent = ({
  TitleRightColumn,
  siteProps,
  isCompanyEditProfil,
}) => {
  return (
    <div>
      <TitleRightColumn
        // isCompanyEditProfil={editPromotions}
        siteProps={siteProps}
      >
        Pieczątki
      </TitleRightColumn>
    </div>
  )
}
export default StampsContent
