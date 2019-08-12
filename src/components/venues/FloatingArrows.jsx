import React from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../colors";

const bounce = keyframes`
	0% {
		marginTop: 0px;
	} 
	25% {
		marginTop: -10px;
	}
	50% {
		marginTop: -20px;
	}
	75% {
		marginTop: -10px;
	}
	100 % {
		marginTop: 0px;
	}

`;

const Container = styled.div`
	position: absolute;
	bottom: 50px;
	right: 0;
	height: 500px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media (max-width: 860px) {
		height: 250px;
		bottom: 50px;
	}
`;

const Arrow = styled.svg`
	background-color: ${colors.blue};
	border-radius: 100%;
	padding: 10px;
	margin: 10px;
	height: 30px;
	width: 30px;
	color: white;

	&:hover {
		cursor: pointer;
		background-color: transparent;
		color: ${colors.blue};
		animation: ${bounce} 0.6s infinite;
	}
`;

function FloatingArrows(props) {
	function renderComponent() {
		return (
			<Container>
				<Arrow
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="arrow-up"
					className="svg-inline--fa fa-arrow-up fa-w-14"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
				>
					<path
						fill="currentColor"
						d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
					></path>
				</Arrow>
				<Arrow
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="arrow-down"
					className="svg-inline--fa fa-arrow-down fa-w-14"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
				>
					<path
						fill="currentColor"
						d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"
					></path>
				</Arrow>
			</Container>
		);
	}
	return renderComponent();
}

export default FloatingArrows;
