import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";

const Container = styled.div`
	border: 1px solid black;
`;

function RadiusSlider({ radius, setRadius }) {
	function renderComponent() {
		return (
			<Container>
				<Slider
					defaultValue={radius}
					min={10}
					max={20}
					onChangeCommitted={e => {
						setRadius(parseInt(e.target.getAttribute("aria-valuenow"), 10));
					}}
				/>
			</Container>
		);
	}
	return renderComponent();
}

export default RadiusSlider;
