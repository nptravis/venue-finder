import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { colors } from "../../colors";

const Container = styled.div`
	width: 90%;
	margin: 10px auto;
	display: flex;
	height: 30px;
	align-items: center;
`;

const CustomSlider = withStyles({
	root: {
		marginLeft: 20
	},
	rail: {
		height: 5,
		opacity: 0.5,
		backgroundColor: "#bfbfbf"
	},
	track: {
		height: 5,
		backgroundColor: colors.blue
	},
	thumb: {
		height: 28,
		width: 28,
		backgroundColor: "#fff",
		border: "2px solid " + colors.blue,
		marginTop: -12,
		marginLeft: 0
	},
	focusVisible: {
		opacity: 0.5,
		color: colors.blue
	},
	valueLabel: {
		marginLeft: 12,
		color: colors.blue
	}
})(Slider);

function RadiusSlider({ radius, setRadius, setRefreshVenues }) {
	function renderComponent() {
		return (
			<Container>
				<Typography variant="body1" nowrap="true">
					How bad?
				</Typography>
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
