import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

const items = [
    { id: "cursor", name: "Cursor", cost: 10, value: 1 },
    { id: "grandma", name: "Grandma", cost: 100, value: 10 },
    { id: "farm", name: "Farm", cost: 1000, value: 80 }
];
const calculateCookiesPerTick = purchasedItems => {
    let tick = 0;
    items.forEach(item => {
        tick += purchasedItems[item.id] * item.value;
    });
    return tick;
};

const Game = () => {
    // TODO: Replace this with React state!
    const [numCookies, setNumCookies] = useState(1000);
    const [purchasedItems, setPurchasedItems] = useState({
        cursor: 0,
        grandma: 0,
        farm: 0
    });
    const handleClick = item => {
        console.log("clicked!");
        if (numCookies < item.cost) {
            alert(`You can't afford ${item.name}!`);
            return;
        } else {
            setNumCookies(numCookies - item.cost);
            let tempItemObj = purchasedItems;
            tempItemObj[item["id"]]++;
            setPurchasedItems({
                ...purchasedItems,
                [item["id"]]: purchasedItems[item["id"]]++
            });
            console.log(purchasedItems);
        }
    };
    useInterval(() => {
        const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
        setNumCookies(numCookies + numOfGeneratedCookies);
    }, 1000);
    useEffect(() => {
        document.title = `${numCookies} cookies`;

        return () => {
            document.title = `Cookie Clicker Workshop`;
        };
    }, [numCookies]);
    function handleKeydown(ev) {
        console.log(ev.code);
        if (ev.code === "Space") {
            ev.preventDefault();
            setNumCookies(numCookies + 1);
        }
    }
    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    });
    // why doesn't this work with an empty array?
    // const refFunc (childRef) => {

    // }

    // useEffect(() => {
    //     firstItemRef.current.focus();
    // }, []);
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
                <Button onClick={() => setNumCookies(numCookies + 1)}>
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
