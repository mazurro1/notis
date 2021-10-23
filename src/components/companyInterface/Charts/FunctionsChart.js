export const chartErnings = (companyStats, companyName, isAdmin) => {
  const allStats = []
  const filterCompanyStatsNoActiveAndDate = companyStats.filter(item => {
    const actualDate = new Date()
    const splitDateEnd = item.dateEnd.split(":")
    const dateItem = new Date(
      item.dateYear,
      item.dateMonth - 1,
      item.dateDay,
      Number(splitDateEnd[0]),
      Number(splitDateEnd[1])
    )
    if (item.visitCanceled || item.visitNotFinished || actualDate < dateItem) {
      return false
    } else {
      return true
    }
  })

  filterCompanyStatsNoActiveAndDate.forEach(state => {
    if (isAdmin) {
      const findIndexAllCompany = allStats.findIndex(
        item => item.userId === "company"
      )
      if (findIndexAllCompany >= 0) {
        if (!!state.costReserwation) {
          allStats[findIndexAllCompany].allCosts =
            allStats[findIndexAllCompany].allCosts + state.costReserwation
        }
        allStats[findIndexAllCompany].countReserwations =
          allStats[findIndexAllCompany].countReserwations + 1
      } else {
        const dateToChar = {
          allCosts: state.costReserwation,
          countReserwations: 1,
          userId: "company",
          user: companyName.toUpperCase(),
        }
        allStats.push(dateToChar)
      }
    }

    const findIndexInAllStats = allStats.findIndex(
      item => item.userId === state.toWorkerUserId._id
    )
    if (findIndexInAllStats >= 0) {
      if (!!state.costReserwation) {
        allStats[findIndexInAllStats].allCosts =
          allStats[findIndexInAllStats].allCosts + state.costReserwation
      }
      allStats[findIndexInAllStats].countReserwations =
        allStats[findIndexInAllStats].countReserwations + 1
    } else {
      const userSurname = Buffer.from(
        state.toWorkerUserId.surname,
        "base64"
      ).toString("utf-8")

      const userName = Buffer.from(
        state.toWorkerUserId.name,
        "base64"
      ).toString("utf-8")
      const dateToChar = {
        allCosts: state.costReserwation,
        countReserwations: 1,
        userId: state.toWorkerUserId._id,
        user: `${userName} ${userSurname}`,
      }
      allStats.push(dateToChar)
    }
  })
  const allLabels = [
    {
      dataKey: "allCosts",
      label: "Uzbierana kwota",
      extraValueLabel: "zł",
      color: "primaryColor",
    },
    {
      dataKey: "countReserwations",
      label: "Liczba rezerwacj",
      extraValueLabel: "",
      color: "primaryColorDark",
    },
  ]
  return {
    allStats: allStats,
    allLabels: allLabels,
  }
}

export const chartResState = (companyStats, companyName, isAdmin) => {
  const allStats = []
  const filterCompanyStatsNoActiveAndDate = companyStats.filter(item => {
    const actualDate = new Date()
    const splitDateEnd = item.dateEnd.split(":")
    const dateItem = new Date(
      item.dateYear,
      item.dateMonth - 1,
      item.dateDay,
      Number(splitDateEnd[0]),
      Number(splitDateEnd[1])
    )
    if (actualDate < dateItem) {
      return false
    } else {
      return true
    }
  })

  filterCompanyStatsNoActiveAndDate.forEach(state => {
    const validVisitFinished =
      state.visitCanceled || state.visitNotFinished ? false : true

    if (isAdmin) {
      const findIndexAllCompany = allStats.findIndex(
        item => item.userId === "company"
      )
      if (findIndexAllCompany >= 0) {
        if (state.visitCanceled) {
          allStats[findIndexAllCompany].visitCanceled =
            allStats[findIndexAllCompany].visitCanceled + 1
        } else if (state.visitNotFinished) {
          allStats[findIndexAllCompany].visitNotFinished =
            allStats[findIndexAllCompany].visitNotFinished + 1
        } else {
          allStats[findIndexAllCompany].visitFinished =
            allStats[findIndexAllCompany].visitFinished + 1
        }
        allStats[findIndexAllCompany].countReserwations =
          allStats[findIndexAllCompany].countReserwations + 1
      } else {
        const dateToChar = {
          countReserwations: 1,
          visitCanceled: state.visitCanceled ? 1 : 0,
          visitNotFinished: state.visitNotFinished ? 1 : 0,
          visitFinished: validVisitFinished ? 1 : 0,
          activeHappyHour: !!state.activeHappyHour ? 1 : 0,
          activePromotion: !!state.activePromotion ? 1 : 0,
          activeStamp: !!state.activeStamp ? 1 : 0,
          userId: "company",
          user: companyName.toUpperCase(),
        }
        allStats.push(dateToChar)
      }
    }
    const findIndexInAllStats = allStats.findIndex(
      item => item.userId === state.toWorkerUserId._id
    )
    if (findIndexInAllStats >= 0) {
      if (!!state.activeHappyHour) {
        allStats[findIndexInAllStats].activeHappyHour =
          allStats[findIndexInAllStats].activeHappyHour + 1
      }
      if (!!state.activePromotion) {
        allStats[findIndexInAllStats].activePromotion =
          allStats[findIndexInAllStats].activePromotion + 1
      }
      if (!!state.activeStamp) {
        allStats[findIndexInAllStats].activeStamp =
          allStats[findIndexInAllStats].activeStamp + 1
      }
      if (state.visitCanceled) {
        allStats[findIndexInAllStats].visitCanceled =
          allStats[findIndexInAllStats].visitCanceled + 1
      } else if (state.visitNotFinished) {
        allStats[findIndexInAllStats].visitNotFinished =
          allStats[findIndexInAllStats].visitNotFinished + 1
      } else {
        allStats[findIndexInAllStats].visitFinished =
          allStats[findIndexInAllStats].visitFinished + 1
      }
      allStats[findIndexInAllStats].countReserwations =
        allStats[findIndexInAllStats].countReserwations + 1
    } else {
      const userSurname = Buffer.from(
        state.toWorkerUserId.surname,
        "base64"
      ).toString("utf-8")

      const userName = Buffer.from(
        state.toWorkerUserId.name,
        "base64"
      ).toString("utf-8")

      const dateToChar = {
        countReserwations: 1,
        visitCanceled: state.visitCanceled ? 1 : 0,
        visitNotFinished: state.visitNotFinished ? 1 : 0,
        visitFinished: validVisitFinished ? 1 : 0,
        activeHappyHour: !!state.activeHappyHour ? 1 : 0,
        activePromotion: !!state.activePromotion ? 1 : 0,
        activeStamp: !!state.activeStamp ? 1 : 0,
        userId: state.toWorkerUserId._id,
        user: `${userName} ${userSurname}`,
      }
      allStats.push(dateToChar)
    }
  })
  const allLabels = [
    {
      dataKey: "countReserwations",
      label: "Liczba rezerwacj",
      extraValueLabel: "",
      color: "primaryColorDark",
    },
    {
      dataKey: "visitFinished",
      label: "Wizyty odbyte",
      extraValueLabel: "",
      color: "successColor",
    },
    {
      dataKey: "visitNotFinished",
      label: "Wizyty nie odbyte",
      extraValueLabel: "",
      color: "secondColor",
    },
    {
      dataKey: "visitCanceled",
      label: "Wizyty odwołane",
      extraValueLabel: "",
      color: "dangerColor",
    },
    {
      dataKey: "activeHappyHour",
      label: "Wizyty podczas happy hours",
      extraValueLabel: "",
      color: "primaryColorLight",
    },
    {
      dataKey: "activePromotion",
      label: "Wizyty podczas promocji",
      extraValueLabel: "",
      color: "successColorDark",
    },
    {
      dataKey: "activeStamp",
      label: "Wizyty z pieczątek",
      extraValueLabel: "",
      color: "dangerColorDark",
    },
  ]
  return {
    allStats: allStats,
    allLabels: allLabels,
  }
}

export const chartServicesState = (companyStats, services, isAdmin) => {
  const allStats = []
  const filterCompanyStatsNoActiveAndDate = companyStats.filter(item => {
    const actualDate = new Date()
    const splitDateEnd = item.dateEnd.split(":")
    const dateItem = new Date(
      item.dateYear,
      item.dateMonth - 1,
      item.dateDay,
      Number(splitDateEnd[0]),
      Number(splitDateEnd[1])
    )
    if (item.visitCanceled || item.visitNotFinished || actualDate < dateItem) {
      return false
    } else {
      return true
    }
  })

  filterCompanyStatsNoActiveAndDate.forEach(state => {
    const findIndexInAllStats = allStats.findIndex(
      item => item.serviceId === state.serviceId
    )
    if (findIndexInAllStats >= 0) {
      allStats[findIndexInAllStats].countReserwations =
        allStats[findIndexInAllStats].countReserwations + 1
    } else {
      const findServiceName = services.find(
        item => item._id === state.serviceId
      )
      let serviceName = "Brak usługi"
      if (!!findServiceName) {
        serviceName = findServiceName.serviceName
      }
      const dateToChar = {
        countReserwations: 1,
        serviceId: state.serviceId,
        user: serviceName,
      }
      allStats.push(dateToChar)
    }
  })
  const allLabels = [
    {
      dataKey: "countReserwations",
      label: "Liczba rezerwacj",
      extraValueLabel: "",
      color: "primaryColor",
    },
  ]

  return {
    allStats: allStats,
    allLabels: allLabels,
  }
}

export const chartMonthsState = (companyStats, allMonths, isAdmin) => {
  const allStats = []
  const filterCompanyStatsNoActiveAndDate = companyStats.filter(item => {
    const actualDate = new Date()
    const splitDateEnd = item.dateEnd.split(":")
    const dateItem = new Date(
      item.dateYear,
      item.dateMonth - 1,
      item.dateDay,
      Number(splitDateEnd[0]),
      Number(splitDateEnd[1])
    )
    if (item.visitCanceled || item.visitNotFinished || actualDate < dateItem) {
      return false
    } else {
      return true
    }
  })

  filterCompanyStatsNoActiveAndDate.forEach(state => {
    const findIndexInAllStats = allStats.findIndex(
      item => item.dateMonth === state.dateMonth
    )
    if (findIndexInAllStats >= 0) {
      allStats[findIndexInAllStats].countReserwations =
        allStats[findIndexInAllStats].countReserwations + 1

      if (!!state.costReserwation) {
        allStats[findIndexInAllStats].allCosts =
          allStats[findIndexInAllStats].allCosts + state.costReserwation
      }
    } else {
      const findMonthName = allMonths.find(
        item => item.value === state.dateMonth
      )
      let monthName = "Brak danych"
      if (!!findMonthName) {
        monthName = findMonthName.label
      }
      const dateToChar = {
        countReserwations: 1,
        dateMonth: state.dateMonth,
        user: monthName,
        allCosts: state.costReserwation,
      }
      allStats.push(dateToChar)
    }
  })
  const allLabels = [
    {
      dataKey: "allCosts",
      label: "Uzbierana kwota",
      extraValueLabel: "zł",
      color: "primaryColor",
    },
    {
      dataKey: "countReserwations",
      label: "Liczba rezerwacj",
      extraValueLabel: "",
      color: "primaryColorDark",
    },
  ]

  return {
    allStats: allStats,
    allLabels: allLabels,
  }
}

export const chartSMSState = (companyStats, companyName, isAdmin) => {
  const allStats = []
  // const filterCompanyStatsNoActiveAndDate = companyStats.filter(item => {
  //   const actualDate = new Date()
  //   const splitDateEnd = item.dateEnd.split(":")
  //   const dateItem = new Date(
  //     item.dateYear,
  //     item.dateMonth - 1,
  //     item.dateDay,
  //     Number(splitDateEnd[0]),
  //     Number(splitDateEnd[1])
  //   )
  //   if (actualDate < dateItem) {
  //     return false
  //   } else {
  //     return true
  //   }
  // })

  companyStats.forEach(state => {
    if (isAdmin) {
      const findIndexAllCompany = allStats.findIndex(
        item => item.userId === "company"
      )
      if (findIndexAllCompany >= 0) {
        if (!!state.sendSMSReserwation) {
          allStats[findIndexAllCompany].sendSMSReserwation =
            allStats[findIndexAllCompany].sendSMSReserwation + 1
        } else if (!!state.sendSMSNotifaction) {
          allStats[findIndexAllCompany].sendSMSNotifaction =
            allStats[findIndexAllCompany].sendSMSNotifaction + 1
        } else if (!!state.sendSMSCanceled) {
          allStats[findIndexAllCompany].sendSMSCanceled =
            allStats[findIndexAllCompany].sendSMSCanceled + 1
        }
        allStats[findIndexAllCompany].countReserwations =
          allStats[findIndexAllCompany].countReserwations + 1
      } else {
        const dateToChar = {
          countReserwations: 1,
          sendSMSReserwation: !!state.sendSMSReserwation ? 1 : 0,
          sendSMSNotifaction: !!state.sendSMSNotifaction ? 1 : 0,
          sendSMSCanceled: !!state.sendSMSCanceled ? 1 : 0,
          userId: "company",
          user: companyName.toUpperCase(),
        }
        allStats.push(dateToChar)
      }
    }
  })
  const allLabels = [
    {
      dataKey: "countReserwations",
      label: "Liczba rezerwacj",
      extraValueLabel: "",
      color: "primaryColorDark",
    },
    {
      dataKey: "sendSMSReserwation",
      label: "Powiadomienie SMS podczas rezerwacji",
      extraValueLabel: "",
      color: "successColor",
    },
    {
      dataKey: "sendSMSNotifaction",
      label: "Powiadomienie SMS przed wizytą",
      extraValueLabel: "",
      color: "secondColor",
    },
    {
      dataKey: "sendSMSCanceled",
      label:
        "Powiadomienie SMS podczas anulowania/zmiany rezerwacji przez pracodawce/pracownika",
      extraValueLabel: "",
      color: "dangerColor",
    },
  ]
  return {
    allStats: allStats,
    allLabels: allLabels,
  }
}

export const chartSMSStateAll = (companyStats, allMonths, isAdmin) => {
  const allStats = []
  companyStats.forEach(state => {
    const findIndexInAllStats = allStats.findIndex(
      item => item.month === state.month
    )
    if (findIndexInAllStats >= 0) {
      if (!!state.count && !!!state.isAdd) {
        allStats[findIndexInAllStats].allSMS =
          allStats[findIndexInAllStats].allSMS + state.count
      }

      if (!!state.count && !!state.isAdd) {
        allStats[findIndexInAllStats].allSMSPlus =
          allStats[findIndexInAllStats].allSMSPlus + state.count
      }
    } else {
      const findMonthName = allMonths.find(item => item.value === state.month)
      let monthName = "Brak danych"
      if (!!findMonthName) {
        monthName = findMonthName.label
      }
      const dateToChar = {
        month: state.month,
        user: monthName,
        allSMS: !!!state.isAdd ? state.count : 0,
        allSMSPlus: !!state.isAdd ? state.count : 0,
      }
      allStats.push(dateToChar)
    }
  })
  const allLabels = [
    {
      dataKey: "allSMS",
      label: "Wykorzystane SMS-y",
      extraValueLabel: "",
      color: "primaryColor",
    },
    {
      dataKey: "allSMSPlus",
      label: "Dodane SMS-y",
      extraValueLabel: "",
      color: "primaryColorDark",
    },
  ]

  return {
    allStats: allStats,
    allLabels: allLabels,
  }
}

export const chartCompanyServices = (companyStats, companyName, isAdmin) => {
  const allStats = []

  companyStats.forEach(state => {
    if (isAdmin) {
      const findIndexAllCompany = allStats.findIndex(
        item => item.userId === "company"
      )
      if (findIndexAllCompany >= 0) {
        if (!!state.cost) {
          allStats[findIndexAllCompany].allCosts =
            allStats[findIndexAllCompany].allCosts + state.cost
        }

        if (!!state.isDeleted) {
          allStats[findIndexAllCompany].deletedServices =
            allStats[findIndexAllCompany].deletedServices + 1
        }
        allStats[findIndexAllCompany].countServices =
          allStats[findIndexAllCompany].countServices + 1
      } else {
        const dateToChar = {
          allCosts: !!state.cost ? state.cost : 0,
          countServices: 1,
          deletedServices: !!state.isDeleted ? 1 : 0,
          userId: "company",
          user: companyName.toUpperCase(),
        }
        allStats.push(dateToChar)
      }
    }

    const findIndexInAllStats = allStats.findIndex(
      item => item.userId === state.workerUserId._id
    )
    if (findIndexInAllStats >= 0) {
      if (!!state.cost) {
        allStats[findIndexInAllStats].allCosts =
          allStats[findIndexInAllStats].allCosts + state.cost
      }
      if (!!state.isDeleted) {
        allStats[findIndexInAllStats].deletedServices =
          allStats[findIndexInAllStats].deletedServices + 1
      }
      allStats[findIndexInAllStats].countServices =
        allStats[findIndexInAllStats].countServices + 1
    } else {
      const userSurname = Buffer.from(
        state.workerUserId.surname,
        "base64"
      ).toString("utf-8")

      const userName = Buffer.from(state.workerUserId.name, "base64").toString(
        "utf-8"
      )
      const dateToChar = {
        allCosts: !!state.cost ? state.cost : 0,
        countServices: 1,
        deletedServices: !!state.isDeleted ? 1 : 0,
        userId: state.workerUserId._id,
        user: `${userName} ${userSurname}`,
      }
      allStats.push(dateToChar)
    }
  })
  const allLabels = [
    {
      dataKey: "allCosts",
      label: "Uzbierana kwota",
      extraValueLabel: "zł",
      color: "primaryColor",
    },
    {
      dataKey: "countServices",
      label: "Liczba serwisów",
      extraValueLabel: "",
      color: "primaryColorDark",
    },
    {
      dataKey: "deletedServices",
      label: "Serwisy odwołane",
      extraValueLabel: "",
      color: "dangerColor",
    },
  ]
  return {
    allStats: allStats,
    allLabels: allLabels,
  }
}

export const chartCompanyCommunitings = (
  companyStats,
  companyName,
  isAdmin
) => {
  const allStats = []
  const filterCompanyStatsNoActiveAndDate = companyStats.filter(item => {
    const actualDate = new Date()
    const splitDateEnd = item.timeEnd.split(":")
    const dateItem = new Date(
      item.year,
      item.month - 1,
      item.day,
      Number(splitDateEnd[0]),
      Number(splitDateEnd[1])
    )
    if (actualDate < dateItem) {
      return false
    } else {
      return true
    }
  })

  filterCompanyStatsNoActiveAndDate.forEach(state => {
    if (isAdmin) {
      const findIndexAllCompany = allStats.findIndex(
        item => item.userId === "company"
      )
      if (findIndexAllCompany >= 0) {
        if (!!state.cost) {
          allStats[findIndexAllCompany].allCosts =
            allStats[findIndexAllCompany].allCosts + state.cost
        }

        if (!!state.isDeleted) {
          allStats[findIndexAllCompany].deleted =
            allStats[findIndexAllCompany].deleted + 1
        }

        if (!!state.statusValue === 4) {
          allStats[findIndexAllCompany].canceled =
            allStats[findIndexAllCompany].canceled + 1
        }

        if (!!state.statusValue === 5) {
          allStats[findIndexAllCompany].notRealized =
            allStats[findIndexAllCompany].notRealized + 1
        }
        allStats[findIndexAllCompany].countCommunitings =
          allStats[findIndexAllCompany].countCommunitings + 1
      } else {
        const dateToChar = {
          allCosts: !!state.cost ? state.cost : 0,
          countCommunitings: 1,
          deleted: !!state.isDeleted ? 1 : 0,
          canceled: !!state.statusValue === 4 ? 1 : 0,
          notRealized: !!state.statusValue === 5 ? 1 : 0,
          userId: "company",
          user: companyName.toUpperCase(),
        }
        allStats.push(dateToChar)
      }
    }

    const findIndexInAllStats = allStats.findIndex(
      item => item.userId === state.workerUserId._id
    )
    if (findIndexInAllStats >= 0) {
      if (!!state.cost) {
        allStats[findIndexInAllStats].allCosts =
          allStats[findIndexInAllStats].allCosts + state.cost
      }
      if (!!state.isDeleted) {
        allStats[findIndexInAllStats].deleted =
          allStats[findIndexInAllStats].deleted + 1
      }
      if (!!state.statusValue === 4) {
        allStats[findIndexInAllStats].canceled =
          allStats[findIndexInAllStats].canceled + 1
      }
      if (!!state.statusValue === 5) {
        allStats[findIndexInAllStats].notRealized =
          allStats[findIndexInAllStats].notRealized + 1
      }
      allStats[findIndexInAllStats].countCommunitings =
        allStats[findIndexInAllStats].countCommunitings + 1
    } else {
      const userSurname = Buffer.from(
        state.workerUserId.surname,
        "base64"
      ).toString("utf-8")

      const userName = Buffer.from(state.workerUserId.name, "base64").toString(
        "utf-8"
      )
      const dateToChar = {
        allCosts: !!state.cost ? state.cost : 0,
        countCommunitings: 1,
        deleted: !!state.isDeleted ? 1 : 0,
        canceled: !!state.statusValue === 4 ? 1 : 0,
        notRealized: !!state.statusValue === 5 ? 1 : 0,
        userId: state.workerUserId._id,
        user: `${userName} ${userSurname}`,
      }
      allStats.push(dateToChar)
    }
  })
  const allLabels = [
    {
      dataKey: "allCosts",
      label: "Uzbierana kwota",
      extraValueLabel: "zł",
      color: "primaryColor",
    },
    {
      dataKey: "countCommunitings",
      label: "Liczba dojazdów",
      extraValueLabel: "",
      color: "primaryColorDark",
    },
    {
      dataKey: "deleted",
      label: "Dojazdy usunięte",
      extraValueLabel: "",
      color: "dangerColor",
    },
    {
      dataKey: "canceled",
      label: "Dojazdy odwołane",
      extraValueLabel: "",
      color: "dangerColorDark",
    },
    {
      dataKey: "notRealized",
      label: "Dojazdy nie zrealizowany",
      extraValueLabel: "",
      color: "secondColor",
    },
  ]
  return {
    allStats: allStats,
    allLabels: allLabels,
  }
}
