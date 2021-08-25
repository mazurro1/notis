import React, { useEffect, useState } from "react"
import "../../style.css"
import ActiveCompany from "./ActiveCompany"
import Popup from "./Popup"
import { useDispatch, useSelector } from "react-redux"
import { fetchCompanyData } from "../state/actions"
import ContentCompanyProfilAutoSave from "./ContentCompanyProfilAutoSave"
import CompanyNoAccess from "./CompanyNoAccess"
import { fetchResetCompanyEditProfil } from "../state/actions"

const CompanyEditProfil = () => {
  const user = useSelector(state => state.user)
  const resetCompanyEditProfil = useSelector(
    state => state.resetCompanyEditProfil
  )
  const userId = useSelector(state => state.userId)
  const workCompanyData = useSelector(state => state.workCompanyData)
  const userProfilReset = useSelector(state => state.userProfilReset)
  const [enableEmailVeryfi, setEnableEmailVeryfi] = useState(false)
  const [enablePhoneVeryfi, setEnablePhoneVeryfi] = useState(false)
  const [companyBlockVeryfiedPhone, setCompanyBlockVeryfiedPhone] = useState(
    null
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!user) {
      if (!!user.company) {
        setEnableEmailVeryfi(!!!user.company.accountEmailVerified)
        setEnablePhoneVeryfi(!!!user.company.accountPhoneVerified)
        if (!!user.company.blockSendVerifiedPhoneSms) {
          setCompanyBlockVeryfiedPhone(user.company.blockSendVerifiedPhoneSms)
        }
      }
    }
    if (resetCompanyEditProfil) {
      dispatch(fetchResetCompanyEditProfil(false))
    }
  }, [userId, resetCompanyEditProfil, userProfilReset, user]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!userId) {
      if (
        !!user.company.accountPhoneVerified &&
        !!user.company.accountEmailVerified &&
        !!!user.company.adress
      ) {
        dispatch(fetchCompanyData(user.company._id, user.token))
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userId,
    dispatch,
    user.company.accountPhoneVerified,
    user.company.accountEmailVerified,
  ]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!userId && userProfilReset) {
      if (
        !!user.company.accountPhoneVerified &&
        !!user.company.accountEmailVerified &&
        !!!user.company.adress
      ) {
        dispatch(fetchCompanyData(user.company._id, user.token))
      }
    }
  }, [userProfilReset]) // eslint-disable-line react-hooks/exhaustive-deps

  let isAdminCompany = false
  let userHasAccess = false
  let selectedWorker = null
  let isBlockUserSendVerifiedPhoneSms = false
  let dateBlockUserSendVerifiedPhoneSms = null
  if (!!user) {
    if (!!user.company) {
      if (!!companyBlockVeryfiedPhone) {
        dateBlockUserSendVerifiedPhoneSms = new Date(companyBlockVeryfiedPhone)
        if (new Date(companyBlockVeryfiedPhone) >= new Date()) {
          isBlockUserSendVerifiedPhoneSms = true
        }
      }
    }
  }
  if (!!workCompanyData) {
    isAdminCompany = user.userId === workCompanyData.owner._id
    const findWorker = workCompanyData.workers.find(
      worker => worker.user._id === user.userId
    )
    if (!!findWorker) {
      selectedWorker = findWorker
      if (!!findWorker.permissions) {
        const workerHasPermission = findWorker.permissions.some(
          perm =>
            perm === 2 || perm === 3 || perm === 4 || perm === 6 || perm === 7
        )
        if (workerHasPermission) {
          userHasAccess = true
        }
      }
    } else {
      userHasAccess = workCompanyData.owner._id === user.userId
    }
  }

  const PopupActiveCompany = (
    <Popup
      popupEnable={enableEmailVeryfi}
      maxWidth="500"
      title="Weryfikacja kodu Email"
      close={false}
      closeTitle={false}
    >
      <ActiveCompany
        isBlockUserSendVerifiedPhoneSms={false}
        dateBlockUserSendVerifiedPhoneSms={null}
      />
    </Popup>
  )

  const PopupActiveSMSCompany = (
    <Popup
      popupEnable={enablePhoneVeryfi && !enableEmailVeryfi}
      maxWidth="500"
      title="Weryfikacja kodu SMS"
      close={false}
      closeTitle={false}
    >
      <ActiveCompany
        smsToConfirm
        isBlockUserSendVerifiedPhoneSms={isBlockUserSendVerifiedPhoneSms}
        dateBlockUserSendVerifiedPhoneSms={dateBlockUserSendVerifiedPhoneSms}
      />
    </Popup>
  )

  return (
    <>
      {userHasAccess ? (
        <ContentCompanyProfilAutoSave
          company={workCompanyData}
          isAdmin={isAdminCompany}
          isCompanyEditProfil
          userHasAccess={userHasAccess}
          selectedWorker={selectedWorker}
        />
      ) : (
        <CompanyNoAccess />
      )}
      {PopupActiveCompany}
      {PopupActiveSMSCompany}
    </>
  )
}
export default CompanyEditProfil
