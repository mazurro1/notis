import React, { useState } from "react"
import styled from "styled-components"
import { MdExpandMore } from "react-icons/md"
import { FaChrome, FaStamp } from "react-icons/fa"
import { Collapse } from "react-collapse"
import { LinkEffect } from "../common/LinkEffect"
import { Colors } from "../common/Colors"

const CategoryItemStyle = styled.div`
  margin-top: 5px;
`

const TitleCategory = styled.div`
  position: relative;
  font-size: 1.25rem;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props => Colors(props.siteProps).primaryColor};
  padding: 10px;
  border-radius: 5px;
  padding-right: 50px;
  overflow: hidden;
  user-select: none;
  text-transform: uppercase;
  cursor: pointer;
  padding-right: 250px;
  transition-property: padding-bottom, background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease;
`

const PositionCompanyLink = styled.div`
  position: absolute;
  right: 50px;
  top: 0px;
  border-radius: 5px;
  font-size: 1.8rem;
  padding: 8px;
  padding-bottom: 5px;
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  a {
    color: ${props => Colors(props.siteProps).textNormalWhite};
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }
  &:hover {
    transform: scale(1.1);
    a {
      color: ${props => Colors(props.siteProps).primaryColorDark};
    }
  }
`

const IconArrowPosition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px;
  padding-bottom: 0;
  font-size: 2rem;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  svg {
    transform: ${props =>
      props.collapseActive ? "rotate(-180deg)" : "rotate(0deg)"};
    transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const AllStampsPositions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 5px;
  margin-top: 10px;
`

const StampItem = styled.div`
  font-size: 1.4rem;
  margin: 5px;
  border-radius: 5px;
  height: 50px;
  width: 50px;
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).disabled};
  color: ${props => Colors(props.siteProps).textNormalWhite};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition-property: transform, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    transform: scale(1.2);
  }
`

const ServiceNameStyle = styled.div`
  font-size: 0.9rem;
  background-color: ${props => Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding: 2px 5px;
  border-radius: 5px;
  margin: 2.5px 5px;
`

const FlexAllServices = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
`

const BackgroundStamp = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).successColorLight
      : Colors(props.siteProps).companyItemBackground};
  margin-top: 10px;
`

const StampItemTitle = styled.div`
  font-size: 1rem;
  margin-left: 5px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  span {
    font-size: 1.1rem;
    font-family: "Poppins-Bold", sans-serif;
  }
`

const UserStampsCompany = ({ company, siteProps }) => {
  const [collapseActive, setCollapseActive] = useState(false)

  const handleClickArrow = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setCollapseActive(prevState => !prevState)
  }

  const handleStopPropagation = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  const numberFilterUserCompanyReserwations = company.reserwations.filter(
    item => {
      const splitDateEnd = item.dateEnd.split(":")
      const reserwationDate = new Date(
        item.dateYear,
        item.dateMonth - 1,
        item.dateDay,
        Number(splitDateEnd[0]),
        Number(splitDateEnd[1])
      )
      return reserwationDate < new Date()
    }
  ).length

  company.companyId.companyStamps.sort((a, b) => {
    const firstItemToSort = a.countStampsToActive
    const secondItemToSort = b.countStampsToActive
    if (firstItemToSort < secondItemToSort) return -1
    if (firstItemToSort > secondItemToSort) return 1
    return 0
  })

  const filterCompanyStamps = company.companyId.companyStamps.filter(
    item => !item.disabled
  )

  const mapFilterCompanyStamps = filterCompanyStamps.map(
    (stamp, stampIndex) => {
      const renderStars = [...Array(stamp.countStampsToActive)].map(
        (_, index) => {
          const starActive = numberFilterUserCompanyReserwations >= index + 1
          return (
            <StampItem key={index} active={starActive} siteProps={siteProps}>
              <FaStamp />
            </StampItem>
          )
        }
      )

      const mapStampServices = stamp.servicesId.map((service, serviceIndex) => {
        const findService = company.companyId.services.find(companyService => {
          return companyService._id === service
        })
        if (!!findService) {
          return (
            <ServiceNameStyle key={serviceIndex}>
              {findService.serviceName}
            </ServiceNameStyle>
          )
        } else {
          return <div key={serviceIndex} />
        }
      })
      return (
        <BackgroundStamp
          key={stampIndex}
          siteProps={siteProps}
          active={
            stamp.countStampsToActive <= numberFilterUserCompanyReserwations
          }
        >
          <FlexAllServices siteProps={siteProps}>
            {mapStampServices}
          </FlexAllServices>
          <StampItemTitle siteProps={siteProps}>
            Promocja: <span>{stamp.promotionPercent}%</span>
          </StampItemTitle>
          <StampItemTitle siteProps={siteProps}>
            Wymagana ilość naklejek: <span>{stamp.countStampsToActive}</span>
          </StampItemTitle>
          <StampItemTitle siteProps={siteProps}>
            Twoja ilość naklejek:{" "}
            <span>{numberFilterUserCompanyReserwations}</span>
          </StampItemTitle>
          <AllStampsPositions index={stampIndex % 2} siteProps={siteProps}>
            {renderStars}
          </AllStampsPositions>
        </BackgroundStamp>
      )
    }
  )

  return (
    <CategoryItemStyle>
      <TitleCategory siteProps={siteProps} onClick={handleClickArrow}>
        {company.companyId.name}
        <PositionCompanyLink
          siteProps={siteProps}
          data-tip
          data-for="goToWebsiteStamp"
          onClick={handleStopPropagation}
        >
          <LinkEffect
            path={`/company/${company.companyId.linkPath}`}
            text={<FaChrome />}
          />
        </PositionCompanyLink>
        <IconArrowPosition collapseActive={collapseActive}>
          <MdExpandMore />
        </IconArrowPosition>
      </TitleCategory>
      <Collapse isOpened={collapseActive}>
        <div>{mapFilterCompanyStamps}</div>
      </Collapse>
    </CategoryItemStyle>
  )
}
export default UserStampsCompany