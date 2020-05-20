import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cart from "../Cart";
import Button from "../UnstyledButton";
import CloseIcon from "@material-ui/icons/Close";
import Typeahead from "../Typeahead";
import { debounce } from "../../utils";
import { useAuth0 } from "../SignIn/react-auth0-spa";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartModal = ({ open, toggle }) => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loginWithPopup,
  } = useAuth0();
  const userInfo = useSelector((state) => state.userInfo);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        width: window.innerWidth,
      });
    }, 200);
    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  return (
    <>
      <GreyDiv open={open} onClick={() => toggle()} />
      <Wrapper open={open}>
        <CloseBtn onClick={() => toggle()}>
          <CloseIcon
            style={{ fontSize: 30, margin: "30px 20px 0 0", outline: "none" }}
          />
        </CloseBtn>
        {dimensions.width < 700 && (
          <SignInWrapper>
            {isAuthenticated && userInfo.userInfo ? (
              <Link to="/profile">
                <IconNav data-css="IconNav">
                  <Avatar src={userInfo.userInfo.avatarUrl} alt="avatar" />
                </IconNav>
              </Link>
            ) : (
              <p></p>
            )}
            {!isAuthenticated ? (
              <IconNav
                onClick={() => loginWithPopup({})}
                // onClick={() => loginWithRedirect({})}
                data-css="IconNav"
              >
                <AccountCircleOutlinedIcon />
              </IconNav>
            ) : (
              <IconNav
                style={{ paddingLeft: "0px" }}
                onClick={() => logout()}
                data-css="IconNav"
              >
                <ExitToAppOutlinedIcon />
              </IconNav>
            )}
          </SignInWrapper>
        )}
        <NavMobile>
          {dimensions.width < 700 && (
            <Typeahead toggle={toggle} dimensions={dimensions} />
          )}
        </NavMobile>
        <Cart toggle={toggle} />
      </Wrapper>
    </>
  );
};

export default CartModal;

const Wrapper = styled.div`
  position: fixed;
  display: block;
  z-index: 5;
  background: white;
  right: -301px;
  width: 600px;
  height: calc(100vh - 80px);
  transition: ease-in-out 0.5s all;
  ${(props) =>
    props.open
      ? `transform: translateX(-300px);`
      : `transform: translateX(300px);`};
  @media (max-width: 700px) {
    width: 100%;
    right: -370px;
    ${(props) =>
      props.open
        ? `transform: translateX(-370px);`
        : `transform: translateX(300px);`};
  }
`;

const GreyDiv = styled.div`
  position: fixed;
  z-index: 4;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  transition: ease-in 1s all;
  ${(props) =>
    props.open
      ? `display: block;
    opacity: 0.5;`
      : `display: none;
    opacity: 0;`}
`;

const CloseBtn = styled(Button)`
  position: relative;
  margin: 5px 5px 0 auto;
  outline: none;
`;

const SignInWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  left: 0;
`;

const NavMobile = styled.div`
  /* display: none; */
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const IconNav = styled.div`
  padding: 0 30px;
  /* border-left: 1px solid #e6ecf0; */
  height: 80px;
  /* width: 80px; */
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in;
  /* &:hover {
    background-color: #f4f7f6;
  } */
`;
