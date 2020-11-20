export const Colors = (
  colorBlind = {
    blind: false,
    dark: false,
  }
) => {
  const colorBlindDarkHex = "#f9a825"
  const colorBlindHex = "#ffff00"
  const backgroundColorBlind = "#313131"

  return {
    backgroundColorPage: colorBlind.blind
      ? backgroundColorBlind
      : colorBlind.dark
      ? backgroundColorBlind
      : "white",
    navBackground: "#212121",
    navDownBackground: "#282828",
    navText: "white",
    primaryColor: colorBlind.blind ? colorBlindDarkHex : "#5ec2d7",
    primaryColorDark: colorBlind.blind ? colorBlindHex : "#0597a7",
    secondColor: colorBlind.blind ? colorBlindDarkHex : "#f7a52c",
    secondDarkColor: colorBlind.blind ? colorBlindHex : "#ed6c0c",
    darkColor: colorBlind.blind
      ? colorBlindHex
      : colorBlind.dark
      ? "#0597a7"
      : "#424242",
    darkColorDark: colorBlind.blind
      ? colorBlindDarkHex
      : colorBlind.dark
      ? "#5ec2d7"
      : "#282828",
    dangerColor: colorBlind.blind ? colorBlindDarkHex : "#f44336",
    dangerColorDark: colorBlind.blind ? colorBlindHex : "#c62828",
    successColor: colorBlind.blind ? colorBlindDarkHex : "#43a047",
    successColorDark: colorBlind.blind ? colorBlindHex : "#2e7d32",
    textNormalBlack: colorBlind.blind
      ? "white"
      : colorBlind.dark
      ? "white"
      : "#222",
    textNormalWhite: colorBlind.blind ? "#222" : "white",
    textBlack: "#222",
    opinionColorUp: colorBlind.blind
      ? colorBlindHex
      : colorBlind.dark
      ? "#5ec2d7"
      : "#212121",
    opinionColorDown: colorBlind.blind
      ? colorBlindDarkHex
      : colorBlind.dark
      ? "#0597a7"
      : "#424242",
    timePickerTopBackground: colorBlind.blind ? "#313131" : "#fff",
    calendarBackground: colorBlind.blind ? "#212121" : "#fff",
    calendarDisabledDate: colorBlind.blind ? "#313131" : "#e4e7ea",
    calendarActiveDate: colorBlind.blind
      ? "white"
      : colorBlind.dark
      ? "#222"
      : "#222",
    timePickerBottomBackground: colorBlind.blind ? "#212121" : "#f4f4f4",
    selectDateNavigationBackground: colorBlind.blind
      ? colorBlindDarkHex
      : "#f5f4f5",
    selectDateNavigationBackgroundHover: colorBlind.blind
      ? colorBlindHex
      : "#e0e0e0",
    selectDateNavigationText: colorBlind.blind ? "#222" : "#757575",
    companyItemBackground: colorBlind.blind
      ? "#212121"
      : colorBlind.dark
      ? "#212121"
      : "#f5f4f5",
  }
}
