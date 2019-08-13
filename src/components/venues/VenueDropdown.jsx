import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "../errors/ErrorMessage";
import { colors } from "../../colors";
import Typography from "@material-ui/core/Typography";
import Ellipsis from "../loaders/Ellipsis";

const Container = styled.div`
	background-color: white;
	color: black;
	padding: 10px;

	svg {
		height: 20px;
		width: 20px;
	}
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
				<Typography variant="subtitle1">
					<span>
						{venueDetails.categories.length > 0
							? venueDetails.categories[0].name
							: null}
					</span>
				</Typography>
				{venueDetails.location.formattedAddress.map(addrLine => {
					return (
						<Typography key={addrLine} variant="caption">
							<span>{addrLine}</span>
							<br />
						</Typography>
					);
				})}

				<a href={venueDetails.url}>{venueDetails.url}</a>
				<br />
				<small>{venueDetails.contact.formattedPhone}</small>
				<br />
				<svg
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="thumbs-up"
					className="svg-inline--fa fa-thumbs-up fa-w-16"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						fill={colors.blue}
						d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
					></path>
				</svg>
				<span style={{ marginLeft: 10 }}>{venueDetails.likes.count} likes</span>
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
		console.log(venueDetails);
		return renderComponent();
	} else {
		return renderError();
	}
}

export default VenueDropdown;
