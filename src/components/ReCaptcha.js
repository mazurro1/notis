import React, { useEffect, useCallback, useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const ReCaptcha = () => {
  const [avaibleButton, setAvaibleButton] = useState(true)
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleReCaptchaVerify = async () => {
    const token = await executeRecaptcha("yourAction")
    console.log(token)
  }

  useEffect(() => {
    setAvaibleButton(!executeRecaptcha)
  }, [])

  return (
    <button disabled={avaibleButton} onClick={handleReCaptchaVerify}>
      Verify recaptcha
    </button>
  )
}

export default ReCaptcha
