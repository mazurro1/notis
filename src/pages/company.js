import React from "react"
import { Router } from "@reach/router"
import TakeCompanyData from "../components/TakeCompanyData"
import CompanyNoPriv from "../components/CompanyNoPriv"

const Companys = props => {
  console.log(props)
  const pathHost = props.host
  return (
    <Router>
      <TakeCompanyData path="/company/:pathCompany" />
      {/* <CompanyNoPriv default /> */}
    </Router>
  )
}
export default Companys
