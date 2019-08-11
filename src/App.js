import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "./components/errors/ErrorMessage";
import MapContainer from "./components/map/MapContainer";
import VenueList from "./components/venues/VenueList";

const Container = styled.div`
  text-align: center;
`;

const FlexContainer = styled.div`
  display: flex;
  height: 600px;
  width: 100vw;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

function App(props) {
  // Variables and State ////////////////////////////////////////////////////
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ message: "Hmm...", error: "undefined" });
  const [venues, setVenues] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [position, setPosition] = useState(null);

  // componentDidMount ////////////////////////////////////////////////////
  useEffect(() => {
    // get location of user
    // fetch venues from FourSquare
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(position => {
        fetch(
          `https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v2/venues/search?ll=${position.coords.latitude},${position.coords.longitude}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&v=20190810`,
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
            setPosition(position.coords);
            setVenues(data.response.venues);
            setLoading(false);
          })
          .catch(err => {
            setError({ message: "That is an error", error: err.toString() });
            setLoading(false);
          });
      });
    };

    fetchData();
  }, []);

  // Render Component ////////////////////////////////////////////////////
  if (loading) {
    return renderLoading();
  } else if (position && venues) {
    console.log(venues);
    return renderComponent();
  } else {
    return renderError();
  }

  // Render Functions ////////////////////////////////////////////////////

  function renderComponent() {
    return (
      <Container>
        <h1>Venue Finder</h1>
        <FlexContainer>
          <MapContainer
            venues={venues}
            position={position}
            setSelectedVenue={setSelectedVenue}
            selectedVenue={selectedVenue}
          />
          <VenueList
            venues={venues}
            selectedVenue={selectedVenue}
            setSelectedVenue={setSelectedVenue}
          />
        </FlexContainer>
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

export default App;
