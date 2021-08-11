import React, {Component} from "react";
import './PostAddForm.css'

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.onValueChange = this.onValueChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onValueChange(evt) {
        this.setState({text: evt.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.text.length !== 0) {
            this.props.addPost(this.state.text);
            this.setState({text: ''})
        }
    }

    render() {
        return (
            <form className='bottom-panel d-flex' onSubmit={this.onSubmit}>
                <input type="text"
                       placeholder="О чём вы думаете сейчас?"
                       className="form-control new-post-label" value={this.state.text} onChange={this.onValueChange}/>
                <button type="submit" className="btn btn-outline-secondary">Добавить</button>
            </form>
        )
    }
}
