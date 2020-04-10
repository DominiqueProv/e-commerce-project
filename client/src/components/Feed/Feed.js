import React from "react";
import styled from 'styled-components';
import { 
  useParams,
  useLocation,
  } from 'react-router-dom';

import { SmallItem } from '../Items';

const Feed = ({
  // items,
  }) => {
    const [items, setItems] = React.useState([]);
    const params = useLocation()
    React.useEffect(()=>{
      fetch(`/items${params.search}`)
      .then(res=>res.json())
      .then(res=>setItems(res.filtered))
    },[])
    return (
      <Wrapper>
        {items.map((item, index)=><SmallItem key={item.id+index} {...item} />)}
      </Wrapper>
    );
}

export default Feed;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;