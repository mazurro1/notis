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
  itemField,
  newCategory
) => {
  console.log(editedItems)
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
