import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getCompanyAvailability,
  resetFetchUserCompanyAvailability,
} from "../state/actions"
import ButtonIcon from "./ButtonIcon"
import { MdLibraryAdd, MdTextFields } from "react-icons/md"
import styled from "styled-components"
import CompanyAvailabilityNewItem from "./CompanyAvailabilityNewItem"
import CompanyAvailabilityItem from "./CompanyAvailabilityItem"
import InputIcon from "./InputIcon"
import { sortItemsInArray } from "../common/Functions"

const PositionRelative = styled.div`
  position: relative;
  min-height: ${props => (props.active ? "300px" : "0px")};
  transition-property: min-height;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const CompanyAvailability = ({ user, siteProps }) => {
  const [addItemVisible, setAddItemVisible] = useState(false)
  const [searchName, setSearchName] = useState("")

  const userCompanyAvailability = useSelector(
    state => state.userCompanyAvailability
  )
  const userCompanyAvailabilityPermission = useSelector(
    state => state.userCompanyAvailabilityPermission
  )

  const resetUserCompanyAvailability = useSelector(
    state => state.resetUserCompanyAvailability
  )

  useEffect(() => {
    setAddItemVisible(false)
    setSearchName("")
    if (resetUserCompanyAvailability) {
      dispatch(resetFetchUserCompanyAvailability())
    }
  }, [resetUserCompanyAvailability]) // eslint-disable-line react-hooks/exhaustive-deps

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCompanyAvailability(user.token, user.company._id))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddItemVisible = () => {
    setAddItemVisible(prevState => !prevState)
  }

  const handleChangeSearchName = e => {
    setSearchName(e.target.value)
  }

  const isAdmin = user.company.owner === user.userId

  const sortedArrayAvailability = sortItemsInArray(
    userCompanyAvailability,
    "itemName"
  )

  const filterItemsAvailability = sortedArrayAvailability.filter(item => {
    const isInThisName = item.itemName
      .toLowerCase()
      .includes(searchName.toLowerCase())
    return isInThisName
  })

  const mapCompanyItemsAvailability = filterItemsAvailability.map(
    (item, index) => {
      return (
        <CompanyAvailabilityItem
          item={item}
          key={index}
          user={user}
          siteProps={siteProps}
          resetUserCompanyAvailability={resetUserCompanyAvailability}
          userCompanyAvailabilityPermission={userCompanyAvailabilityPermission}
        />
      )
    }
  )

  return (
    <PositionRelative active={addItemVisible}>
      <InputIcon
        icon={<MdTextFields />}
        placeholder="Wyszukaj przedmiot"
        value={searchName}
        type="text"
        onChange={handleChangeSearchName}
      />
      {userCompanyAvailability.length === 0
        ? "Brak przedmiotów"
        : mapCompanyItemsAvailability}
      {isAdmin && userCompanyAvailabilityPermission && (
        <ButtonIcon
          title="Dodaj przedmiot"
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<MdLibraryAdd />}
          onClick={handleAddItemVisible}
        />
      )}
      {userCompanyAvailabilityPermission && (
        <CompanyAvailabilityNewItem
          siteProps={siteProps}
          addItemVisible={addItemVisible}
          handleAddItemVisible={handleAddItemVisible}
          user={user}
          resetUserCompanyAvailability={resetUserCompanyAvailability}
        />
      )}
    </PositionRelative>
  )
}
export default CompanyAvailability
