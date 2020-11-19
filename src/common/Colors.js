export const Colors = (colorBlind = false) => {
  const colorBlindHex = "#ffeb3b"
  const colorBlindDarkHex = "#fdd835"
  const backgroundColorBlind = "#313131"

  return {
    backgroundColorPage: colorBlind ? backgroundColorBlind : "white",
    navBackground: "#212121",
    navDownBackground: "#282828",
    navText: "white",
    primaryColor: colorBlind ? colorBlindHex : "#5ec2d7",
    primaryColorDark: colorBlind ? colorBlindDarkHex : "#0597a7",
    secondColor: colorBlind ? colorBlindHex : "#f7a52c",
    secondDarkColor: colorBlind ? colorBlindDarkHex : "#ed6c0c",
    darkColor: "#424242",
    dangerColor: colorBlind ? colorBlindHex : "#f44336",
    dangerColorDark: colorBlind ? colorBlindDarkHex : "#c62828",
    successColor: colorBlind ? colorBlindHex : "#43a047",
    successColorDark: colorBlind ? colorBlindDarkHex : "#2e7d32",
  }
}
