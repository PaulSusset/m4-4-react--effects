import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useEffectKey from "../hooks/useEffectKey";
import useUpdateDocTitle from "../hooks/useUpdateDocTitle";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

const items = [
    {
        id: "megaCursor",
        name: "Mega Cursor",
        cost: 10,
        value: 1,
        type: "click"
    },
    { id: "cursor", name: "Cursor", cost: 10, value: 1, type: "tick" },
    { id: "grandma", name: "Grandma", cost: 100, value: 10, type: "tick" },
    { id: "farm", name: "Farm", cost: 1000, value: 80, type: "tick" }
];
const calculateCookiesPerTick = purchasedItems => {
    let tick = 0;
    items.forEach(item => {
        if (item.type === "tick") {
            tick += purchasedItems[item.id] * item.value;
        }
    });
    return tick;
};

const Game = () => {
    // TODO: Replace this with React state!
    const [numCookies, setNumCookies] = useState(1000);
    const [purchasedItems, setPurchasedItems] = useState({
        megaCursor: 0,
        cursor: 0,
        grandma: 0,
        farm: 0
    });
    const handleClick = item => {
        if (numCookies < item.cost) {
            alert(`You can't afford ${item.name}!`);
            return;
        } else {
            setNumCookies(numCookies - item.cost);
            setPurchasedItems({
                ...purchasedItems,
                [item["id"]]: purchasedItems[item["id"]] + 1
            });
            console.log(item["id"]);
            item["cost"] = Math.floor(item["cost"] * 1.12);
        }
    };
    useInterval(() => {
        const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
        setNumCookies(numCookies + numOfGeneratedCookies);
    }, 1000);

    useUpdateDocTitle(`${numCookies} cookies`, `Cookie Clicker Workshop`);
    const incrementCookies = () => {
        setNumCookies(numCookies + 1 + purchasedItems.megaCursor);
        return;
    };
    useEffectKey("Space", incrementCookies);
    return (
        <Wrapper>
            <GameArea>
                <Indicator>
                    <Total>{numCookies} cookies</Total>
                    <strong>
                        {calculateCookiesPerTick(purchasedItems)}
                    </strong>{" "}
                    cookies per second
                </Indicator>
                <Button onClick={() => incrementCookies()}>
                    <Cookie src={cookieSrc} />
                </Button>
            </GameArea>

            <ItemArea>
                <SectionTitle>Items:</SectionTitle>
                {items.map((item, index) => {
                    return (
                        <Item
                            // firstItemRef={firstItemRef}
                            key={item.id}
                            item={item}
                            index={index}
                            numOwned={purchasedItems}
                            handleClick={handleClick}
                            // firstItemRef
                        />
                    );
                })}
            </ItemArea>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
`;
const GameArea = styled.div`
    flex: 1;
    display: grid;
    place-items: center;
`;
const Button = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
`;

const Cookie = styled.img`
    width: 200px;
`;

const ItemArea = styled.div`
    height: 100%;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const SectionTitle = styled.h3`
    text-align: center;
    font-size: 32px;
    color: yellow;
`;

const Indicator = styled.div`
    position: absolute;
    width: 250px;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
`;

const Total = styled.h3`
    font-size: 28px;
    color: lime;
`;

export default Game;
