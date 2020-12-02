/*eslint-disable eqeqeq*/
export const checkIfBadValue = value => {
  const textHaveVal1 = value.includes("$")
  const textHaveVal2 = value.includes("#")
  const textHaveVal3 = value.includes("%")
  const textHaveVal4 = value.includes("&")
  const textHaveVal5 = value.includes("*")
  const textHaveVal6 = value.includes("(")
  const textHaveVal7 = value.includes(")")
  const textHaveVal8 = value.includes("/")
  const textHaveVal9 = value.includes("[")
  const textHaveVal10 = value.includes("]")
  const textHaveVal11 = value.includes("+")
  const textHaveVal12 = value.includes("-")
  const textHaveVal13 = value.includes("|")
  return (
    textHaveVal1 ||
    textHaveVal2 ||
    textHaveVal3 ||
    textHaveVal4 ||
    textHaveVal5 ||
    textHaveVal6 ||
    textHaveVal7 ||
    textHaveVal8 ||
    textHaveVal9 ||
    textHaveVal10 ||
    textHaveVal11 ||
    textHaveVal12 ||
    textHaveVal13
  )
}

export const validURL = url => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  )
  return !!pattern.test(url)
}

export const convertLinkToHttps = link => {
  const isHttps = link.includes("https://")
  const isHttp = link.includes("http://")
  const linkWithHttps = isHttps ? link : isHttp ? link : `https://${link}`

  return linkWithHttps
}

export const getCategories = (items, propName) => {
  let tempItems = items.map(item => {
    return item[propName]
  })
  let tempCategories = new Set(tempItems)
  let categories = Array.from(tempCategories)

  return categories
}

export const categoryItemsMenu = (categories, items) => {
  let allItems = []
  categories.forEach(itemCategory => {
    const filterItemsToCategory = items.filter(
      item => item.serviceCategory === itemCategory
    )
    const newAllItem = {
      category: itemCategory,
      oldCategory: itemCategory,
      items: filterItemsToCategory,
    }
    allItems.push(newAllItem)
  })
  return allItems
}

export const replacingEditedNamesAndAddingNewOnes = (
  allOldItems,
  editedItems,
  lastName,
  newName,
  itemField
) => {
  const prevServicesFromServer = [...allOldItems]
  let oldCategoryNameInItems = prevServicesFromServer.filter(
    item => item[itemField] === lastName
  )

  if (oldCategoryNameInItems.length > 0) {
    oldCategoryNameInItems = oldCategoryNameInItems.map(item => {
      item[itemField] = newName
      return item
    })

    //is in edit services new services
    const prevEditedItemsServices = [...editedItems]
    if (prevEditedItemsServices.length === 0) {
      return oldCategoryNameInItems
    } else {
      const convertedEditedItems = prevEditedItemsServices.map(item => {
        const isInThis = oldCategoryNameInItems.findIndex(newEditedItem => {
          if (!!item._id && !!newEditedItem._id) {
            return item._id === newEditedItem._id
          } else {
            return item[itemField] === newEditedItem[itemField]
          }
        })
        if (isInThis >= 0) {
          oldCategoryNameInItems[isInThis][itemField] = newName
          return oldCategoryNameInItems[isInThis]
        } else {
          return item
        }
      })

      const otherItemsToSaveInEdit = oldCategoryNameInItems.filter(item => {
        const isIn = prevEditedItemsServices.some(editedItem => {
          if (!!item._id && !!editedItem._id) {
            return item._id === editedItem._id
          } else {
            return item[itemField] === editedItem[itemField]
          }
        })
        return !isIn
      })

      const allNewEditedItems = [
        ...convertedEditedItems,
        ...otherItemsToSaveInEdit,
      ]
      return allNewEditedItems
    }
  }
}

export const replacingEditedNamesAndAddingNewOnes2 = (
  allOldItems,
  editedItems,
  lastName,
  newName,
  itemField
) => {
  const prevServicesFromServer = [...allOldItems]
  let oldCategoryNameInItems = prevServicesFromServer.filter(
    item => item[itemField] === lastName
  )

  if (oldCategoryNameInItems.length > 0) {
    oldCategoryNameInItems = oldCategoryNameInItems.map(item => {
      item[itemField] = newName
      return item
    })

    //is in edit services new services
    const prevEditedItemsServices = [...editedItems]
    if (prevEditedItemsServices.length === 0) {
      return oldCategoryNameInItems
    } else {
      const convertedEditedItems = prevEditedItemsServices.map(item => {
        const isInThis = oldCategoryNameInItems.findIndex(newEditedItem => {
          if (!!item._id && !!newEditedItem._id) {
            return item._id === newEditedItem._id
          } else {
            return item[itemField] === newEditedItem[itemField]
          }
        })
        if (isInThis >= 0) {
          let returnedValue = {}
          oldCategoryNameInItems.forEach(itemOld => {
            if (itemOld[itemField] === newName && itemOld._id === item._id) {
              item[itemField] = newName
              returnedValue = item
            }
          })
          return returnedValue
        } else {
          return item
        }
      })
      const otherItemsToSaveInEdit = oldCategoryNameInItems.filter(item => {
        const isIn = prevEditedItemsServices.some(editedItem => {
          if (!!item._id && !!editedItem._id) {
            return item._id === editedItem._id
          } else {
            return item[itemField] === editedItem[itemField]
          }
        })
        return !isIn
      })

      const allNewEditedItems = [
        ...convertedEditedItems,
        ...otherItemsToSaveInEdit,
      ]
      return allNewEditedItems
    }
  }
}

export const compareTwoArray = (arrayFirst, arraySecond) => {
  const result = []
  arrayFirst.forEach(itemFirst => {
    const isInArray = arraySecond.some(itemSecond => {
      const isTheSame = JSON.stringify(itemSecond) == JSON.stringify(itemFirst)
      return isTheSame
    })
    if (!isInArray) {
      result.push(itemFirst)
    }
  })
  return result
}

export const sortItemsInArray = (arrayToSort, itemName) => {
  arrayToSort.sort((a, b) => {
    const firstItemToSort = a[itemName].toLowerCase()
    const secondItemToSort = b[itemName].toLowerCase()
    if (firstItemToSort < secondItemToSort) return -1
    if (firstItemToSort > secondItemToSort) return 1
    return 0
  })
  return arrayToSort
}

export const sortItemsInArrayNumber = (arrayToSort, itemName) => {
  arrayToSort.sort((a, b) => {
    const firstItemToSort = a[itemName]
    const secondItemToSort = b[itemName]
    if (firstItemToSort < secondItemToSort) return -1
    if (firstItemToSort > secondItemToSort) return 1
    return 0
  })
  return arrayToSort
}

export const changeCategoryToInWorker = (
  arrayWorkers,
  arrayName,
  prevNameCategory,
  newNameCategory
) => {
  const newArray = []
  ;[...arrayWorkers].forEach(worker => {
    const indexCategory = worker[arrayName].findIndex(
      category => category === prevNameCategory
    )
    if (indexCategory >= 0) {
      worker[arrayName][indexCategory] = newNameCategory
    }
    newArray.push(worker)
  })
  return [...newArray]
}

export const selectOtherItemsInFirstArray = (
  firstArray,
  secondArray,
  itemToCompare
) => {
  const result = []
  firstArray.forEach(first => {
    const isInSecondArray = secondArray.some(
      second => second[itemToCompare] === first[itemToCompare]
    )
    if (!isInSecondArray) {
      result.push(first)
    }
  })
  return result
}

export const compareEditedArrayToServerArrayAndReturnNotCompareItems = (
  arrayEdited,
  idNameToFind,
  workersFromServer
) => {
  const prevWorkers = []
  workersFromServer.forEach(workerX => {
    const newWorker = {
      indexWorker: workerX.user._id,
      specializationText: workerX.specialization,
      servicesCategory: [...workerX.servicesCategory],
    }
    prevWorkers.push(newWorker)
  })

  const result = []
  arrayEdited.forEach(edited => {
    const itemFromServer = prevWorkers.find(
      server => server[idNameToFind] === edited[idNameToFind]
    )
    if (!!itemFromServer) {
      const isTheSame = JSON.stringify(edited) == JSON.stringify(itemFromServer)
      if (!isTheSame) {
        result.push(edited)
      }
    }
  })
  return result
}

export const getMonthAndReturn = intMonth => {
  let monthToReturn = ""
  switch (intMonth) {
    case 0:
      monthToReturn = "Niedz"
      break
    case 1:
      monthToReturn = "Pon"
      break

    case 2:
      monthToReturn = "Wt"
      break
    case 3:
      monthToReturn = "Śr"
      break
    case 4:
      monthToReturn = "Czw"
      break
    case 5:
      monthToReturn = "Pt"
      break
    case 6:
      monthToReturn = "Sob"
      break

    default:
      monthToReturn = ""
  }

  return monthToReturn
}

export const getMonthAndReturnFull = intMonth => {
  let monthToReturn = ""
  switch (intMonth) {
    case 0:
      monthToReturn = "Niedziela"
      break
    case 1:
      monthToReturn = "Poniedziałek"
      break

    case 2:
      monthToReturn = "Wtorek"
      break
    case 3:
      monthToReturn = "Środa"
      break
    case 4:
      monthToReturn = "Czwartek"
      break
    case 5:
      monthToReturn = "Piątek"
      break
    case 6:
      monthToReturn = "Sobota"
      break

    default:
      monthToReturn = ""
  }

  return monthToReturn
}

export const getMonthAndReturnEng = intMonth => {
  let monthToReturn = ""
  switch (intMonth) {
    case 0:
      monthToReturn = "sun"
      break
    case 1:
      monthToReturn = "mon"
      break

    case 2:
      monthToReturn = "tue"
      break
    case 3:
      monthToReturn = "wed"
      break
    case 4:
      monthToReturn = "thu"
      break
    case 5:
      monthToReturn = "fri"
      break
    case 6:
      monthToReturn = "sat"
      break

    default:
      monthToReturn = ""
  }

  return monthToReturn
}

export const getMonthNamePl = intMonth => {
  let monthToReturn = ""
  switch (intMonth) {
    case 0:
      monthToReturn = "Styczeń"
      break
    case 1:
      monthToReturn = "Luty"
      break

    case 2:
      monthToReturn = "Marzec"
      break
    case 3:
      monthToReturn = "Kwiecień"
      break
    case 4:
      monthToReturn = "Maj"
      break
    case 5:
      monthToReturn = "Czerwiec"
      break
    case 6:
      monthToReturn = "Lipiec"
      break
    case 7:
      monthToReturn = "Sierpień"
      break
    case 8:
      monthToReturn = "Wrzesień"
      break
    case 9:
      monthToReturn = "Październik"
      break
    case 10:
      monthToReturn = "Listopad"
      break
    case 11:
      monthToReturn = "Grudzień"
      break

    default:
      monthToReturn = "Miesiąc"
  }

  return monthToReturn
}

export const checkAndReturnMinAndMaxValueFromDaysHours = openingDays => {
  let maxNumber = 0
  let minNumber = 1440

  const transformedHoursData = []
  for (const key in openingDays) {
    transformedHoursData.push({
      start: openingDays[key].start,
      end: openingDays[key].end,
      disabled: openingDays[key].disabled,
    })
  }
  transformedHoursData.forEach(item => {
    if (!item.disabled) {
      const arrEnd = item.end.split(":")
      const arrStart = item.start.split(":")
      const valueEnd = Number(arrEnd[0]) * 60 + Number(arrEnd[1])
      const valueStart = Number(arrStart[0]) * 60 + Number(arrStart[1])
      if (valueEnd > maxNumber) {
        maxNumber = valueEnd
      }
      if (valueStart < minNumber) {
        minNumber = valueStart
      }
    }
  })

  const hoursEnd = Math.round(maxNumber / 60)
  const hoursStart = Math.round(minNumber / 60)
  const maxHours = `${hoursEnd}:${maxNumber % 60}`
  const minHours = `${hoursStart}:${minNumber % 60}`
  return {
    maxHours: maxHours,
    minHours: minHours,
  }
}
