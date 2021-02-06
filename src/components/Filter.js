import React from "react"
import SelectCustom from "../components/SelectCustom"
import { useDispatch, useSelector } from "react-redux"
import { changeFilterValue } from "../state/actions"

const Filter = () => {
  const filtersData = useSelector(state => state.filtersData)
  const filterDataLoading = useSelector(state => state.filterDataLoading)
  const filters = useSelector(state => state.filters)

  const dispatch = useDispatch()

  const handleChange = value => {
    dispatch(changeFilterValue(value))
  }

  return (
    <SelectCustom
      options={filtersData}
      value={filters}
      handleChange={handleChange}
      isLoading={filterDataLoading}
      placeholder="Filtruj po..."
    />
  )
}
export default Filter
