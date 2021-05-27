import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import sal from "sal.js"
import SearchService from "../components/SearchService"

const ServicePage = props => {
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
          <SearchService
            serviceId={dataProps[0].slice(1)}
            siteProps={siteProps}
          />
        ) : (
          <SearchService serviceId="" siteProps={siteProps} />
        )}
      </div>
    </div>
  )
}
export default ServicePage
