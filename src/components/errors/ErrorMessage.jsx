import React from "react";
import styled from "styled-components";

const Container = styled.div`
	border: 1px solid black;
`;

function ErrorMessage({ error }) {
	function renderComponent() {
		return (
			<Container>
				<h1>Error</h1>
				<p>{error.message}</p>
				<p>{error.error}</p>
			</Container>
		);
	}
	return renderComponent();
}

export default ErrorMessage;
