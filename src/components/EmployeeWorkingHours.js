import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchGetOwnerWorkingHours,
  fetchGetWorkerWorkingHours,
} from "../state/actions"
import BigCalendarEmployeeWorkingHours from "./BigCalendarEmployeeWorkingHours"
import UseWindowSize from "../common/UseWindowSize"

const EmployeeWorkingHours = ({ handleClose, item, editWorkerHours }) => {
  const user = useSelector(state => state.user)
  const workingHours = useSelector(state => state.workingHours)
  const [userWorkerActive, setUserWorkerActive] = useState(user.userId)
  const [dateCalendar, setDateCalendar] = useState(new Date())
  const [disabledSwitch, setDisabledSwitch] = useState(false)
  const dispatch = useDispatch()

  const size = UseWindowSize()
  let isMobile = false
  if (!!size) {
    isMobile = size.width > 768 ? false : true
  }

  const isAdmin = user.userId === user.company.owner
  useEffect(() => {
    if (isAdmin) {
      dispatch(
        fetchGetOwnerWorkingHours(
          user.token,
          user.company._id,
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1
        )
      )
    } else {
      dispatch(
        fetchGetWorkerWorkingHours(
          user.token,
          user.company._id,
          null,
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1
        )
      )
    }
  }, [
    dateCalendar.getFullYear(), // eslint-disable-line react-hooks/exhaustive-deps
    dateCalendar.getMonth(), // eslint-disable-line react-hooks/exhaustive-deps
    dispatch,
    isAdmin,
    userWorkerActive,
    user,
    editWorkerHours,
  ])
  return (
    <>
      {!!workingHours ? (
        <BigCalendarEmployeeWorkingHours
          item={workingHours}
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
export default EmployeeWorkingHours
