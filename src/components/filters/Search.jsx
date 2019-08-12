import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "../errors/ErrorMessage";
import Spinner from "../loaders/Spinner";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { colors } from "../../colors";

const CustomInput = withStyles({
	underline: {
		color: colors.blue,

		"&:after": {
			borderBottom: "2px solid" + colors.blue
		}
	},
	focused: {
		color: colors.blue
	}
})(Input);

const Container = styled.div`
	text-align: center;

	input[type="text"] {
		width: 200px;
	}

	button {
		margin-left: 20px;
	}
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
					<CustomInput
						type="text"
						onChange={e => setInput(e.target.value)}
						defaultValue={searchTerm}
						placeholder="What do you need?"
					/>
					<Button variant="contained" type="submit">
						I Need It
					</Button>
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
