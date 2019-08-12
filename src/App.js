import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "./components/errors/ErrorMessage";
import MapContainer from "./components/map/MapContainer";
import VenueList from "./components/venues/VenueList";
import RadiusSlider from "./components/venues/RadiusSlider";
import Search from "./components/venues/Search";
import Spinner from "./components/loaders/Spinner";
import { colors } from "./colors";

const Container = styled.div`
  text-align: center;
  background-color: ${colors.lightGrey};
  height: 100vh;
  width: 100vw;

  h1 {
    font-size: 3em;
    padding: 20px 0;
    margin: 0;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  height: 600px;
  width: 100vw;
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

function App(props) {
  // Variables and State ////////////////////////////////////////////////////
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    message: "Problem in App.js file.",
    error: "undefined"
  });
  const [venues, setVenues] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(15);
  const [refreshVenues, setRefreshVenues] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // componentDidMount ////////////////////////////////////////////////////
  useEffect(() => {
    // get location of user
    // fetch venues from FourSquare

    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(position => {
        fetch(
          `${process.env.REACT_APP_CORS_URL}https://api.foursquare.com/v2/venues/search?ll=${position.coords.latitude},${position.coords.longitude}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&v=20190810&intent=browse&radius=${radius}&query=${searchTerm}`,
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
            setRefreshVenues(false);
            setLoading(false);
          })
          .catch(err => {
            setError({ message: "That is an error", error: err.toString() });
            setLoading(false);
          });
      });
    };

    fetchData();
  }, [refreshVenues, searchTerm]);

  // Render Component ////////////////////////////////////////////////////
  if (loading) {
    return renderLoading();
  } else if (position && venues) {
    return renderComponent();
  } else {
    return renderError();
  }

  // Render Functions ////////////////////////////////////////////////////

  function renderComponent() {
    return (
      <Container>
        <h1>iNeed</h1>
        <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <RadiusSlider
          radius={radius}
          setRadius={setRadius}
          setRefreshVenues={setRefreshVenues}
        />
        <FlexContainer>
          <MapContainer
            venues={venues}
            position={position}
            setSelectedVenue={setSelectedVenue}
            selectedVenue={selectedVenue}
            radius={radius}
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
        <Spinner />
      </Container>
    );
  }
}

export default App;
