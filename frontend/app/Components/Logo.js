import React from "react";
import styled from "styled-components";

const Logo = () => {
  return (
    <StyledWrapper>
      <button>
        <span className="box">ThoughtVerse</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .box {
    width: 160px; /* Increased width */
    height: 50px; /* Set a fixed height */
    line-height: 50px; /* Align text properly */
    display: inline-block;
    text-align: center;
    margin: 0 5px;
    background: transparent;
    text-transform: uppercase;
    font-weight: 900;
    padding: 5px 10px 5px 5px ; /* Added more padding */
    overflow: hidden; /* Necessary for animation */
    position: relative;
    white-space: nowrap; /* Prevents text from breaking */
  }

  .box:before {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    height: 4px;
    width: 100%;
    border-bottom: 4px solid transparent;
    border-left: 4px solid transparent;
    box-sizing: border-box;
    transform: translateX(100%);
  }

  .box:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    border-top: 4px solid transparent;
    border-right: 4px solid transparent;
    box-sizing: border-box;
    transform: translateX(-100%);
  }

  .box:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }

  .box:hover:before {
    border-color: #262626;
    height: 100%;
    transform: translateX(0);
    transition: 0.3s transform linear, 0.3s height linear 0.3s;
  }

  .box:hover:after {
    border-color: #262626;
    height: 100%;
    transform: translateX(0);
    transition: 0.3s transform linear, 0.3s height linear 0.5s;
  }

  button {
    color: black;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
  }
`;

export default Logo;
