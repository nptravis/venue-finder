import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	GoogleMap,
	LoadScript,
	Marker,
	Circle,
	InfoWindow
} from "@react-google-maps/api";
import Popup from "reactjs-popup";

const Container = styled.div`
	flex: 1;
	height: 100%;
`;
function MapContainer({ position, venues, selectedVenue, setSelectedVenue }) {
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
				{/*<form onSubmit={e => setLocation(userInput)}>
					<input type="text" onChange={e => setUserInput(e.target.value)} />
				</form>*/}
				<LoadScript
					id="script-loader"
					googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
				>
					<GoogleMap
						id="example-map"
						mapContainerStyle={{
							height: "100%",
							width: "100%"
						}}
						zoom={15}
						center={{
							lat: position.latitude,
							lng: position.longitude
						}}
					>
						<Circle
							center={{
								lat: position.latitude,
								lng: position.longitude
							}}
							// required
							options={{
								strokeColor: "#FF0000",
								strokeOpacity: 0.8,
								strokeWeight: 2,
								fillColor: "#FF0000",
								fillOpacity: 0.35,
								clickable: false,
								draggable: true,
								editable: false,
								visible: true,
								radius: 1000,
								zIndex: 1
							}}
						></Circle>
						{venues.map(venue => {
							return (
								<Marker
									key={venue.id}
									position={{
										lat: venue.location.lat,
										lng: venue.location.lng
									}}
									onClick={() => {
										setSelectedVenue(venue.id);
									}}
								>
									{selectedVenue === venue.id && (
										<InfoWindow
											position={{
												lat: venue.location.lat + 0.001,
												lng: venue.location.lng
											}}
										>
											<div>
												<h4>{venue.name}</h4>
											</div>
										</InfoWindow>
									)}
								</Marker>
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
