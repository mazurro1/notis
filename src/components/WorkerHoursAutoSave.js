import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchGetWorkerNoConstData,
  fetchGetOwnerNoConstData,
} from "../state/actions"
import BigCalendarWorkerHoursAutoSave from "./BigCalendarWorkerHoursAutoSave"
import UseWindowSize from "../common/UseWindowSize"

const WorkerHoursAutoSave = ({ handleClose, item, editWorkerHours }) => {
  const user = useSelector(state => state.user)
  const [userWorkerActive, setUserWorkerActive] = useState(user.userId)
  const [dateCalendar, setDateCalendar] = useState(new Date())
  const [disabledSwitch, setDisabledSwitch] = useState(false)

  const dispatch = useDispatch()

  const isAdmin = user.userId === user.company.owner

  const size = UseWindowSize()
  let isMobile = false
  if (!!size) {
    isMobile = size.width > 768 ? false : true
  }

  useEffect(() => {
    if (item.user._id === user.userId) {
      dispatch(
        fetchGetOwnerNoConstData(
          user.token,
          user.company._id,
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1
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
    editWorkerHours,
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
        "Brak uprawnien"
      )}
    </>
  )
}
export default WorkerHoursAutoSave
