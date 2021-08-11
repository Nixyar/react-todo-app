import React, {Component} from "react";
import './SearchPanel.css'

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch(event) {
        const term = event.target.value;
        this.setState({term});
        this.props.updateSearch(term);
    }

    render() {
        return (
            <input className="form-control search-input" type="text" placeholder="Поиск по записям" onChange={this.updateSearch} value={this.state.term}/>
        )
    }
}
