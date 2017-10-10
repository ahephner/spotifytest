import React, {Component} from 'react';
import Button from 'react-bootstrap';

class Search extends Component{
	constructor(props){
		super(props);

		this.state = {term: ''};
	}
	render() {
		return (
			<div className="search-bar">
				<label className="vidSearchLbl">Search Spotify:</label>
				<input value={this.state.term} onChange={(event) => this.onInputChange(event.target.value)} />
				<button className="btn btn-primary" id="button">Search</button>
			</div>
		);
	}
	onInputChange(term){
		this.setState({term});
		this.props.onSearchTermChange(term);
	}
}

export default Search; 