import React, { useEffect } from "react"
import "../../style.css"
import ActiveCompany from "./ActiveCompany"
import Popup from "./Popup"
import { useDispatch, useSelector } from "react-redux"
import { fetchCompanyData } from "../state/actions"
import ContentCompanyProfil from "./ContentCompanyProfil"

const CompanyEditProfil = () => {
  const user = useSelector(state => state.user)
  const userId = useSelector(state => state.userId)
  const workCompanyData = useSelector(state => state.workCompanyData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!userId) {
      if (user.company.accountVerified && !!!user.company.adress) {
        dispatch(fetchCompanyData(user.company._id, user.token))
      }
    }
  }, [userId, dispatch])

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
  
  let isAdminCompany = false;
  let userHasAccess = false;
  let selectedWorker = null;
  if (!!workCompanyData) {
    isAdminCompany = user.userId === workCompanyData.owner._id
    const findWorker = workCompanyData.workers.find(
      worker => worker.user._id === user.userId
    )
    if (!!findWorker) {
      selectedWorker = findWorker
      if (!!findWorker.permissions) {
        const workerHasPermission = findWorker.permissions.some(
          perm => perm === 2 || perm === 3 || perm === 4
        )
        if (workerHasPermission) {
          userHasAccess = true
        }
      }
    } else {
      userHasAccess = workCompanyData.owner._id === user.userId
    }
  }


  return (
    <>
      {userHasAccess ? (
        <ContentCompanyProfil
          company={workCompanyData}
          isAdmin={isAdminCompany}
          isCompanyEditProfil
          userHasAccess={userHasAccess}
          selectedWorker={selectedWorker}
        />
      ) : (
        "Brak uprawnień"
      )}
      {PopupActiveCompany}
    </>
  )
}
export default CompanyEditProfil
