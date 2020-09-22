import React from "react"
import { Colors } from "../common/Colors"
import { Industries } from "../common/Industries"
import ButtonIcon from "../components/ButtonIcon"
import InputIcon from "../components/InputIcon"
import styled from "styled-components"
import { FaUserPlus, FaUser } from "react-icons/fa"
import { MdWork } from "react-icons/md"

const WrapperNavigation = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${Colors.navBackground};
  padding-top: 20px;
  padding-bottom: 10px;
`

const NavigationDiv = styled.div`
  color: ${Colors.navText};
  background-color: ${Colors.navBackground};
  /* height: 70px; */
  max-width: 900px;
  margin: 0 auto;
`

const ButtonsNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const NavigationItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 200px;
`

const ButtonNavStyle = styled.div`
  padding: 10px 0;
  padding-left: 10px;
`
const ButtonNavStyleIndustries = styled.div`
  display: inline-block;
  padding: 10px 0;
  padding-left: 10px;
`

const LogoStyle = styled.div`
  position: absolute;
  left: 5%;
  font-size: 3.5rem;
  color: white;
`

const InputStyle = styled.div`
  display: inline-block;
  padding: 5px;
`

const AllInputs = styled.div`
  margin-left: 5px;
  margin-top: 5px;
`

const Navigation = () => {
  const mapIndustries = Industries.map(item => {
    return (
      <ButtonNavStyleIndustries>
        <ButtonIcon title={item} fontSize="18" buttonBgDark />
      </ButtonNavStyleIndustries>
    )
  })

  return (
    <WrapperNavigation>
      <NavigationDiv>
        <NavigationItems>
          <LogoStyle>NOTISE</LogoStyle>
          <ButtonsNav>
            <ButtonNavStyle>
              <ButtonIcon
                title="zarejestruj się"
                uppercase
                fontIconSize="35"
                fontSize="18"
                icon={<FaUserPlus />}
              />
            </ButtonNavStyle>
            <ButtonNavStyle>
              <ButtonIcon
                title="zaloguj się"
                uppercase
                fontIconSize="20"
                fontSize="18"
                icon={<FaUser />}
              />
            </ButtonNavStyle>
            <ButtonNavStyle>
              <ButtonIcon
                title="dla firm"
                uppercase
                fontIconSize="25"
                fontSize="18"
                icon={<MdWork />}
                secondColors
              />
            </ButtonNavStyle>
          </ButtonsNav>
        </NavigationItems>
        <AllInputs>
          <InputStyle>
            <InputIcon icon={<MdWork />} placeholder="Wpisz cos" />
          </InputStyle>
          <InputStyle>
            <InputIcon icon={<MdWork />} placeholder="Wpisz cos" />
          </InputStyle>
        </AllInputs>
        {mapIndustries}
      </NavigationDiv>
    </WrapperNavigation>
  )
}

export default Navigation
