import React from "react";
import './PostStatusFilter.css'
import {Button} from "react-bootstrap";

const PostStatusFilter = () => {
    return (
        <div className="btn-group">
            <Button color='info'>Все</Button>
            <button type="button" className="btn btn-outline-secondary">Понравилось</button>
        </div>
    )
}

export default PostStatusFilter;
