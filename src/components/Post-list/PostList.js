import React from "react";
import './PostList.css'
import PostListItem from "../Post-list-item/PostListItem";
import {ListGroup} from "reactstrap";

const PostList = ({postData, onDeleted, onToggleLike, onToggleImportant}) => {
    const elements = postData.map(item => {
        const {id, ...itemPost} = item;
        if (checkObject(item)) {
            return (
                <li className="list-group-item" key={id}>
                    <PostListItem {...itemPost}
                                  onDelete={() => onDeleted(id)}
                                  onToggleLike={() => onToggleLike(id)}
                                  onToggleImportant={() => onToggleImportant(id)}/>
                </li>
            )
        } else {
            return null;
        }
    })

    function checkObject(obj) {
        if (typeof obj === 'object') {
            return !!obj.label
        }
    }

    return (
        <ListGroup className="app-list list-group">
            {elements}
        </ListGroup>
    )
}

export default PostList;
