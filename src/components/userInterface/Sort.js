import React, { useEffect } from "react"
import { SelectCreated } from "@ui"
import { useDispatch, useSelector } from "react-redux"
import { changeSortValue } from "@state/actions"
import { SortsNames } from "@common/SortsNames"

const Sort = ({ enableMaps }) => {
  const sortDataLoading = useSelector(state => state.sortDataLoading)
  const sorts = useSelector(state => state.sorts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeSortValue(SortsNames[1]))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = value => {
    if (!!value) {
      dispatch(changeSortValue(value))
    } else {
      dispatch(changeSortValue(SortsNames[1]))
    }
  }

  return (
    <SelectCreated
      options={SortsNames}
      value={sorts}
      handleChange={handleChange}
      isLoading={sortDataLoading}
      placeholder="Sortuj"
      closeMenuOnSelect
      width="auto"
      deleteItem={false}
      isDisabled={enableMaps}
    />
  )
}
export default Sort
