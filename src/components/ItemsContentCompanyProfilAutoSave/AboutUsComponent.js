import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
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
   ButtonTextPosition,
   company,
   user,
   isCompanyEditProfil = false
 }) => {
   const [editAboutUs, setEditAboutUs] = useState(false)
   const [textAboutUs, setTextAboutUs] = useState("")
   const dispatch = useDispatch()

   useEffect(() => {
     setEditAboutUs(false)
   }, [company.title])

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
       <RightColumnItem {...companyEditProfilProps} siteProps={siteProps}>
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
             onClick={() => handleEdit(setEditAboutUs)}
           />
         </ButtonTextPosition>
       )}
     </>
   )
 }
export default AboutUsComponent