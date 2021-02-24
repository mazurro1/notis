import React, { useEffect } from "react"
import "../../style.css"
import { fetchPathCompany } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import ContentCompanyProfilAutoSave from "./ContentCompanyProfilAutoSave"
import CompanyPriv from "./CompanyPriv"

const TakeCompanyData = ({ pathCompany = null }) => {
  const pathCompanyData = useSelector(state => state.pathCompanyData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPathCompany(pathCompany))
  }, [pathCompany]) // eslint-disable-line react-hooks/exhaustive-deps

  let renderContent = null

  if (!!pathCompanyData) {
    if (pathCompanyData.linkPath === pathCompany) {
      renderContent = (
        <ContentCompanyProfilAutoSave
          company={pathCompanyData}
          isAdmin={false}
          isCompanyEditProfil={false}
        />
      )
    }
  }
  return <div>{!!renderContent ? renderContent : <CompanyPriv />}</div>
}
export default TakeCompanyData
