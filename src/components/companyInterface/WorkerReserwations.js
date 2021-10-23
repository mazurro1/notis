import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import BigCalendarWorkerReserwations from "../calendars/BigCalendarWorkerReserwations"
import { fetchWorkerReserwationsAll } from "@state/actions"
import UseWindowSize from "@common/UseWindowSize"
import CompanyNoAccess from "./CompanyNoAccess"

const WorkerReserwations = ({
  handleClose,
  user,
  isAdmin,
  workerHasAccessClientsOpinions,
}) => {
  const [userWorkerActive, setUserWorkerActive] = useState(user.userId)
  const [dateCalendar, setDateCalendar] = useState(new Date())
  const [disabledSwitch, setDisabledSwitch] = useState(false)

  const workerHistoryReserwations = useSelector(
    state => state.workerHistoryReserwations
  )
  const workingHours = useSelector(state => state.workingHours)

  const dispatch = useDispatch()

  const size = UseWindowSize()
  let isMobile = false
  if (!!size) {
    isMobile = size.width > 768 ? false : true
  }

  useEffect(() => {
    dispatch(
      fetchWorkerReserwationsAll(
        user.token,
        user.company.owner === user.userId ? userWorkerActive : user.userId,
        dateCalendar.getFullYear(),
        dateCalendar.getMonth() + 1,
        user.company._id,
        user.company.owner === userWorkerActive
      )
    ) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dateCalendar.getFullYear(), // eslint-disable-line react-hooks/exhaustive-deps
    dateCalendar.getMonth(), // eslint-disable-line react-hooks/exhaustive-deps
    isAdmin,
    userWorkerActive,
  ]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {!!workerHistoryReserwations && !!workingHours ? (
        <BigCalendarWorkerReserwations
          item={workerHistoryReserwations}
          handleClose={handleClose}
          dateCalendar={dateCalendar}
          setDateCalendar={setDateCalendar}
          disabledSwitch={disabledSwitch}
          setDisabledSwitch={setDisabledSwitch}
          user={user}
          isAdmin={isAdmin}
          userWorkerActive={userWorkerActive}
          setUserWorkerActive={setUserWorkerActive}
          workingHours={workingHours}
          isMobile={isMobile}
          workerHasAccessClientsOpinions={workerHasAccessClientsOpinions}
        />
      ) : (
        <CompanyNoAccess />
      )}
    </>
  )
}
export default WorkerReserwations
