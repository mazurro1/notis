import React, { useEffect, useState, useRef } from "react"
import { CSSTransition } from "react-transition-group"

const TextDelay = ({ textActive = false, text = "", children }) => {
  const [textOnActive, setTextOnActive] = useState(false)
  const timerToClearSomewhere = useRef(null)

  useEffect(() => {
    if (textActive) {
      timerToClearSomewhere.current = setTimeout(() => {
        setTextOnActive(true)
      }, 300)
    } else {
      clearTimeout(timerToClearSomewhere.current)
      setTextOnActive(false)
    }
  }, [textActive])

  return (
    <CSSTransition
      in={textOnActive}
      timeout={300}
      classNames="textAreaDelay"
      unmountOnExit
    >
      <div>{children}</div>
    </CSSTransition>
  )
}
export default TextDelay
