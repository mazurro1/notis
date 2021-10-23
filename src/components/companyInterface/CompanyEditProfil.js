import React, { useEffect, useState } from "react"
import ActiveCompany from "./ActiveCompany"
import { Popup } from "@ui"
import { useDispatch, useSelector } from "react-redux"
import { fetchCompanyData, updateCompanyChangePhoneEmail } from "@state/actions"
import ContentCompanyProfilAutoSave from "./ContentCompanyProfilAutoSave"
import CompanyNoAccess from "./CompanyNoAccess"
import { fetchResetCompanyEditProfil } from "@state/actions"
import CompanyChangeNumberPhone from "./ItemsContentCompanyProfilAutoSave/CompanyChangeNumberPhone"

const CompanyEditProfil = () => {
  const user = useSelector(state => state.user)
  const changeCompanyPhone = useSelector(state => state.changeCompanyPhone)
  const changeCompanyEmail = useSelector(state => state.changeCompanyEmail)
  const siteProps = useSelector(state => state.siteProps)
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
  const [
    companyDisabledChangeEmailDate,
    setCompanyDisabledChangeEmailDate,
  ] = useState(null)
  const [hasPhoneToVeryfied, setHasPhoneToVeryfied] = useState(false)
  const [hasEmailToVeryfied, setHasEmailToVeryfied] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateCompanyChangePhoneEmail(false, false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!user) {
      if (!!user.company) {
        setHasPhoneToVeryfied(!!user.company.phoneToVeryfied)
        setHasEmailToVeryfied(!!user.company.emailToVeryfied)
        setEnableEmailVeryfi(!!!user.company.accountEmailVerified)
        setEnablePhoneVeryfi(!!!user.company.accountPhoneVerified)
        if (!!user.company.blockSendVerifiedPhoneSms) {
          setCompanyBlockVeryfiedPhone(user.company.blockSendVerifiedPhoneSms)
        }
        if (!!user.company.blockSendVerifiedEmail) {
          setCompanyDisabledChangeEmailDate(user.company.blockSendVerifiedEmail)
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
  let dateCompanyDisabledChangePhone = null
  let isCompanyDisabledChangePhone = false
  let dateCompanyDisabledChangeEmail = null
  let isCompanyDisabledChangeEmail = false

  if (!!user) {
    if (!!user.company) {
      if (!!companyBlockVeryfiedPhone) {
        dateCompanyDisabledChangePhone = new Date(companyBlockVeryfiedPhone)
        if (new Date(companyBlockVeryfiedPhone) >= new Date()) {
          isCompanyDisabledChangePhone = true
        }
      }
      if (!!companyDisabledChangeEmailDate) {
        dateCompanyDisabledChangeEmail = new Date(
          companyDisabledChangeEmailDate
        )
        if (new Date(companyDisabledChangeEmailDate) >= new Date()) {
          isCompanyDisabledChangeEmail = true
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
      maxWidth={500}
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
      maxWidth={500}
      title="Weryfikacja kodu SMS"
      close={false}
      closeTitle={false}
    >
      <ActiveCompany
        smsToConfirm
        isBlockUserSendVerifiedPhoneSms={isCompanyDisabledChangePhone}
        dateBlockUserSendVerifiedPhoneSms={dateCompanyDisabledChangePhone}
      />
    </Popup>
  )

  const PopupActiveEmailPhone = (
    <Popup
      popupEnable={hasEmailToVeryfied}
      maxWidth={500}
      title="Weryfikacja nowego adresu e-mail"
      close={false}
      closeTitle={false}
    >
      <ActiveCompany
        hasNewFieldToValid={hasEmailToVeryfied}
        isBlockUserSendVerifiedPhoneSms={isCompanyDisabledChangeEmail}
        dateBlockUserSendVerifiedPhoneSms={dateCompanyDisabledChangeEmail}
      />
    </Popup>
  )

  const PopupActiveNewPhone = (
    <Popup
      popupEnable={hasPhoneToVeryfied && !hasEmailToVeryfied}
      maxWidth={500}
      title="Weryfikacja nowego numeru telefonu"
      close={false}
      closeTitle={false}
    >
      <ActiveCompany
        hasNewFieldToValid={hasPhoneToVeryfied}
        smsToConfirm
        isBlockUserSendVerifiedPhoneSms={isCompanyDisabledChangePhone}
        dateBlockUserSendVerifiedPhoneSms={dateCompanyDisabledChangePhone}
      />
    </Popup>
  )

  const PopupNewPhone = (
    <Popup
      popupEnable={changeCompanyPhone}
      maxWidth={500}
      title="Nowy numer telefonu"
      close={false}
      closeTitle={false}
    >
      <CompanyChangeNumberPhone
        siteProps={siteProps}
        isCompanyDisabledChangePhone={isCompanyDisabledChangePhone}
        isCompanyDisabledChangeEmail={isCompanyDisabledChangeEmail}
        dateCompanyDisabledChangePhone={dateCompanyDisabledChangePhone}
        dateCompanyDisabledChangeEmail={dateCompanyDisabledChangeEmail}
        user={user}
      />
    </Popup>
  )

  const PopupNewEmail = (
    <Popup
      popupEnable={changeCompanyEmail}
      maxWidth={500}
      title="Nowy adres e-mail"
      close={false}
      closeTitle={false}
    >
      <CompanyChangeNumberPhone
        changeEmail
        siteProps={siteProps}
        isCompanyDisabledChangePhone={isCompanyDisabledChangePhone}
        isCompanyDisabledChangeEmail={isCompanyDisabledChangeEmail}
        dateCompanyDisabledChangePhone={dateCompanyDisabledChangePhone}
        dateCompanyDisabledChangeEmail={dateCompanyDisabledChangeEmail}
        user={user}
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
          isCompanyDisabledChangePhone={isCompanyDisabledChangePhone}
          isCompanyDisabledChangeEmail={isCompanyDisabledChangeEmail}
          dateCompanyDisabledChangePhone={dateCompanyDisabledChangePhone}
          dateCompanyDisabledChangeEmail={dateCompanyDisabledChangeEmail}
        />
      ) : (
        <CompanyNoAccess />
      )}
      {PopupNewPhone}
      {PopupNewEmail}
      {PopupActiveCompany}
      {PopupActiveSMSCompany}
      {PopupActiveEmailPhone}
      {PopupActiveNewPhone}
    </>
  )
}
export default CompanyEditProfil
