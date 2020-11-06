import React from "react"
import { Router } from "@reach/router"
import ActiveWorker from "../components/ActiveWorker"

const ComfirmAddedWorkerToCompany = props => {
  return (
    <Router>
      <ActiveWorker path="/confirm-added-worker-to-company/:companyId/:workerEmail/:codeToActive" />
    </Router>
  )
}
export default ComfirmAddedWorkerToCompany
