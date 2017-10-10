import axios from 'axios';

import GET_ALBUMS from './types';

const spotifyUrl = 'https://api.spotify.com/v1/search?query=album:'

export function findAlbums(props) {
	return function(dispatch) {
		axios.get(`${spotifyUrl} + props.term`)
		.then(request => {
			console.log('find albums check')
			dispatch({
				type: GET_ALBUMS,
				payload: request
			})
		})
		.catch(response => dispatch(authError("Bad login info")))
	}
}