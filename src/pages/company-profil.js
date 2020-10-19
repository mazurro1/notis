import React from "react"
import { Router } from "@reach/router"
import CompanyPriv from "../components/CompanyPriv"
import CompanyNoPriv from "../components/CompanyNoPriv"
import CompanyEditProfil from "../components/CompanyEditProfil"
import { useSelector } from "react-redux"

const CompanyProfil = () => {
  const user = useSelector(state => state.user)
  return (
    <Router>
      {!!user ? (
        !!!user.company ? (
          <CompanyPriv default />
        ) : (
          <CompanyEditProfil default />
        )
      ) : (
        <CompanyNoPriv default />
      )}
    </Router>
  )
}
export default CompanyProfil
