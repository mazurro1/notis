import React, { useEffect } from "react"
import "../../style.css"
import { fetchConfirmAddWorkerToCompany } from "../state/actions"
import { useDispatch } from "react-redux"
import CompanyPriv from "./CompanyPriv"
import styled from "styled-components"
import { HiEmojiHappy } from "react-icons/hi"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"

const TextWarning = styled.div`
  margin-top: 60px;
  font-size: 1.6rem;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Poppins-Bold", sans-serif;

  span {
    color: ${props => Colors(props.siteProps).primaryColor};
    font-size: 6rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`

const ActiveWorker = ({ companyId, workerEmail, codeToActive }) => {
  const dispatch = useDispatch()
  const siteProps = useSelector(state => state.siteProps)
  useEffect(() => {
    dispatch(
      fetchConfirmAddWorkerToCompany(companyId, workerEmail, codeToActive)
    )
    navigate("/")
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const validParams = !!companyId && !!workerEmail && !!codeToActive
  return (
    <div>
      {validParams ? (
        <TextWarning siteProps={siteProps}>
          Dodawanie pracownika
          <span>
            <HiEmojiHappy />
          </span>
        </TextWarning>
      ) : (
        <CompanyPriv />
      )}
    </div>
  )
}
export default ActiveWorker
