export const allTypes = {
  object: "object",
  string: "string",
  number: "number",
  date: "date",
  any: "any",
  array: "[object Array]",
}

export const checkPropTypes = (
  propsToCheck: object,
  propsTypes: object,
  valuesName: {
    valueIsNestedArray: string
    valueIsNestedObject: string
  } = {
    valueIsNestedArray: "isNestedArray",
    valueIsNestedObject: "isNestedObject",
  }
) => {
  const alertTypes = "Wrong prop types"
  if (
    typeof propsToCheck === allTypes.object &&
    typeof propsTypes === allTypes.object
  ) {
    //check type value
    for (const itemPropToCheck in propsToCheck) {
      const valueItemPropToCheck = (propsToCheck as any)[itemPropToCheck]
      let selectedPropTypeValue: string | null = null
      const isNestedArray: boolean =
        Object.prototype.toString.call(valueItemPropToCheck) ===
        "[object Array]"
      const isNestedObject: boolean =
        typeof valueItemPropToCheck === allTypes.object && !isNestedArray
      //check is nested array
      if (isNestedArray) {
        for (const [
          indexItemFromArray,
          itemFromArray,
        ] of valueItemPropToCheck.entries()) {
          for (const nestedItemPropToCheck in itemFromArray) {
            const nestedValueItemPropToCheck = (itemFromArray as any)[
              nestedItemPropToCheck
            ]
            let nestedSelectedPropTypeValue: string | null = null
            for (const itemPropType in propsTypes) {
              const selectedValuePropType = (propsTypes as any)[itemPropType]
              for (const nestedItemPropType in selectedValuePropType) {
                const nestedSelectedValuePropType = (
                  selectedValuePropType as any
                )[nestedItemPropType]
                if (nestedItemPropToCheck === nestedItemPropType) {
                  nestedSelectedPropTypeValue = nestedSelectedValuePropType.type
                }
              }
            }
            //check type nested value
            if (!!nestedSelectedPropTypeValue) {
              let isDateType: boolean = false
              //check is date
              if (typeof nestedValueItemPropToCheck === allTypes.string) {
                if (nestedSelectedPropTypeValue === allTypes.date) {
                  const splitValueToCheck: string[] =
                    nestedValueItemPropToCheck.split("-")
                  if (splitValueToCheck.length === 3) {
                    const newDate = new Date(nestedValueItemPropToCheck)
                    if (
                      !!newDate.getFullYear() &&
                      newDate.getMonth() >= 0 &&
                      !!newDate.getDate
                    ) {
                      isDateType = true
                    }
                  }
                }
              }
              if (
                typeof nestedValueItemPropToCheck ===
                  nestedSelectedPropTypeValue ||
                nestedSelectedPropTypeValue === allTypes.any ||
                isDateType
              ) {
              } else {
                console.warn(
                  `${alertTypes}: ${itemPropToCheck}[${indexItemFromArray}].${nestedItemPropToCheck} is not ${nestedSelectedPropTypeValue}`
                )
              }
            } else {
              console.warn(
                `No find type of varible: ${itemPropToCheck}[${indexItemFromArray}].${nestedItemPropToCheck}`
              )
            }
          }
        }
      } else if (isNestedObject) {
        //check is nested object
        for (const nestedItemPropToCheck in valueItemPropToCheck) {
          const nestedValueItemPropToCheck = (valueItemPropToCheck as any)[
            nestedItemPropToCheck
          ]
          let nestedSelectedPropTypeValue: string | null = null
          for (const itemPropType in propsTypes) {
            const selectedValuePropType = (propsTypes as any)[itemPropType]
            for (const nestedItemPropType in selectedValuePropType) {
              const nestedSelectedValuePropType = (
                selectedValuePropType as any
              )[nestedItemPropType]
              if (nestedItemPropToCheck === nestedItemPropType) {
                nestedSelectedPropTypeValue = nestedSelectedValuePropType.type
              }
            }
          }
          //check type nested value
          if (!!nestedSelectedPropTypeValue) {
            let isDateType: boolean = false
            //check is date
            if (typeof nestedValueItemPropToCheck === allTypes.string) {
              if (nestedSelectedPropTypeValue === allTypes.date) {
                const splitValueToCheck: string[] =
                  nestedValueItemPropToCheck.split("-")
                if (splitValueToCheck.length === 3) {
                  const newDate = new Date(nestedValueItemPropToCheck)
                  if (
                    !!newDate.getFullYear() &&
                    newDate.getMonth() >= 0 &&
                    !!newDate.getDate
                  ) {
                    isDateType = true
                  }
                }
              }
            }
            if (
              typeof nestedValueItemPropToCheck ===
                nestedSelectedPropTypeValue ||
              nestedSelectedPropTypeValue === allTypes.any ||
              isDateType
            ) {
            } else {
              console.warn(
                `${alertTypes}: ${itemPropToCheck}.${nestedItemPropToCheck} is not ${nestedSelectedPropTypeValue}`
              )
            }
          } else {
            console.warn(
              `No find type of varible: ${itemPropToCheck}.${nestedItemPropToCheck}`
            )
          }
        }
      } else {
        for (const itemPropType in propsTypes) {
          const selectedValuePropType = (propsTypes as any)[itemPropType]

          if (itemPropToCheck === itemPropType) {
            selectedPropTypeValue = selectedValuePropType.type
          }
        }
        if (!!selectedPropTypeValue) {
          let isDateType: boolean = false
          //check is date
          if (typeof valueItemPropToCheck === allTypes.string) {
            if (selectedPropTypeValue === allTypes.date) {
              const splitValueToCheck: string[] =
                valueItemPropToCheck.split("-")
              if (splitValueToCheck.length === 3) {
                const newDate = new Date(valueItemPropToCheck)
                if (
                  !!newDate.getFullYear() &&
                  newDate.getMonth() >= 0 &&
                  !!newDate.getDate
                ) {
                  isDateType = true
                }
              }
            }
          }
          if (
            typeof valueItemPropToCheck === selectedPropTypeValue ||
            selectedPropTypeValue === allTypes.any ||
            isDateType
          ) {
          } else {
            console.warn(
              `${alertTypes}: ${itemPropToCheck} is not ${selectedPropTypeValue}`
            )
          }
        } else {
          console.warn(`No find type of varible: ${itemPropToCheck}`)
        }
      }
    }

    //check is value is require
    for (const itemPropType in propsTypes) {
      const selectedValuePropType = (propsTypes as any)[itemPropType]
      if (!!selectedValuePropType[valuesName.valueIsNestedArray]) {
        for (const nestedItemPropType in selectedValuePropType) {
          const nestedSelectedValuePropType = (selectedValuePropType as any)[
            nestedItemPropType
          ]
          if (nestedSelectedValuePropType.required) {
            if (nestedItemPropType !== valuesName.valueIsNestedArray) {
              for (const itemPropToCheck in propsToCheck) {
                const valueItemPropToCheck = (propsToCheck as any)[
                  itemPropToCheck
                ]
                if (itemPropToCheck === itemPropType) {
                  for (const [
                    indexItemFromArray,
                    itemFromArray,
                  ] of valueItemPropToCheck.entries()) {
                    let isValueFind: boolean = false
                    for (const nestedItemFromArray in itemFromArray) {
                      if (nestedItemFromArray === nestedItemPropType) {
                        isValueFind = true
                      }
                    }
                    if (isValueFind) {
                    } else {
                      console.warn(
                        `Dont find varible: ${itemPropType}[${indexItemFromArray}].${nestedItemPropType}`
                      )
                    }
                  }
                }
              }
            }
          }
        }
      } else if (!!selectedValuePropType[valuesName.valueIsNestedObject]) {
        for (const nestedItemPropType in selectedValuePropType) {
          if (nestedItemPropType !== valuesName.valueIsNestedObject) {
            const nestedSelectedValuePropType = (selectedValuePropType as any)[
              nestedItemPropType
            ]
            if (nestedSelectedValuePropType.required) {
              let isValueFind: boolean = false
              for (const itemPropToCheck in propsToCheck) {
                const valueItemPropToCheck = (propsToCheck as any)[
                  itemPropToCheck
                ]
                for (const nestedItemPropToCheck in valueItemPropToCheck) {
                  if (nestedItemPropType === nestedItemPropToCheck) {
                    isValueFind = true
                  }
                }
              }
              if (!isValueFind) {
                console.warn(
                  `Dont find varible: ${itemPropType}.${nestedItemPropType}`
                )
              }
            }
          }
        }
      } else {
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
    }
  } else {
    console.warn(alertTypes)
  }
  return propsToCheck
}
