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
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({
		message: "Oops...",
		error: "undefined"
	});

	useEffect(() => {
		if (venue.categories.length > 0) {
			// if there is a category attached to to venue, fetch teh category image
			let urlString =
				process.env.REACT_APP_CORS_URL +
				venue.categories[0].icon.prefix +
				32 +
				venue.categories[0].icon.suffix;
			fetch(urlString, {
				method: "GET",
				headers: {
					"Content-Type": "image/png",
					Accept: "image/png"
				}
			})
				.then(response => response.blob())
				.then(blob => {
					const imageUrl = URL.createObjectURL(blob);
					URL.revokeObjectURL(imageUrl);
					setImage(imageUrl);
					setLoading(false);
				})
				.catch(err => {
					setError({
						message: "Problem fetching image.",
						error: err.toString()
					});
					setLoading(false);
				});
		} else {
			setImage(require("../../images/default-venue.svg"));
			setLoading(false);
		}
	}, [venue]);

	function renderComponent() {
		return (
			<Container>
				<h1>{venue.name}</h1>
				<Icon src={image} />
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
	} else if (image) {
		console.log(image);
		return renderComponent();
	} else {
		return renderError();
	}
}

export default VenueDropdown;

// categories: Array(1)
// 0:
// icon:
// prefix: "https://ss3.4sqi.net/img/categories_v2/education/communitycollege_"
// suffix: ".png"
