import React from "react"
import TakeCompanyData from "@components/TakeCompanyData"
import CompanyPriv from "@components/companyInterface/CompanyPriv"

const Companys = props => {
  let dataProps = []
  if (!!props.location.search) {
    dataProps = props.location.search.split("&")
  }
  return (
    <>
      {dataProps.length === 1 ? (
        <TakeCompanyData pathCompany={dataProps[0].slice(1)} />
      ) : (
        <CompanyPriv active />
      )}
    </>
  )
}
export default Companys
