import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Item = ({ item, numOwned, handleClick, index }) => {
    const firstItemRef = useRef(null);
    useEffect(() => {
        console.log(firstItemRef);
        if (index === 0) {
            firstItemRef.current.focus();
        }
    }, []);
    return (
        <StyledDiv ref={firstItemRef} onClick={() => handleClick(item)}>
            <TextBox>
                <h3>{item.name}</h3>
                <p>
                    Cost: {item.cost} cookies. Produces {item.value}{" "}
                    cookie(s)/second
                </p>
            </TextBox>
            <BigNum>
                <div>{numOwned[item.id]}</div>
            </BigNum>
        </StyledDiv>
    );
};

const StyledDiv = styled.button`
    padding: 15px;
    background: #222;
    color: white;
    border: none;
    border-bottom: solid 1px lightgrey;
    margin-bottom: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const BigNum = styled.div`
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 10px 15px;
`;
const TextBox = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    h3 {
        font-size: 18px;
        font-weight: bold;
    }
`;
export default Item;
