import React from "react"
import { Colors } from "../common/Colors"
import styled from "styled-components"
import SelectDataCalendar from "./SelectDataCalendar"
import { MdClose } from "react-icons/md"
import { fetchDoReserwation } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import { FaUser } from "react-icons/fa"

const ItemSummary = styled.div`
  position: relative;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  max-width: 90vw;
  width: 600px;
  padding-top: 60px;
  overflow: hidden;
`

const TextReserwation = styled.div`
  font-size: 1.2rem;
  margin-bottom: 5px;
  span {
    color: ${Colors.buttonIconColor};
  }
`

const SummaryReserwationText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 2px solid ${Colors.buttonColor};
  font-size: 1.4rem;
  margin-bottom: 10px;
  background-color: ${Colors.buttonColor};
  padding: 5px 10px;
  color: white;
  padding-right: 30px;
`

const ClosePopup = styled.div`
  position: absolute;
  top: 7px;
  right: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  color: white;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    color: ${Colors.buttonIconColor};
  }
`

const ContentWorkers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const WorkerItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f4f5;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
  margin-top: 0;
  cursor: pointer;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  svg {
    font-size: 2rem;
    color: ${Colors.buttonIconColor};
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  &:hover {
    background-color: ${Colors.buttonIconColor};
    color: white;

    svg {
      color: white;
    }
  }
`

const WorkerSpecializationStyle = styled.div`
  font-size: 0.8rem;
`

const Reserwation = ({
  handleCloseReserwation,
  reserwationData = {
    extraCost: false,
    extraTime: false,
    serviceCategory: "Brak kategorii",
    serviceCost: "0",
    serviceName: "Brak nazwy",
    serviceText: "Brak tekstu",
    time: 0,
    companyId: "",
    workers: [],
  },
}) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleDoReserwation = () => {
    console.log(reserwationData)
    // dispatch(
    //   fetchDoReserwation(
    //     user.token,
    //     reserwationData.companyId,
    //     "5f8ddf33c6f4ff379c6aee23", //workerId
    //     "11:41", //dateStart
    //     "17-12-2020", //dateFull
    //     reserwationData.serviceCost,
    //     reserwationData.time,
    //     reserwationData.serviceName,
    //     reserwationData.extraCost,
    //     reserwationData.extraTime
    //   )
    // )

    //  dispatch(
    //    fetchDoReserwation(
    //      user.token,
    //      reserwationData.companyId,
    //      "5f8ddf33c6f4ff379c6aee23", //workerId
    //      "15:49", //dateStart
    //      "17-12-2020", //dateFull
    //      reserwationData.serviceCost,
    //      reserwationData.time,
    //      reserwationData.serviceName
    //    )
    //  )
  }

  let timeService = ""
  if (Number(reserwationData.time) <= 60) {
    timeService = `${reserwationData.time}min`
  } else {
    const numberTime = Number(reserwationData.time)
    const numberOfHours = Math.floor(numberTime / 60)
    if (Number(reserwationData.time) % 60 === 0) {
      timeService = `${numberOfHours}h`
    } else {
      const numberOfMinutes = numberTime - numberOfHours * 60
      timeService = `${numberOfHours}h ${numberOfMinutes}min`
    }
  }

  const ownerHasServiceCategory = reserwationData.ownerData.ownerCategory.some(
    item => item === reserwationData.serviceCategory
  )

  const ownerWorkerToSelect = ownerHasServiceCategory &&
    !!reserwationData.ownerData && (
      <WorkerItem>
        <div>
          <FaUser />
        </div>
        <div>
          {reserwationData.ownerData.name} {reserwationData.ownerData.surname}
        </div>
        <WorkerSpecializationStyle>
          {reserwationData.ownerData.specialization}
        </WorkerSpecializationStyle>
      </WorkerItem>
    )

  const filterWorkers = reserwationData.workers.filter(item => {
    const workerHasServiceCategory = item.servicesCategory.some(
      item => item === reserwationData.serviceCategory
    )
    return workerHasServiceCategory
  })

  const mapWorkersToSelect = filterWorkers.map((worker, index) => {
    return (
      <WorkerItem key={index}>
        <div>
          <FaUser />
        </div>
        <div>
          {worker.user.name} {worker.user.surname}
        </div>
        <WorkerSpecializationStyle>
          {worker.specialization}
        </WorkerSpecializationStyle>
      </WorkerItem>
    )
  })

  return (
    <ItemSummary>
      <SummaryReserwationText>Podsumowanie Rezerwacji</SummaryReserwationText>
      <TextReserwation>
        Nazwa usługi: <span>{reserwationData.serviceName}</span>
      </TextReserwation>
      <TextReserwation>
        Koszt:{" "}
        <span>
          {!!reserwationData.serviceCost ? reserwationData.serviceCost : ""}
          zł
          {reserwationData.extraCost ? " +" : ""}
        </span>
      </TextReserwation>
      <TextReserwation>
        Czas:{" "}
        <span>
          {!!timeService
            ? `${timeService}${reserwationData.extraTime ? " +" : ""}`
            : ""}
        </span>
      </TextReserwation>
      <TextReserwation>Wybierz pracownika:</TextReserwation>
      <ContentWorkers>
        {ownerWorkerToSelect}
        {mapWorkersToSelect}
      </ContentWorkers>

      <button>Wybierz dzień</button>
      <TextReserwation>Wybierz godzinę:</TextReserwation>
      <button onClick={handleDoReserwation}>Rezerwuj</button>
      <ClosePopup onClick={handleCloseReserwation}>
        <MdClose />
      </ClosePopup>
    </ItemSummary>
  )
}
export default Reserwation
