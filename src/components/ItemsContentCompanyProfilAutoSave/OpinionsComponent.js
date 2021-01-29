import React from 'react'
import {Colors} from '../../common/Colors'
import styled from 'styled-components'
import OpinionsComponentItem from "./OpinionsComponentItem"

const OpinionsComponentStyle = styled.div`
  background-color: red;
  width: 100%;
  border-radius: 5px;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  padding: 5px 10px;
  margin-bottom: 20px;
  margin-top: 20px;
`

 const OpinionsComponent = ({
   companyOpinions = [],
   siteProps,
   TitleRightColumn,
 }) => {
   
    const mapOpinions = companyOpinions.map((item, index) => {
        return (
          <OpinionsComponentItem
            opinion={item}
            siteProps={siteProps}
            key={index}
          />
        )
    })

   return (
     companyOpinions.length > 0 && <OpinionsComponentStyle siteProps={siteProps}>
       <div>
         <TitleRightColumn siteProps={siteProps}>Opinie</TitleRightColumn>
       </div>
       {mapOpinions}
     </OpinionsComponentStyle>
   )
 }

export default OpinionsComponent