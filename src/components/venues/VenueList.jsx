import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
	border: 1px solid black;
	overflow: auto;
	flex: 1;
	height: 100%;

	ul {
		li {
			&.selected {
				border: 1px solid red;
				color: red;
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
				<h1>VenueList Component</h1>
				<ul>
					{venues.map(venue => {
						return (
							<li
								key={venue.id}
								className={selectedVenue === venue.id ? "selected" : ""}
								onClick={() => setSelectedVenue(venue.id)}
							>
								<div>{venue.name}</div>
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
				<h1>Error</h1>
				<p>{error}</p>
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
