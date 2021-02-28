import React from "react"
import ActiveWorker from "../components/ActiveWorker"
import CompanyPriv from "../components/CompanyPriv"

const ComfirmAddedWorkerToCompany = props => {
  let dataProps = []
  if (!!props.location.search) {
    dataProps = props.location.search.split("&")
  }
  return (
    <>
      {dataProps.length >= 3 ? (
        <ActiveWorker
          companyId={dataProps[0].slice(1)}
          workerEmail={dataProps[1]}
          codeToActive={dataProps[2]}
        />
      ) : (
        <CompanyPriv default />
      )}
    </>
  )
}
export default ComfirmAddedWorkerToCompany
