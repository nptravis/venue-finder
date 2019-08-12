import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";

const Container = styled.div`
	width: 90%;
	margin: 10px auto;
	display: flex;
	height: 30px;
	align-items: center;

	h4 {
		padding: 0 20px 0 0;
		margin: 0;
	}
`;

const CustomSlider = withStyles({
	rail: {
		height: 5,
		opacity: 0.5,
		backgroundColor: "#bfbfbf"
	},
	thumb: {
		height: 28,
		width: 28,
		backgroundColor: "#fff",
		border: "2px solid black",
		marginTop: -12,
		marginLeft: -12
	}
})(Slider);

function RadiusSlider({ radius, setRadius, setRefreshVenues }) {
	function renderComponent() {
		return (
			<Container>
				<h4>Distance (m)</h4>
				<CustomSlider
					defaultValue={radius}
					valueLabelDisplay="auto"
					min={250}
					max={10000}
					onChangeCommitted={e => setRefreshVenues(true)}
					getAriaValueText={e => setRadius(e)}
				/>
			</Container>
		);
	}
	return renderComponent();
}

export default RadiusSlider;
