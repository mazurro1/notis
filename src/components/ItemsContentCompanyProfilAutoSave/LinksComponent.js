import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchSaveTextsCompany } from "../../state/actions"
import OurLinksContent from "./OurLinksContent"
import ButtonIcon from '../ButtonIcon'
import { MdEdit } from "react-icons/md"
import styled from 'styled-components'

const MarginTopReserwation = styled.div`
  margin-top: 30px;
`


 const LinksComponent = ({
   RightColumnItem,
   companyEditProfilProps,
   siteProps,
   TitleRightColumn,
   ButtonTextPosition,
   company,
   user,
   isCompanyEditProfil = false,
 }) => {
  const [editLinks, setEditLinks] = useState(false)
   const dispatch = useDispatch()

   useEffect(() => {
     setEditLinks(false)
   }, [company.linkFacebook, company.linkInstagram, company.linkiWebsite])

   const handleEdit = setChange => {
     setChange(prevState => !prevState)
   }

   const handleSaveChangesAboutUs = (
     newFacebookLink,
     newInstagramLink,
     newWebsiteLink
   ) => {
     const allLinks = {
       facebook: newFacebookLink,
       instagram: newInstagramLink,
       website: newWebsiteLink,
     }
     dispatch(
       fetchSaveTextsCompany(
         user.token,
         user.company._id,
         null,
         null,
         allLinks
       )
     )
   }

   return (
     <MarginTopReserwation>
       <RightColumnItem {...companyEditProfilProps} siteProps={siteProps}>
         <OurLinksContent
           TitleRightColumn={TitleRightColumn}
           companyEditProfilProps={companyEditProfilProps}
           {...companyEditProfilProps}
           editable={editLinks}
           siteProps={siteProps}
           onClickEdit={() => handleEdit(setEditLinks)}
           handleSaveLinks={handleSaveChangesAboutUs}
           linkFacebook={!!company.linkFacebook ? company.linkFacebook : ""}
           linkiWebsite={!!company.linkiWebsite ? company.linkiWebsite : ""}
           linkInstagram={!!company.linkInstagram ? company.linkInstagram : ""}
           company={company}
         />
       </RightColumnItem>
       {isCompanyEditProfil && (
         <ButtonTextPosition>
           <ButtonIcon
             title="Edytuj linki"
             uppercase
             fontIconSize="25"
             fontSize="14"
             icon={<MdEdit />}
             secondColors
             onClick={() => handleEdit(setEditLinks)}
           />
         </ButtonTextPosition>
       )}
     </MarginTopReserwation>
   )
 }
export default LinksComponent