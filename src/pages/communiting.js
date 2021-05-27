import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import sal from "sal.js"
import SearchCommuniting from "../components/SearchCommuniting"

const CommunitingPage = props => {
  const siteProps = useSelector(state => state.siteProps)
  useEffect(() => {
    sal({
      threshold: 0.1,
      once: true,
    })
  }, [])

  let dataProps = []
  if (!!props.location.search) {
    dataProps = props.location.search.split("&")
  }

  return (
    <div
      data-sal="fade"
      data-sal-duration="800"
      data-sal-easing="ease-out-bounce"
    >
      <div>
        {dataProps.length === 1 ? (
          <SearchCommuniting
            communitingId={dataProps[0].slice(1)}
            siteProps={siteProps}
          />
        ) : (
          <SearchCommuniting communitingId="" siteProps={siteProps} />
        )}
      </div>
    </div>
  )
}
export default CommunitingPage
