import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "../errors/ErrorMessage";
import { colors } from "../../colors";
import Typography from "@material-ui/core/Typography";
import Ellipsis from "../loaders/Ellipsis";

const Container = styled.div`
	border-top: 1px solid ${colors.grey};
	background-color: white;
	color: black;
`;

const Icon = styled.img`
	width: 30px;
	height: 30px;
`;

function VenueDropdown({ venue }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({
		message: "Oops...",
		error: "undefined"
	});
	const [venueDetails, setVenueDetails] = useState(null);

	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_CORS_URL}https://api.foursquare.com/v2/venues/${venue.id}?client_secret=${process.env.REACT_APP_CLIENT_SECRET}&client_id=${process.env.REACT_APP_CLIENT_ID}&v=20190810`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json; charset=utf-8"
				}
			}
		)
			.then(response => response.json())
			.then(data => {
				setVenueDetails(data.response.venue);
				setLoading(false);
			})
			.catch(err => {
				setError({
					message: "Problem fetching venue details",
					error: err.toString()
				});
			});
		return () => {
			setVenueDetails(null);
		};
	}, []);

	function renderComponent() {
		return (
			<Container>
				<Typography variant="h4" gutterBottom>
					{venueDetails.categories ? venueDetails.categories[0].name : null}
				</Typography>

				{venueDetails.location.formattedAddress.map(addrLine => {
					return <p key={addrLine}>{addrLine}</p>;
				})}

				<a href={venueDetails.url}>{venueDetails.url}</a>
				<br />
				<small>{venueDetails.contact.formattedPhone}</small>
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
				<Ellipsis />
			</Container>
		);
	}

	if (loading) {
		return renderLoading();
	} else if (venueDetails) {
		return renderComponent();
	} else {
		return renderError();
	}
}

export default VenueDropdown;
