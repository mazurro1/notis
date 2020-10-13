import React from "react"
import { Router } from "@reach/router"
import CompanyPriv from '../components/companyPriv'
import CompanyNoPriv from '../components/companyNoPriv'
import { useSelector } from "react-redux"

const CompanyProfil = () => {
  const user = useSelector(state => state.user)

  return(
    <Router>
      {!!user ? <CompanyPriv default/> : <CompanyNoPriv default/>}
    </Router>
)}
export default CompanyProfil