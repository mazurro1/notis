import React, { useEffect } from "react"
import "../../style.css"
import { fetchConfirmAddWorkerToCompany } from "../state/actions"
import { useDispatch } from "react-redux"

const ActiveWorker = ({ companyId, workerEmail, codeToActive }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      fetchConfirmAddWorkerToCompany(companyId, workerEmail, codeToActive)
    )
  }, [])

  return <div>Dodawanie pracownika</div>
}
export default ActiveWorker
