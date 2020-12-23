import React, { useEffect } from "react"
import "../../style.css"
import ActiveCompany from "./ActiveCompany"
import Popup from "./Popup"
import { useDispatch, useSelector } from "react-redux"
import { fetchCompanyData } from "../state/actions"
import ContentCompanyProfil from "./ContentCompanyProfil"

const CompanyEditProfil = () => {
  const user = useSelector(state => state.user)
  const pathCompanyData = useSelector(state => state.pathCompanyData)
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
  
  let isAdminCompany = false;
  let userHasAccess = false;
  let selectedWorker = null;
  if (!!pathCompanyData) {
    isAdminCompany = user.userId === pathCompanyData.owner._id
    const findWorker = pathCompanyData.workers.find(worker => worker.user._id === user.userId);
    if(!!findWorker){
      selectedWorker = findWorker;
      if (!!findWorker.permissions){
        const workerHasPermission = findWorker.permissions.some(
          perm => perm === 2 || perm === 3 || perm === 4
        )
        if (workerHasPermission) {
          userHasAccess = true
        }
      }
      
    }else{
      userHasAccess = pathCompanyData.owner._id === user.userId;
    }
  }


  return (
    <>
      {userHasAccess ? (
        <ContentCompanyProfil
          company={pathCompanyData}
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
