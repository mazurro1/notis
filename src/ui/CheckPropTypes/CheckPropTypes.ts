const allTypes = {
  object: "object",
  string: "string",
  number: "number",
  any: "any",
}

const checkPropTypes = (propsToCheck: object, propsTypes: object) => {
  const alertTypes = "Wrong prop types"
  if (
    typeof propsToCheck === allTypes.object &&
    typeof propsTypes === allTypes.object
  ) {
    //check type value
    for (const itemPropToCheck in propsToCheck) {
      let selectedPropTypeValue: string | null = null
      for (const itemPropType in propsTypes) {
        //to do check type values in array
        const selectedValuePropType = (propsTypes as any)[itemPropType]

        if (itemPropToCheck === itemPropType) {
          selectedPropTypeValue = selectedValuePropType.type
        }
      }
      if (!!selectedPropTypeValue) {
        if (!!selectedPropTypeValue) {
          if (
            typeof itemPropToCheck === selectedPropTypeValue ||
            selectedPropTypeValue === allTypes.any
          ) {
          } else {
            console.warn(
              `${alertTypes}: ${itemPropToCheck} is not ${selectedPropTypeValue}`
            )
          }
        }
      } else {
        console.warn(`No find type of varible: ${itemPropToCheck}`)
      }
    }

    //check is value is require
    for (const itemPropType in propsTypes) {
      const selectedValuePropType = (propsTypes as any)[itemPropType]
      if (selectedValuePropType.required) {
        let isValueFind: boolean = false
        for (const itemPropToCheck in propsToCheck) {
          if (itemPropType === itemPropToCheck) {
            isValueFind = true
          }
        }
        if (!isValueFind) {
          console.warn(`Dont find varible: ${itemPropType}`)
        }
      }
    }
  } else {
    console.warn(alertTypes)
  }
  return propsToCheck
}

export default checkPropTypes
