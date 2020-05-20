import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import logoWearables from "../assets/logo-wearable.png";

const OrderSuccess = () => {
  const { orderId } = useParams();
  return (
    <>
      <Wrapper>
        <div>
          <img src={logoWearables} alt="logo wearables" />
          <h2>Thank you for your purshase WEARABLES</h2>
          <h3>
            Here is you confirmation number:{" "}
            <span style={{ fontWeight: "700" }}> {orderId}</span>
          </h3>
          <Link to="/">
            <FormButton>Back to Home page</FormButton>
          </Link>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px;
  width: calc(100vw - 120px);
  min-height: calc(100vh - 350px);
  border: 1px solid #e6ecf0;
  div {
    text-align: center;
    h2 {
      padding-bottom: 12px;
      font-weight: 400;
    }
  }
  @media (max-width: 525px) {
    margin: 30px;
    width: calc(100% - 60px);
  }
`;

const FormButton = styled.button`
  outline: none;
  background-color: red;
  color: white;
  padding: 10px 30px;
  border: 1px solid white;
  font-size: 1em;
  margin-top: 30px;
  margin-bottom: 50px;
  cursor: pointer;
  border-radius: 4px;
`;

export default OrderSuccess;
