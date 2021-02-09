import React from "react"
import UserStampsCompany from "./UserStampsCompany"
import ReactTooltip from "react-tooltip"

const UserStamps = ({ userStamps = [], siteProps }) => {
  const mapCompanyStamps = userStamps.map((company, index) => {
    return (
      <UserStampsCompany company={company} key={index} siteProps={siteProps} />
    )
  })
  return (
    <div>
      {mapCompanyStamps}
      <ReactTooltip id="goToWebsiteStamp" effect="float" multiline={true}>
        <span>Przejdz do strony internetowej firmy</span>
      </ReactTooltip>
    </div>
  )
}
export default UserStamps
