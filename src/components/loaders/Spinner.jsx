import React from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../colors";

const spin = keyframes`
	0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}

`;

const Container = styled.div`
	height: 100vh;
	width: 100vw;

	.lds-ring {
		display: inline-block;
		position: relative;
		width: 64px;
		height: 64px;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 51px;
		height: 51px;
		margin: 6px;
		border: 6px solid #fff;
		border-radius: 50%;
		animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #fff transparent transparent transparent;
		background-color: ${colors.blue};
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
`;

function Spinner(props) {
	return (
		<Container>
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</Container>
	);
}

export default Spinner;
