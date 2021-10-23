import React from "react"
import UserStampsCompany from "./UserStampsCompany"
import ReactTooltip from "react-tooltip"
import styled from "styled-components"

const TextNoContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Poppins-Medium", sans-serif;
`

const UserStamps = ({ userStamps = [], siteProps, handleClose }) => {
  const mapCompanyStamps = userStamps.map((company, index) => {
    return (
      <UserStampsCompany
        company={company}
        key={index}
        siteProps={siteProps}
        handleClose={handleClose}
      />
    )
  })
  return (
    <div>
      {userStamps.length > 0 ? (
        mapCompanyStamps
      ) : (
        <TextNoContent>Brak pieczątek</TextNoContent>
      )}
      <ReactTooltip id="goToWebsiteStamp" effect="float" multiline={true}>
        <span>Przejdz do strony internetowej firmy</span>
      </ReactTooltip>
    </div>
  )
}
export default UserStamps
