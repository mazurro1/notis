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
