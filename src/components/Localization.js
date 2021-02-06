import React from "react"
import SelectCustom from "../components/SelectCustom"
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

  return (
    <SelectCustom
      options={localizationData}
      value={localization}
      handleChange={handleChange}
      isLoading={localizationDataLoading}
      placeholder="Lokalizacja..."
    />
  )
}
export default Localization
