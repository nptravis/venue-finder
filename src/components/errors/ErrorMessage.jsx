import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const Container = styled.div`
	color: black;
	background-color: white;
`;

function ErrorMessage({ error }) {
	return (
		<Container>
			<Typography variant="h4">Error</Typography>
			<Typography variant="body1">{error.message}</Typography>
			<Typography variant="body1">{error.error}</Typography>
		</Container>
	);
}

export default ErrorMessage;
