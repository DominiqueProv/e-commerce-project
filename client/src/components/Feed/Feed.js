import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-router-dom";
import { SmallItem } from "../Items";
import SideBar from "../SideBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompleted,
  fetchResetStatus,
  clearQueries,
} from "../../Redux/actions";
import { ip } from "../../constants";

const Feed = () => {
  // const loaded = useSelector(state => state.data.isLoaded)
  const dispatch = useDispatch();
  const location = useLocation();
  // creates an array for all the values of the query 'body_location'
  // if there aren't any, it will return an empty array
  const queriesBodyLocation = new URLSearchParams(location.search).getAll(
    "body_location"
  );
  const [items, setItems] = React.useState([]);
  const { category } = useParams();
  let title = location.search;
  useEffect(() => {
    dispatch(clearQueries());
  }, []);
  useEffect(() => {
    if (category) {
      fetch(`${ip}/items/filter/${category}${location.search}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) setItems(res.items);
        })
        .then(dispatch(fetchCompleted()));
    } else {
      fetch(`${ip}/items${location.search}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) setItems(res.items);
        })
        .then(dispatch(fetchCompleted()));
    }
  }, [location]);

  return (
    <>
      <Wrapper data-css="WrapperFeed">
        <WrapperSideBar data-css="wrapper-sidebar">
          <SideBar category={category} />
        </WrapperSideBar>
        {items.length ? (
          <Content>
            <Header>
              {items.length ? (
                !category ? (
                  <Title>All items</Title>
                ) : (
                  <Title>{category}</Title>
                )
              ) : /*<Title>No items found in: {category}</Title>*/ null}
              {queriesBodyLocation.length > 0 &&
                queriesBodyLocation.map((query) => <Query key={query}></Query>)}
            </Header>
            <WrapperItems>
              {items.map((item, idx) => (
                <SmallItem key={item.id + idx} item={item} />
              ))}
            </WrapperItems>
          </Content>
        ) : (
          <LoaderWrapper>
            <CircularProgress
              color="primary"
              style={{ width: "30px", height: "30px" }}
            />
          </LoaderWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default Feed;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100vw;
  @media (max-width: 950px) {
    flex-direction: column;
  }
`;
const WrapperSideBar = styled.div`
  width: 300px;
  height: calc(100vh - 230px);
  @media (max-width: 950px) {
    width: 100%;
    height: auto;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 300px);
  @media (max-width: 950px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

const Query = styled.span`
  margin: auto 5px 0 5px;
`;

const Title = styled.h2`
  padding: 60px 60px 0;
  font-size: 3em;
  @media (max-width: 450px) {
    font-size: 8vw;
  }
`;

const WrapperItems = styled.section`
  padding: 60px;
  width: 100%;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  @media (max-width: 550px) {
    padding: 30px;
  }
`;

const LoaderWrapper = styled.div`
  margin: 100px auto;
  color: #fff;
  display: flex;
  justify-content: center;
`;
