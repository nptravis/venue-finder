import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "../errors/ErrorMessage";

const Container = styled.div`
	border: 1px solid black;
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
	}, []);

	function renderComponent() {
		return (
			<Container>
				<h1>{venueDetails.name}</h1>
				<h4>
					{venueDetails.categories ? venueDetails.categories[0].name : null}
				</h4>

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
				<h1>Loading...</h1>
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

// allowMenuUrlEdit: true
// attributes: {groups: Array(1)}
// beenHere: {count: 0, unconfirmedCount: 0, marked: false, lastCheckinExpiredAt: 0}
// bestPhoto: {id: "5949fd5e9d6a191e64e41886", createdAt: 1498021214, source: {…}, prefix: "https://fastly.4sqi.net/img/general/", suffix: "/1328204_zIYilnIBC0PU3q33lXbeeedVJD7n1t-e-5F-V9KJnnY.jpg", …}
// canonicalUrl: "https://foursquare.com/v/kruidvat/4b5af532f964a5203cdc28e3"
// categories: [{…}]
// contact: {twitter: "kruidvatservice"}
// createdAt: 1264252210
// dislike: false
// hereNow: {count: 0, summary: "Nobody here", groups: Array(0)}
// id: "4b5af532f964a5203cdc28e3"
// inbox: {count: 0, items: Array(0)}
// likes: {count: 0, groups: Array(0)}
// listed: {count: 0, groups: Array(1)}
// location: {address: "Van Woustraat 102", lat: 52.354456211276045, lng: 4.901511725289295, labeledLatLngs: Array(1), cc: "NL", …}
// name: "Kruidvat"
// ok: false
// pageUpdates: {count: 0, items: Array(0)}
// photos: {count: 2, groups: Array(2), summary: "0 photos"}
// reasons: {count: 0, items: Array(0)}
// shortUrl: "http://4sq.com/aDJiZF"
// specials: {count: 0, items: Array(0)}
// stats: {tipCount: 0}
// timeZone: "Europe/Amsterdam"
// tips: {count: 0, groups: Array(1)}
// url: "https://www.kruidvat.nl"
// verified: false;
