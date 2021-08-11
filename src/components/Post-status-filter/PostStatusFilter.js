import React, {Component} from "react";
import './PostStatusFilter.css'

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Понравилось'},
        ];
    }

    render() {
        const {filter, filterSelect} = this.props
        const buttons = this.buttons.map(({name, label}) => {
            const active = filter === name;
            const classActive = active ? 'btn-info' : 'btn-outline-secondary'
            return (<button key={name} type="button" className={`btn ${classActive}`} onClick={() => filterSelect(name)}>{label}</button>)
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}
