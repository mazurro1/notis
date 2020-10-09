import React from 'react'
import SelectCustom from "../components/SelectCustom"
import { useDispatch, useSelector } from "react-redux"
import {changeSortValue} from '../state/actions'

 const Sort = () => {
  const sortData = useSelector(state => state.sortData)
  const sortDataLoading = useSelector(state => state.sortDataLoading)
  const sorts = useSelector(state => state.sorts)

  const dispatch = useDispatch()

  const handleChange = (value) => {
    dispatch(changeSortValue(value))
  }

    return (
      <SelectCustom options={sortData} value={sorts} handleChange={handleChange} isLoading={sortDataLoading} placeholder="Sortuj po..."/>
    )
}
export default Sort