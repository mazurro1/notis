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
      ).toString("ascii")

      const userName = Buffer.from(
        state.toWorkerUserId.name,
        "base64"
      ).toString("ascii")
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
      ).toString("ascii")

      const userName = Buffer.from(
        state.toWorkerUserId.name,
        "base64"
      ).toString("ascii")

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
