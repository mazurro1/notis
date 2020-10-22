import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import OpeningHoursItem from "./OpeningHoursItem"

const MarginButton = styled.div`
  margin-left: 5px;
`

const OpeningHoursContent = ({
  TitleRightColumn,
  ButtonEditPosition,
  isCompanyEditProfil,
  companyEditProfilProps,
  company,
}) => {
  const [editable, setEditable] = useState(false)
  const hoursDate = {
    mon: {
      start:
        !!company.openingDays && !!company.openingDays.mon.start
          ? company.openingDays.mon.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.mon.end
          ? company.openingDays.mon.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.mon.disabled
          ? company.openingDays.mon.disabled
          : true,
    },
    tue: {
      start:
        !!company.openingDays && !!company.openingDays.tue.start
          ? company.openingDays.tue.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.tue.end
          ? company.openingDays.tue.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.tue.disabled
          ? company.openingDays.tue.disabled
          : false,
    },
    wed: {
      start:
        !!company.openingDays && !!company.openingDays.wed.start
          ? company.openingDays.wed.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.wed.end
          ? company.openingDays.wed.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.wed.disabled
          ? company.openingDays.wed.disabled
          : false,
    },
    thu: {
      start:
        !!company.openingDays && !!company.openingDays.thu.start
          ? company.openingDays.thu.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.thu.end
          ? company.openingDays.thu.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.thu.disabled
          ? company.openingDays.thu.disabled
          : false,
    },
    fri: {
      start:
        !!company.openingDays && !!company.openingDays.fri.start
          ? company.openingDays.fri.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.fri.end
          ? company.openingDays.fri.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.fri.disabled
          ? company.openingDays.fri.disabled
          : false,
    },
    sat: {
      start:
        !!company.openingDays && !!company.openingDays.sat.start
          ? company.openingDays.sat.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.sat.end
          ? company.openingDays.sat.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.sat.disabled
          ? company.openingDays.sat.disabled
          : false,
    },
    sun: {
      start:
        !!company.openingDays && !!company.openingDays.sun.start
          ? company.openingDays.sun.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.sun.end
          ? company.openingDays.sun.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.sun.disabled
          ? company.openingDays.sun.disabled
          : false,
    },
  }

  const [arrayHoursData, setArrayHoursData] = useState([])

  useEffect(() => {
    const transformedHoursData = []
    for (const key in hoursDate) {
      transformedHoursData.push({
        dayMonth: key,
        start: hoursDate[key].start,
        end: hoursDate[key].end,
        disabled: hoursDate[key].disabled,
      })
    }
    setArrayHoursData(transformedHoursData)
  }, [])

  const handleClickEdit = () => {
    setEditable(prevState => !prevState)
  }

  const date = new Date()
  const actualDay = date.getDay()

  const mapDayHours = arrayHoursData.map((item, index) => {
    return (
      <OpeningHoursItem
        key={index}
        item={item}
        actualDay={actualDay}
        companyEditProfilProps={companyEditProfilProps}
        editable={editable}
      />
    )
  })

  return (
    <>
      <>
        <TitleRightColumn {...companyEditProfilProps}>
          GODZINY OTWARCIA
        </TitleRightColumn>
        {arrayHoursData.length > 0 && mapDayHours}
        {isCompanyEditProfil ? (
          editable ? (
            <>
              <ButtonEditPosition>
                <MarginButton>
                  <ButtonIcon
                    title="Cofnij"
                    uppercase
                    fontIconSize="25"
                    fontSize="14"
                    icon={<MdEdit />}
                    customColorButton="#c62828"
                    customColorIcon="#f44336"
                    onClick={handleClickEdit}
                  />
                </MarginButton>
                <MarginButton>
                  <ButtonIcon
                    title="Zapisz"
                    uppercase
                    fontIconSize="25"
                    fontSize="14"
                    icon={<MdEdit />}
                    customColorButton="#2e7d32"
                    customColorIcon="#43a047"
                    onClick={handleClickEdit}
                  />
                </MarginButton>
              </ButtonEditPosition>
            </>
          ) : (
            <ButtonEditPosition>
              <ButtonIcon
                title="Edytuj"
                uppercase
                fontIconSize="25"
                fontSize="14"
                icon={<MdEdit />}
                secondColors
                onClick={handleClickEdit}
              />
            </ButtonEditPosition>
          )
        ) : null}
      </>
    </>
  )
}
export default OpeningHoursContent
