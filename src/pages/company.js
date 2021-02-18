import React from "react"
import { Router } from "@reach/router"
import TakeCompanyData from "../components/TakeCompanyData"

const Companys = props => {
  return (
    <Router>
      <TakeCompanyData path="/company/:pathCompany" />
      {/* <CompanyNoPriv default /> */}
    </Router>
  )
}
export default Companys
