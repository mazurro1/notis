import React from "react"
import InputIcon from "../components/InputIcon"
import { useDispatch, useSelector } from "react-redux"
import { changeLocalizationValue } from "../state/actions"

const Localization = () => {
  const localizationData = useSelector(state => state.localizationData)
  const localizationDataLoading = useSelector(
    state => state.localizationDataLoading
  )
  const localization = useSelector(state => state.localization)

  const dispatch = useDispatch()

  const handleChange = value => {
    dispatch(changeLocalizationValue(value))
  }

  return <InputIcon placeholder="Lokalizacja..." />
}
export default Localization
