import React from "react"
import ActiveWorker from "@components/companyInterface/ActiveWorker"
import CompanyPriv from "@components/companyInterface/CompanyPriv"

const ComfirmAddedWorkerToCompany = props => {
  let dataProps = []
  if (!!props.location.search) {
    dataProps = props.location.search.split("&")
  }
  return (
    <div>
      {dataProps.length >= 3 ? (
        <ActiveWorker
          companyId={dataProps[0].slice(1)}
          workerEmail={dataProps[1]}
          codeToActive={dataProps[2]}
        />
      ) : (
        <CompanyPriv default active />
      )}
    </div>
  )
}
export default ComfirmAddedWorkerToCompany
