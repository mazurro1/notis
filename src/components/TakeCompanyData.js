import React, { useEffect, useState } from "react"
import "../../style.css"
import { fetchPathCompany } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import ContentCompanyProfilAutoSave from "./ContentCompanyProfilAutoSave"
import CompanyPriv from "./CompanyPriv"
import { CSSTransition } from "react-transition-group"

const TakeCompanyData = ({ pathCompany = null }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathCompanyData = useSelector(state => state.pathCompanyData)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsOpen(false)
    setTimeout(() => {
      setIsOpen(true)
    }, 10)
  }, [])

  useEffect(() => {
    dispatch(fetchPathCompany(pathCompany))
  }, [pathCompany]) // eslint-disable-line react-hooks/exhaustive-deps

  let renderContent = null

  if (!!pathCompanyData) {
    if (pathCompanyData.linkPath === pathCompany) {
      renderContent = (
        <CSSTransition
          in={isOpen && pathCompanyData.linkPath === pathCompany}
          timeout={400}
          classNames="popup"
          unmountOnExit
        >
          <div>
            <ContentCompanyProfilAutoSave
              company={pathCompanyData}
              isAdmin={false}
              isCompanyEditProfil={false}
            />
          </div>
        </CSSTransition>
      )
    }
  }
  return <div>{!!renderContent ? renderContent : <CompanyPriv />}</div>
}
export default TakeCompanyData
