import React from "react"
import { Router } from "@reach/router"
import CompanyPriv from "@components/companyInterface/CompanyPriv"
import CompanyNoPriv from "@components/companyInterface/CompanyNoPriv"
import CompanyEditProfil from "@components/companyInterface/CompanyEditProfil"
import { useSelector } from "react-redux"

const CompanyProfil = () => {
  const user = useSelector(state => state.user)
  return (
    <Router>
      {!!user ? (
        !!!user.company ? (
          <CompanyPriv default active />
        ) : (
          <CompanyEditProfil default />
        )
      ) : (
        <CompanyNoPriv default active />
      )}
    </Router>
  )
}
export default CompanyProfil
