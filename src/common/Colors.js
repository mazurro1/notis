export const Colors = (
  siteProps = {
    blind: false,
    dark: false,
  }
) => {
  const sitePropsDarkHex = "#f9a825"
  const sitePropsHex = "#ffff00"
  const backgroundsiteProps = "#313131"

  return {
    backgroundColorPage: siteProps.blind
      ? backgroundsiteProps
      : siteProps.dark
      ? backgroundsiteProps
      : "white",
    menuColor: siteProps.blind
      ? "#212121"
      : siteProps.dark
      ? "#212121"
      : "white",
    navBackground: "#212121",
    navDownBackground: "#282828",
    navText: "white",
    primaryColor: siteProps.blind ? sitePropsDarkHex : "#5ec2d7",
    primaryColorDark: siteProps.blind ? sitePropsHex : "#0597a7",
    primaryColorLight:
      siteProps.blind || siteProps.dark ? "#212121" : "#cce3e8",
    secondColor: siteProps.blind ? sitePropsDarkHex : "#f7a52c",
    secondColorLight: siteProps.blind || siteProps.dark ? "#212121" : "#fff3e0",
    secondDarkColor: siteProps.blind ? sitePropsHex : "#ed6c0c",
    darkColorLight: siteProps.blind || siteProps.dark ? "#bdbdbd" : "#bdbdbd",
    darkColor: siteProps.blind
      ? sitePropsHex
      : siteProps.dark
      ? "#0597a7"
      : "#424242",
    darkColorDark: siteProps.blind
      ? sitePropsDarkHex
      : siteProps.dark
      ? "#5ec2d7"
      : "#282828",
    dangerColor: siteProps.blind ? sitePropsDarkHex : "#f44336",
    dangerLightColor: siteProps.blind || siteProps.dark ? "#212121" : "#ffebee",
    dangerColorDark: siteProps.blind ? sitePropsHex : "#c62828",
    successColorLight:
      siteProps.blind || siteProps.dark ? "#212121" : "#e8f5e9",
    successColor: siteProps.blind ? sitePropsDarkHex : "#43a047",
    successColorDark: siteProps.blind ? sitePropsHex : "#2e7d32",
    textNormalBlack: siteProps.blind
      ? "white"
      : siteProps.dark
      ? "white"
      : "#222",
    textNormalWhite: siteProps.blind ? "#222" : "white",
    textBlack: "#222",
    opinionColorUp: siteProps.blind
      ? sitePropsHex
      : siteProps.dark
      ? "#5ec2d7"
      : "#212121",
    opinionColorDown: siteProps.blind
      ? sitePropsDarkHex
      : siteProps.dark
      ? "#0597a7"
      : "#424242",
    timePickerTopBackground: siteProps.blind ? "#313131" : "#fff",
    calendarBackground: siteProps.blind ? "#212121" : "#fff",
    calendarDisabledDate: siteProps.blind ? "#313131" : "#e4e7ea",
    calendarActiveDate: siteProps.blind
      ? "white"
      : siteProps.dark
      ? "#222"
      : "#222",
    timePickerBottomBackground: siteProps.blind ? "#212121" : "#f4f4f4",
    selectDateNavigationBackground: siteProps.blind
      ? sitePropsDarkHex
      : "#f5f4f5",
    selectDateNavigationBackgroundHover: siteProps.blind
      ? sitePropsHex
      : "#e0e0e0",
    selectDateNavigationText: siteProps.blind ? "#222" : "#757575",
    companyItemBackground: siteProps.blind
      ? "#212121"
      : siteProps.dark
      ? "#212121"
      : "#f5f4f5",
    disabled: siteProps.blind || siteProps.dark ? "#616161" : "#e0e0e0",
  }
}
