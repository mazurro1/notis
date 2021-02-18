import { useRef, useEffect } from "react"

const UseOuterClick = callback => {
  const callbackRef = useRef()
  const innerRef = useRef()

  useEffect(() => {
    callbackRef.current = callback
  })
  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      )
        callbackRef.current(e)
    }
  }, [])

  return innerRef
}
export default UseOuterClick
