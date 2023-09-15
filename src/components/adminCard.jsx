import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCard = ({ post, deletePost, openModal }) => {
    return (
        <>
            <div className="col-lg-4 col-md-6 col-sm-12 g-4">
                <div className="card">
                    <img src={post.imgLink} width={200} height={100} className="card-img-top" alt={post.title} />
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <div className="card-icons">
                            <button onClick={() => {
                                deletePost(post._id)
                            }}>
                                <i className="far fa-trash-can"></i> Delete
                            </button>
                            <button onClick={() => {
                                openModal(post._id)
                            }}>
                                <i className="far fa-edit"></i> Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminCard;
