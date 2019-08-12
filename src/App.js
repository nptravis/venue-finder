import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "./components/errors/ErrorMessage";
import MapContainer from "./components/map/MapContainer";
import VenueList from "./components/venues/VenueList";
import RadiusSlider from "./components/filters/RadiusSlider";
import Search from "./components/filters/Search";
import Spinner from "./components/loaders/Spinner";
import { colors } from "./colors";
import Typography from "@material-ui/core/Typography";
import FloatingArrows from "./components/venues/FloatingArrows";

const Container = styled.div`
  text-align: center;
  background-color: ${colors.lightGrey};
  height: 100%;
  width: 100%;
  margin-bottom: 50px;

  header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;

    top: 0;
    left: 0;
    width: 100%;
    background-color: ${colors.blue};
    color: white;
    height: 50px;

    svg {
      width: 30px;
      height: 30px;
      margin-right: 20px;

      &:hover {
        cursor: pointer;
      }
    }

    h1 {
      padding: 0;
      margin: 0 0 0 20px;
      line-height: 50px;
      font-size: 2em;
    }
  }

  main {
    padding-top: 100px;
    height: calc(100% - 70px);
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    background-color: ${colors.blue};
    color: white;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  height: 500px;
  width: 100%;
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
  const [radius, setRadius] = useState(250);
  const [refreshVenues, setRefreshVenues] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // componentDidMount ////////////////////////////////////////////////////
  useEffect(() => {
    // get location of user
    // fetch venues from FourSquare

    const fetchData = () => {
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
        <header>
          <Typography variant="h1" component="h1" gutterBottom>
            iNeed
          </Typography>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="hamburger"
            className="svg-inline--fa fa-hamburger fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M464 256H48a48 48 0 0 0 0 96h416a48 48 0 0 0 0-96zm16 128H32a16 16 0 0 0-16 16v16a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64v-16a16 16 0 0 0-16-16zM58.64 224h394.72c34.57 0 54.62-43.9 34.82-75.88C448 83.2 359.55 32.1 256 32c-103.54.1-192 51.2-232.18 116.11C4 180.09 24.07 224 58.64 224zM384 112a16 16 0 1 1-16 16 16 16 0 0 1 16-16zM256 80a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-128 32a16 16 0 1 1-16 16 16 16 0 0 1 16-16z"
            ></path>
          </svg>
        </header>
        <main>
          <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
          <RadiusSlider
            radius={radius}
            setRadius={setRadius}
            setRefreshVenues={setRefreshVenues}
          />
          <FloatingArrows venues={venues} />
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
        </main>
        <footer>Nic Travis &copy; 2019</footer>
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
