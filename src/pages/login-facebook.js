import React from "react"
import LoginFacebookComponent from "@components/LoginFacebookComponent"
import CompanyPriv from "@components/companyInterface/CompanyPriv"

const LoginFacebook = props => {
  let dataProps = []
  if (!!props.location.search) {
    dataProps = props.location.search.split("&")
  }
  return (
    <>
      {dataProps.length >= 3 ? (
        <LoginFacebookComponent
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
export default LoginFacebook
