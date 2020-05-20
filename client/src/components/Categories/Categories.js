import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { imgCategories } from "../../constants";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const Categories = () => {
  let categories = useHistory();

  return (
    <>
      <Title>Products categories</Title>

      <WrapperCarousel id={"wrapperCarousel"} data-css="wrapper-categories">
        {imgCategories.map(({ id, src, title, description }) => (
          <CatContainer
            onClick={(ev) => {
              ev.preventDefault();
              categories.push(`/items/filter/${title}`);
            }}
            key={id}
          >
            {/* <Link to={`/items?category=${title}`}> */}
            <img src={window.location.origin + src} alt={description} id={id} />
            {/* </Link> */}
            <CatButton>{title}</CatButton>
          </CatContainer>
        ))}
      </WrapperCarousel>
    </>
  );
};

const WrapperCarousel = styled.div`
  margin: 0 auto;
  padding: 30px;
  width: 100%;
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  @media (max-width: 750px) {
    grid-template-columns: repeat(auto-fill, 1fr);
  }
  /* height: auto; */
`;

const CatContainer = styled.div`
  padding: 20px;
  border: 1px solid #e6ecf0;
  cursor: pointer;
  width: 100%;
  img {
    width: 100%;
  }
`;

const Title = styled.h2`
  margin: 80px 0 50px 0;
  font-size: 1.6em;
  text-align: center;
  font-weight: 400;
`;

const CatButton = styled.button`
  outline: none;
  background-color: red;
  color: white;
  padding: 10px 30px;
  border: 1px solid white;
  font-size: 1em;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
`;

export default Categories;
