import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VenueDropdown from "./VenueDropdown";
import ErrorMessage from "../errors/ErrorMessage";
import { colors } from "../../colors";

const Container = styled.div`
	text-align: left;
	overflow: auto;
	flex: 1;
	height: 100%;

	ul {
		margin: 0;
		padding: 0;
		li {
			margin: 0;
			padding: 5px;
			list-style: none;
			border: 2px solid ${colors.grey};
			background-color: ${colors.lightGrey};
			&.selected {
				cursor: default;
				background-color: ${colors.blue};
			}
			&:hover {
				cursor: pointer;
				background-color: ${colors.blue};
			}
		}
	}
`;

function VenueList({ venues, selectedVenue, setSelectedVenue }) {
	// Variables and State ////////////////////////////////////////////////////
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// componentDidMount ////////////////////////////////////////////////////
	useEffect(() => {
		setLoading(false);
	}, []);

	// Render Component ////////////////////////////////////////////////////
	if (loading) {
		return renderLoading();
	} else if (venues) {
		return renderComponent();
	} else {
		return renderError();
	}

	// Render Functions ////////////////////////////////////////////////////

	function renderComponent() {
		return (
			<Container>
				<ul>
					{venues.map(venue => {
						return (
							<li
								key={venue.id}
								className={selectedVenue === venue.id ? "selected" : ""}
								onClick={() => setSelectedVenue(venue.id)}
								id={venue.id}
							>
								<div>{venue.name}</div>
								{selectedVenue === venue.id && <VenueDropdown venue={venue} />}
							</li>
						);
					})}
				</ul>
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
				<h1>Loading...</h1>
			</Container>
		);
	}
}

export default VenueList;
