import _ from 'lodash';
import axios from 'axios'
import React, { Component } from 'react';
import Search from './search';

const spotifyUrl = 'https://api.spotify.com/v1/search?query=album:'

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			albums: [],
			selectedAlbum: null
		};
		this.albumSearch('one');
	}

	albumSearch(term) {
		axios.get(`${spotifyUrl}` + term)
		.then(albums => {
			console.log(albums)
			console.log('find albums check')
			this.setState({
				albums: albums,
				selectedAlbum: albums[0]
			})
		})
	}

	render() {
		const albumSearch = _.debounce((term)=>{ this.albumSearch(term) }, 300);
		return (
			<div>
				<Search onSearchTermChange={albumSearch} />
			</div>
		)
	}
}

export default SearchResults