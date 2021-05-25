import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  fetchGetWorkerNoConstData,
  fetchGetOwnerNoConstData,
} from "../state/actions"
import BigCalendarWorkerHoursAutoSave from "./BigCalendarWorkerHoursAutoSave"
import UseWindowSize from "../common/UseWindowSize"
import CompanyNoAccess from "./CompanyNoAccess"

const WorkerHoursAutoSave = ({
  handleClose,
  item,
  editWorkerHours,
  user,
  // isAdmin,
}) => {
  const [userWorkerActive, setUserWorkerActive] = useState(user.userId)
  const [dateCalendar, setDateCalendar] = useState(new Date())
  const [disabledSwitch, setDisabledSwitch] = useState(false)

  const dispatch = useDispatch()

  const isAdmin = item.user._id === user.company.owner

  const size = UseWindowSize()
  let isMobile = false
  if (!!size) {
    isMobile = size.width > 768 ? false : true
  }
  useEffect(() => {
    if (isAdmin) {
      dispatch(
        fetchGetOwnerNoConstData(
          user.token,
          user.company._id,
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1,
          item.user._id
        )
      )
    } else {
      dispatch(
        fetchGetWorkerNoConstData(
          user.token,
          user.company._id,
          item._id,
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1
        )
      )
    }
  }, [
    dateCalendar.getFullYear(), // eslint-disable-line react-hooks/exhaustive-deps
    dateCalendar.getMonth(), // eslint-disable-line react-hooks/exhaustive-deps
    isAdmin,
    userWorkerActive,
    user,
  ]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {!!item ? (
        <BigCalendarWorkerHoursAutoSave
          item={item}
          handleClose={handleClose}
          dateCalendar={dateCalendar}
          setDateCalendar={setDateCalendar}
          disabledSwitch={disabledSwitch}
          setDisabledSwitch={setDisabledSwitch}
          user={user}
          isAdmin={isAdmin}
          userWorkerActive={userWorkerActive}
          setUserWorkerActive={setUserWorkerActive}
          isMobile={isMobile}
        />
      ) : (
        <CompanyNoAccess />
      )}
    </>
  )
}
export default WorkerHoursAutoSave
