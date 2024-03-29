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

export const validEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
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
  categories.forEach((itemCategory, index) => {
    const filterItemsToCategory = items.filter(
      item => item.serviceCategory === itemCategory
    )
    const mapItemsCategoryToAddCategoryId = filterItemsToCategory.map(item => {
      item.categoryId = index
      return item
    })
    const newAllItem = {
      category: itemCategory,
      categoryId: index,
      items: mapItemsCategoryToAddCategoryId,
    }
    allItems.push(newAllItem)
  })
  return allItems
}

export const categoryItemsConstHours = (categories, items) => {
  let allItems = []
  categories.forEach((itemCategory, index) => {
    const filterItemsToCategory = items.filter(
      item => item.dayWeekIndex === itemCategory
    )
    const mapItemsCategoryToAddCategoryId = filterItemsToCategory.map(item => {
      item.dayWeekIndex = itemCategory
      return item
    })
    const newAllItem = {
      category: itemCategory,
      items: mapItemsCategoryToAddCategoryId,
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

export const sortItemsInArrayToString = (arrayToSort, itemName) => {
  arrayToSort.sort((a, b) => {
    const firstItemToSort = a[itemName].toString().toLowerCase()
    const secondItemToSort = b[itemName].toString().toLowerCase()
    if (firstItemToSort < secondItemToSort) return -1
    if (firstItemToSort > secondItemToSort) return 1
    return 0
  })
  return arrayToSort
}

export const sortItemsInArrayDateConvert = (arrayToSort, itemName) => {
  arrayToSort.sort((a, b) => {
    const firstItemToSort = new Date(a[itemName])
    const secondItemToSort = new Date(b[itemName])
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

export const sortItemsInArrayOnlyNumber = arrayToSort => {
  arrayToSort.sort((a, b) => {
    const firstItemToSort = a
    const secondItemToSort = b
    if (firstItemToSort < secondItemToSort) return -1
    if (firstItemToSort > secondItemToSort) return 1
    return 0
  })
  return arrayToSort
}

export const sortItemsInArrayDaysOff = arrayToSort => {
  arrayToSort.sort((a, b) => {
    const firstItemToSort = new Date(a.year, a.month - 1, a.day)
    const secondItemToSort = new Date(b.year, b.month - 1, b.day)
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
      indexWorker: workerX._id,
      specializationText: workerX.specialization,
      servicesCategory: [...workerX.servicesCategory],
      permissions: [...workerX.permissions],
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

export const getMonthNumber = monthName => {
  let monthToReturn = ""
  switch (monthName) {
    case "sun":
      monthToReturn = 0
      break
    case "mon":
      monthToReturn = 1
      break

    case "tue":
      monthToReturn = 2
      break
    case "wed":
      monthToReturn = 3
      break
    case "thu":
      monthToReturn = 4
      break
    case "fri":
      monthToReturn = 5
      break
    case "sat":
      monthToReturn = 6
      break

    default:
      monthToReturn = -1
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

export const objectsEqual = (o1, o2) =>
  Object.keys(o1).length === Object.keys(o2).length &&
  Object.keys(o1).every(p => o1[p] === o2[p])

export const arraysEqual = (a1, a2) => {
  return (
    a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]))
  )
}

export const convertLinkString = phrase => {
  const maxLength = 100
  let str = phrase.toLowerCase()

  const charMapITems = [
    {
      old: "?",
      new: "",
    },
    {
      old: "@",
      new: "",
    },
    {
      old: "#",
      new: "",
    },
    {
      old: "$",
      new: "",
    },
    {
      old: "%",
      new: "",
    },
    {
      old: "^",
      new: "",
    },
    {
      old: "&",
      new: "",
    },
    {
      old: "*",
      new: "",
    },
    {
      old: "(",
      new: "",
    },
    {
      old: ")",
      new: "",
    },
    {
      old: ";",
      new: "",
    },
    {
      old: ":",
      new: "",
    },
    {
      old: "'",
      new: "",
    },
    {
      old: ",",
      new: "",
    },
    {
      old: ".",
      new: "",
    },
    {
      old: "/",
      new: "",
    },
    {
      old: "<",
      new: "",
    },
    {
      old: ">",
      new: "",
    },
    {
      old: "/",
      new: "",
    },
    {
      old: "`",
      new: "",
    },
    {
      old: "!",
      new: "",
    },
    {
      old: "=",
      new: "",
    },
    {
      old: "`",
      new: "",
    },
    {
      old: "ó",
      new: "o",
    },
    {
      old: "ę",
      new: "e",
    },
    {
      old: "ą",
      new: "a",
    },
    {
      old: "ś",
      new: "s",
    },
    {
      old: "ł",
      new: "l",
    },
    {
      old: "ż",
      new: "z",
    },
    {
      old: "ź",
      new: "z",
    },
    {
      old: "ć",
      new: "c",
    },
    {
      old: "ń",
      new: "n",
    },
  ]

  const newArrayString = str.split("")
  const newStr = newArrayString.map(strItem => {
    const findInAll = charMapITems.find(
      itemVariable => itemVariable.old.toLowerCase() === strItem.toLowerCase()
    )
    if (!!findInAll) {
      return findInAll.new
    } else {
      return strItem
    }
  })
  const convertedArray = newStr.join("")
  str = convertedArray
  str = str.replace(/\s/g, "-")
  str = str.substring(0, str.length <= maxLength ? str.length : maxLength)
  return str
}
