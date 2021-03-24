import { useRef, useEffect } from "react"

const UseOuterClick = callback => {
  const callbackRef = useRef()
  const innerRef = useRef()

  function handleClick(e) {
    if (
      innerRef.current &&
      callbackRef.current &&
      !innerRef.current.contains(e.target)
    )
      callbackRef.current(e)
  }

  useEffect(() => {
    callbackRef.current = callback
  })
  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return innerRef
}
export default UseOuterClick

// const UseOuterClickAlert = ref => {
//   useEffect(() => {
//     /**
//      * Alert if clicked on outside of element
//      */
//     function handleClickOutside(event) {
//       if (ref.current && !ref.current.contains(event.target)) {
//         alert("You clicked outside of me!")
//       }
//     }
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [ref])
// }
// export default UseOuterClickAlert
