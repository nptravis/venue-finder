import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "../errors/ErrorMessage";
import Spinner from "../loaders/Spinner";

const Container = styled.div`
	border: 1px solid black;
`;

function Search({ searchTerm, setSearchTerm }) {
	// Variables and State ////////////////////////////////////////////////////
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({
		message: "Problem in the Search Component.",
		error: "undefined"
	});
	const [input, setInput] = useState("");

	// componentDidMount ////////////////////////////////////////////////////
	useEffect(() => {
		setLoading(false);
	}, []);

	// Render Component ////////////////////////////////////////////////////
	if (loading) {
		return renderLoading();
	} else if (true) {
		return renderComponent();
	} else {
		return renderError();
	}

	// Render Functions ////////////////////////////////////////////////////

	function renderComponent() {
		return (
			<Container>
				<form
					onSubmit={e => {
						e.preventDefault();
						setSearchTerm(input);
					}}
				>
					<input
						type="text"
						onChange={e => setInput(e.target.value)}
						defaultValue={searchTerm}
					/>
					<input type="submit" value="Search" placeholder="i.e. tacos" />
				</form>
			</Container>
		);
	}

	function renderError() {
		return (
			<Container>
				<ErrorMessage error={error} />
			</Container>
		);
	}

	function renderLoading() {
		return (
			<Container>
				<Spinner />
			</Container>
		);
	}
}

export default Search;
