import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const Container = styled.div``;

function ErrorMessage({ error }) {
	function renderComponent() {
		return (
			<Container>
				<Typography variant="h4">Error</Typography>
				<Typography variant="body1">{error.message}</Typography>
				<Typography variant="body1">{error.error}</Typography>
			</Container>
		);
	}
	return renderComponent();
}

export default ErrorMessage;
