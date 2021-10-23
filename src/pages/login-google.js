import React from "react"
import LoginGoogleComponent from "@components/LoginGoogleComponent"
import CompanyPriv from "@components/companyInterface/CompanyPriv"

const LoginGoogle = props => {
  let dataProps = []
  if (!!props.location.search) {
    dataProps = props.location.search.split("&")
  }
  return (
    <>
      {dataProps.length >= 3 ? (
        <LoginGoogleComponent
          message={dataProps[0].slice(1)}
          id={dataProps[1]}
          newAccount={dataProps[2]}
        />
      ) : (
        <CompanyPriv default active />
      )}
    </>
  )
}
export default LoginGoogle
