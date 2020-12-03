import React, { useEffect } from "react"
import "../../style.css"
import { fetchPathCompany } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import ContentCompanyProfil from "./ContentCompanyProfil"

const TakeCompanyData = ({ pathCompany = null }) => {
  const user = useSelector(state => state.user)
  const pathCompanyData = useSelector(state => state.pathCompanyData)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!!user) {
      dispatch(fetchPathCompany(user.token, pathCompany))
    }
  }, [pathCompany, user])

  let renderContent = null

  if (!!pathCompanyData) {
    console.log(pathCompanyData)
    if (pathCompanyData.linkPath === pathCompany) {
      renderContent = (
        <ContentCompanyProfil
          company={pathCompanyData}
          isAdmin={false}
          isCompanyEditProfil={false}
        />
      )
    }
  }
  return <div>{renderContent}</div>
}
export default TakeCompanyData
