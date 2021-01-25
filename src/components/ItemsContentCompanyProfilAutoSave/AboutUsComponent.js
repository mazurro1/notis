import React, {useState, useEffect} from 'react'
import { useDispatch } from "react-redux"
import { fetchSaveTextsCompany } from "../../state/actions"
import ColumnItemTextarea from "./ColumnItemTextarea"
import ButtonIcon from '../ButtonIcon'
import { MdEdit } from "react-icons/md"


 const AboutUsComponent = ({
   RightColumnItem,
   companyEditProfilProps,
   siteProps,
   TitleRightColumn,
   ParagraphRightColumn,
   company,
   user,
   isCompanyEditProfil = false,
   ButtonEditPosition,
   editAboutUs,
   setEditAboutUs,
   handleResetAllEditedComponents,
   disabledEditButtons,
   editMode,
 }) => {
   const [textAboutUs, setTextAboutUs] = useState("")
   const dispatch = useDispatch()

   useEffect(() => {
     setEditAboutUs(false)
   }, [company.title, editMode])

   const handleEdit = setChange => {
     setChange(prevState => !prevState)
   }

   const handleSaveChangesAboutUs = textAboutUsToSave => {
     dispatch(
       fetchSaveTextsCompany(
         user.token,
         user.company._id,
         textAboutUsToSave,
         null,
         null
       )
     )
   }

   return (
     <>
       <RightColumnItem
         {...companyEditProfilProps}
         siteProps={siteProps}
         active={editAboutUs}
         disabledEditButtons={disabledEditButtons}
       >
         <ColumnItemTextarea
           titleColumnItem="O NAS"
           TitleRightColumn={TitleRightColumn}
           ParagraphRightColumn={ParagraphRightColumn}
           title={company.title}
           editable={editAboutUs}
           onClickEdit={() => handleEdit(setEditAboutUs)}
           setTextEditedChange={setTextAboutUs}
           textEdited={textAboutUs}
           siteProps={siteProps}
           handleSaveTextarea={handleSaveChangesAboutUs}
           isCompanyEditProfil={editAboutUs}
           editMode={editMode}
         />
         {isCompanyEditProfil && (
           <ButtonEditPosition>
             <div data-tip data-for="disabledButton">
               <ButtonIcon
                 title="Edytuj tekst"
                 uppercase
                 fontIconSize="25"
                 fontSize="14"
                 icon={<MdEdit />}
                 secondColors
                 onClick={() => {
                   handleResetAllEditedComponents()
                   handleEdit(setEditAboutUs)
                 }}
                 disabled={disabledEditButtons}
               />
             </div>
           </ButtonEditPosition>
         )}
       </RightColumnItem>
     </>
   )
 }
export default AboutUsComponent