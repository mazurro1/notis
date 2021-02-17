import React from "react"
import SelectCreated from "../components/SelectCreated"
import { useDispatch, useSelector } from "react-redux"
import { changeSortValue } from "../state/actions"
import { SortsNames } from "../common/SortsNames"

const Sort = () => {
  const sortDataLoading = useSelector(state => state.sortDataLoading)
  const sorts = useSelector(state => state.sorts)

  const dispatch = useDispatch()

  const handleChange = value => {
    dispatch(changeSortValue(value))
  }

  return (
    <SelectCreated
      options={SortsNames}
      value={sorts}
      handleChange={handleChange}
      isLoading={sortDataLoading}
      placeholder="Sortuj po..."
    />
  )
}
export default Sort
