import React, { Fragment } from "react";
import { useAuth0 } from "./react-auth0-spa";
import styled from "styled-components";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Wrapper>
        <WrapperInfo>
          <img src={user.picture} alt="Profile" />
          <h2>{user.name}</h2>
          <br />
          <p>{user.email}</p>
        </WrapperInfo>
        <WrapperHistory>
          <h2>Order history...</h2>
        </WrapperHistory>
        {/* <code>{JSON.stringify(user, null, 2)}</code> */}
      </Wrapper>
    </Fragment>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 60px;
  /* padding: 30px; */
  width: calc(100vw - 120px);
  height: calc(100vh - 350px);
  border: 1px solid #e6ecf0;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 30px;
  }
  h2 {
    padding-bottom: 12px;
    font-weight: 400;
  }
`;
const WrapperInfo = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e6ecf0;
`;

const WrapperHistory = styled.div`
  padding: 30px;
`;

export default Profile;
