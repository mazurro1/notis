import React from "react"
import { Router } from "@reach/router"
import ActiveWorker from "../components/ActiveWorker"
import CompanyPriv from "../components/CompanyPriv"

const ComfirmAddedWorkerToCompany = props => {
  return (
    <Router>
      {!!props.params["*"] ? (
        <ActiveWorker path="/confirm-added-worker-to-company/:companyId/:workerEmail/:codeToActive" />
      ) : (
        <CompanyPriv default />
      )}
      <CompanyPriv default />
    </Router>
  )
}
export default ComfirmAddedWorkerToCompany
