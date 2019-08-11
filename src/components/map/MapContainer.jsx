import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Container = styled.div``;

function MapContainer({ position, venues }) {
	// Variables and State ////////////////////////////////////////////////////
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [location, setLocation] = useState("Brooklyn,NY");
	const [userInput, setUserInput] = useState(null);

	// componentDidMount ////////////////////////////////////////////////////
	useEffect(() => {
		// fetch from foursquare
		navigator.geolocation.getCurrentPosition(position => {
			console.log(position);
		});

		setLoading(false);
	}, []);

	// Conditional Rendering ////////////////////////////////////////////////////
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
				<h1>MapContainer Component</h1>
				<form onSubmit={e => setLocation(userInput)}>
					<input type="text" onChange={e => setUserInput(e.target.value)} />
				</form>
				<LoadScript
					id="script-loader"
					googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
				>
					<GoogleMap
						id="example-map"
						mapContainerStyle={{
							height: "400px",
							width: "800px"
						}}
						zoom={15}
						center={{
							lat: position.latitude,
							lng: position.longitude
						}}
					>
						{venues.map(venue => {
							return (
								<Marker
									key={venue.id}
									position={{
										lat: venue.location.lat,
										lng: venue.location.lng
									}}
									onClick={() => console.log("clicked")}
								/>
							);
						})}
					</GoogleMap>
				</LoadScript>
			</Container>
		);
	}

	function renderError() {
		return (
			<div>
				<h1>Oops...sorry about that, try a refresh?</h1>
			</div>
		);
	}

	function renderLoading() {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}
}

export default MapContainer;
