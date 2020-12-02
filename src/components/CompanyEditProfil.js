import React, { useEffect } from "react"
import "../../style.css"
import ActiveCompany from "./ActiveCompany"
import Popup from "./Popup"
import { useDispatch, useSelector } from "react-redux"
import { fetchCompanyData } from "../state/actions"
import ContentCompanyProfil from "./ContentCompanyProfil"

const CompanyEditProfil = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user.company.accountVerified && !!!user.company.adress) {
      dispatch(fetchCompanyData(user.company._id, user.token))
    }
  }, [user, dispatch])

  const PopupActiveCompany = (
    <Popup
      popupEnable={
        !!user
          ? !!user.company
            ? !user.company.accountVerified
            : false
          : false
      }
      maxWidth="500"
      noContent
    >
      <ActiveCompany />
    </Popup>
  )

  const isAdminCompany = user.userId === user.company.owner._id
  return (
    <>
      {user.company.adress && (
        <ContentCompanyProfil
          company={user.company}
          isAdmin={isAdminCompany}
          isCompanyEditProfil
        />
      )}
      {PopupActiveCompany}
    </>
  )
}
export default CompanyEditProfil
