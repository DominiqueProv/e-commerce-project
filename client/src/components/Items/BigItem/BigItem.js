import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import MenuBigItem from "../../MenuBigItem";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RatingStars from "../../RatingStars";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ip } from "../../../constants";
import { Link, useParams } from "react-router-dom";

import { addItemToCart } from "../../../Redux/actions";

const BigItem = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [company, setCompany] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${ip}/items/${itemId}`)
      .then((res) => res.json())
      .then((payload) => {
        setItem(payload);
        fetch(`${ip}/companies/${payload.item.companyId}`).then((res) =>
          res.json().then((data) => {
            setCompany(data);
          })
        );
      });
  }, [itemId]);

  let product, manufacturer;
  if (item && item.item && company && company.company) {
    product = item.item;
    manufacturer = company.company;
  }

  return (
    <>
      <Wrapper data-css="Content">
        <MenuBigItem />
        {item && item.item && company && company.company ? (
          <WrapperContent data-css="Wrapper-content">
            <ImageWrapper data-css="Image-wrapper">
              <ItemImage src={product.imageSrc} />
            </ImageWrapper>
            <InfoWrapper data-css="info-wrapper">
              <ProductName>{product.name}</ProductName>
              <h4>
                Model: <span> {product.id}</span>
              </h4>
              <Category>{product.category}</Category>
              <br />
              <ItemCart>
                <div>
                  <h2>{product.price}</h2>
                  <h3>Item stock: {product.numInStock}</h3>
                  <AddToCartButton
                    onClick={() => dispatch(addItemToCart(product))}
                  >
                    <AddCircleOutlineIcon
                      style={{ paddingRight: "20px", margin: "0" }}
                    />
                    Add to Cart
                  </AddToCartButton>
                </div>
                <div>
                  <RatingStars />
                  <h5>Made by: {manufacturer.name}</h5>
                  <h4>
                    <a href={manufacturer.url} target="_blank">
                      Visit the manufacturer site
                    </a>
                  </h4>
                </div>
              </ItemCart>
            </InfoWrapper>
          </WrapperContent>
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

export default BigItem;

const Wrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  width: 100%;
  min-height: calc(100vh - 230px);
  @media (max-width: 1130px) {
    height: auto;
  }
  @media (max-width: 950px) {
    flex-direction: column;
  }
`;

const WrapperContent = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  @media (max-width: 1130px) {
    flex-direction: column;
    width: 80%;
    flex-direction: flex-start;
    /* height: 100%; */
  }
  @media (max-width: 700px) {
    margin: 0;
    width: 100%;
    padding: 0 30px;
  }
`;

const ProductName = styled.h2`
  font-size: 1.5em;
  line-height: 1.2em;
  padding-bottom: 10px;
`;

const Category = styled.div`
  display: inline-block;
  font-size: 1em;
  padding: 5px;
  margin: 15px 0;
  border-radius: 4px;
  background: red;
  color: white;
`;

const ItemCart = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 24px;
  margin-top: 50px;
  @media (max-width: 1130px) {
    flex-direction: column;
    align-items: flex-start;
  }
  div {
    width: 50%;
    @media (max-width: 700px) {
      width: 100%;
    }
  }
  h2 {
    margin-bottom: 15px;
  }
  h3 {
    font-size: 0.8em;
    font-weight: 400;
    padding-bottom: 15px;
  }
  h4 {
    margin-top: 25px;
    font-weight: 400;
    padding-bottom: 5px;
    font-size: 0.6em;
    text-decoration: underline;
  }
  h5 {
    font-weight: 400;
    font-size: 0.6em;
  }
`;
const InfoWrapper = styled.div`
  margin: 60px 60px 60px 0;
  padding: 60px;
  border: 1px solid #e6ecf0;
  height: 440px;
  h4 {
    font-weight: 400;
  }
  @media (max-width: 1130px) {
    border: 1px solid #e6ecf0;
    margin-top: 0;
    margin-left: 60px;
    width: 80%;
    height: auto;
  }
  @media (max-width: 700px) {
    margin: -5px 0 50px 0;
    width: 100%;
  }
`;

const ItemImage = styled.img`
  margin: 60px 0 60px 60px;
  padding: 60px;
  width: 440px;
  height: 440px;
  border: 1px solid #e6ecf0;
  border-right: none;

  @media (max-width: 1130px) {
    border: 1px solid #e6ecf0;
    border-bottom: 0;
    margin-bottom: 0;
    width: 80%;
    height: auto;
    margin-bottom: -5px;
  }
  @media (max-width: 700px) {
    margin: 0;
    width: 100%;
  }
`;

const AddToCartButton = styled.button`
  outline: none;
  /* margin: 15px 0; */
  /* padding: 10px 30px; */
  font-size: 0.8em;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  &:hover {
    /* background-color: #e8e8e8; */
  }
`;

const LoaderWrapper = styled.div`
  margin: 100px auto;
  color: #fff;
  display: flex;
  justify-content: center;
  height: calc(100vh - 480px);
`;

const ImageWrapper = styled.div`
  @media (max-width: 700px) {
    width: 100%;
  }
`;
