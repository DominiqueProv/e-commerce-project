import React from "react";
import styled from "styled-components";
import { imgCategories } from "../../constants";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MenuBigItem = () => {
  let history = useHistory();
  const location = useLocation();
  let active = location.search;
  active = active.replace("?category=", "");
  const linkToCategory = (ev, title) => {
    ev.preventDefault();
    ev.stopPropagation();
    history.push(`/items/filter/${title}`);
  };

  const filterMenu = useSelector((state) => state.data.typeaheadItems);

  return (
    <WrapperSideBar>
      <MenuCat>
        <CatTitle>Categories</CatTitle>
        <WrapperCatList>
          {imgCategories.map(({ title }) => (
            <CatList
              key={title}
              style={{ backgroundColor: active === title && "#F4F7F6" }}
              onClick={(ev) => linkToCategory(ev, title)}
            >
              {title}
            </CatList>
          ))}
        </WrapperCatList>
      </MenuCat>
      <FilterDropDown>
        <form>
          <select
            onChange={(ev) => {
              ev.preventDefault();
              history.push(`/items/filter/${ev.target.value}`);
            }}
          >
            <option defaultValue="">Category</option>
            <option value="Fitness">Fitness</option>
            <option value="Gaming">Gaming</option>
            <option value="Industrial">Industrial</option>
            <option value="Medical">Medical</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </form>
      </FilterDropDown>
    </WrapperSideBar>
  );
};

const FilterDropDown = styled.div`
  display: none;

  @media (max-width: 950px) {
    display: flex;
    width: 100%;
    padding: 30px 30px;

    form {
      display: flex;
      /* justify-content: space-between; */
      width: 100%;
      select {
        display: inline-block;
        font-size: 16px;
        font-family: Roboto;
        font-weight: 700;
        color: #444;
        outline: none;
        line-height: 1.3;
        padding: 0.6em 1.4em 0.5em 0.8em;
        width: 100%;
        max-width: 35%;
        box-sizing: border-box;
        margin-right: 20px;
        border: 1px solid #e6ecf0;
        /* box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04); */
        /* border-radius: 0.5em; */
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
          linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
        background-repeat: no-repeat, repeat;
        background-position: right 0.7em top 50%, 0 0;
        background-size: 0.65em auto, 100%;
      }
    }
  }
`;

const WrapperSideBar = styled.div`
  width: 300px;
  border-right: 1px solid #e6ecf0;
  height: fit-content;
  @media (max-width: 950px) {
    width: 100%;
    border-right: none;
  }
`;
const MenuCat = styled.div`
  @media (max-width: 950px) {
    display: flex;
  }
  @media (max-width: 950px) {
    display: none;
  }
`;

const CatTitle = styled.h3`
  font-size: 1.2rem;
  background-color: #f4f7f6;
  padding: 20px 30px;
  border-bottom: 1px solid #e6ecf0;
`;
const WrapperCatList = styled.div`
  list-style: none;
`;

const CatList = styled.li`
  padding: 20px 0;
  border-bottom: 1px solid #e6ecf0;
  cursor: pointer;
  padding: 15px 30px;
  transition: all 0.1s ease-in;
  @media (max-width: 950px) {
    width: 100%;
    height: 60px;
    padding: 22px 10px;
    border-bottom: 0px;
  }
  &:hover {
    background-color: #f4f7f6;
  }
`;

export default MenuBigItem;
