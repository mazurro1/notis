import React from "react"
import { Router } from "@reach/router"
import TakeCompanyData from "../components/TakeCompanyData"
import CompanyPriv from "../components/CompanyPriv"

const Companys = props => {
  return (
    <Router>
      <TakeCompanyData path="/company/:pathCompany" />
      <CompanyPriv default />
    </Router>
  )
}
export default Companys
