import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchSaveTextsCompany } from "../../state/actions"
import ColumnItemTextarea from "./ColumnItemTextarea"
import ButtonIcon from '../ButtonIcon'
import { MdEdit } from "react-icons/md"
import styled from 'styled-components'

const MarginTopReserwation = styled.div`
  margin-top: 30px;
`


 const ReserwationTextComponent = ({
   RightColumnItem,
   companyEditProfilProps,
   siteProps,
   TitleRightColumn,
   ParagraphRightColumn,
   ButtonTextPosition,
   company,
   user,
   isCompanyEditProfil = false,
 }) => {
   const [editedReserwation, setEditedReserwation] = useState(false)
   const [textReserwation, setTextReserwation] = useState("")
   const dispatch = useDispatch()

   useEffect(() => {
     setEditedReserwation(false)
   }, [company.reserationText])

   const handleEdit = setChange => {
     setChange(prevState => !prevState)
   }

   const handleSaveChangesAboutUs = textAboutUsToSave => {
     dispatch(
       fetchSaveTextsCompany(
         user.token,
         user.company._id,
         null,
         textAboutUsToSave,
         null
       )
     )
   }

   return (
     <MarginTopReserwation>
       <RightColumnItem {...companyEditProfilProps} siteProps={siteProps}>
         <ColumnItemTextarea
           titleColumnItem="ZASADY REZERWACJI"
           TitleRightColumn={TitleRightColumn}
           ParagraphRightColumn={ParagraphRightColumn}
           title={company.reserationText}
           onClickEdit={() => handleEdit(setEditedReserwation)}
           setTextEditedChange={setTextReserwation}
           textEdited={textReserwation}
           siteProps={siteProps}
           isCompanyEditProfil={editedReserwation}
           editable={editedReserwation}
           handleSaveTextarea={handleSaveChangesAboutUs}
         />
       </RightColumnItem>
       {isCompanyEditProfil && (
         <ButtonTextPosition>
           <ButtonIcon
             title="Edytuj tekst"
             uppercase
             fontIconSize="25"
             fontSize="14"
             icon={<MdEdit />}
             secondColors
             onClick={() => handleEdit(setEditedReserwation)}
           />
         </ButtonTextPosition>
       )}
     </MarginTopReserwation>
   )
 }
export default ReserwationTextComponent