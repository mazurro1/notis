const BufferText = ({
  text = "",
  toString = true,
}: {
  text: string
  toString: boolean
}) => {
  let base64
  if (typeof window !== "undefined") {
    if (toString) {
      base64 = atob(text)
    } else {
      base64 = btoa(text)
    }
  } else {
    if (toString) {
      base64 = Buffer.from(text, "base64").toString("utf-8")
    } else {
      base64 = Buffer.from(text).toString("base64")
    }
  }

  return base64
}
export default BufferText
