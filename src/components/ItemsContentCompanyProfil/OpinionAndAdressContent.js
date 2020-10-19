import React from "react"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import ButtonIcon from "../ButtonIcon"
import { MdEdit, MdPhone } from "react-icons/md"

const OpinionRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const OpinionsAndAdress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const AdressContent = styled.div`
  padding-right: 10px;
  width: 60%;
`

const OpinionsContent = styled.div`
  width: 40%;
  height: 20px;
  padding-left: 10px;
`

const OpinionUp = styled.div`
  background-color: ${Colors.navBackground};
  color: white;
  text-align: center;
  font-size: 1.5rem;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
`

const OpininPadding = styled.div`
  padding: 2px 15px;
`

const OpinionDown = styled.div`
  background-color: #424242;
  font-size: 0.9rem;
  padding: 2px 15px;
  border-bottom-left-radius: 5px;
  white-space: nowrap;
`

const DivInlineBlock = styled.div`
  display: inline-block;
  padding-right: 5px;
`

const TelephoneDiv = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
`

const CirclePhone = styled.div`
  position: relative;
  top: 3px;
  border-radius: 50%;
  background-color: ${props =>
    props.isCompanyEditProfil ? Colors.secondColor : Colors.buttonIconColor};
  height: 40px;
  width: 40px;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  margin-right: 20px;
`

const OpinionAndAdressContent = ({
  companyEditProfilProps = {},
  city = "",
  district = "",
  adress = "",
  TitleRightColumn,
  opinionsCount = 0,
  opinionsValue = "0,0",
  phone = "000-000-000",
  ButtonEditPosition,
  isCompanyEditProfil = false,
  editable = false,
  onClickEdit = () => {},
}) => {
  const handleEdit = () => {
    onClickEdit()
  }

  return (
    <>
      <OpinionsAndAdress>
        <AdressContent>
          <TitleRightColumn isCompanyEditProfil={isCompanyEditProfil} adress>
            <DivInlineBlock> {`${city},`}</DivInlineBlock>
            <DivInlineBlock>{`${district},`}</DivInlineBlock>
            <DivInlineBlock> {`${adress}`}</DivInlineBlock>
          </TitleRightColumn>
        </AdressContent>
        <OpinionsContent>
          <OpinionRight>
            <OpinionUp>
              <OpininPadding>{opinionsValue}</OpininPadding>
              <OpinionDown>Opinie: {opinionsCount}</OpinionDown>
            </OpinionUp>
          </OpinionRight>
        </OpinionsContent>
      </OpinionsAndAdress>
      <TelephoneDiv>
        <CirclePhone isCompanyEditProfil={isCompanyEditProfil}>
          <MdPhone />
        </CirclePhone>
        {phone}
      </TelephoneDiv>
      {isCompanyEditProfil && (
        <ButtonEditPosition>
          <ButtonIcon
            title="Edytuj"
            uppercase
            fontIconSize="25"
            fontSize="14"
            icon={<MdEdit />}
            secondColors
            onClick={handleEdit}
          />
        </ButtonEditPosition>
      )}
    </>
  )
}
export default OpinionAndAdressContent
