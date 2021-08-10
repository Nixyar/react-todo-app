import React from "react";
import './PostAddForm.css'

const PostAddForm = ({addPost}) => {
    return (
        <div className='bottom-panel d-flex'>
            <input type="text" placeholder="О чём вы думаете сейчас?" className="form-control new-post-label"/>
            <button type="submit" className="btn btn-outline-secondary" onClick={() => addPost('Hello')}>Добавить</button>
        </div>
    )
}

export default PostAddForm;
