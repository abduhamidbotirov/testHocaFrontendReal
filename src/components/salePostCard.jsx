import React from 'react';

const SalePostCard = ({ post }) => {
    return (
        <>
            <div className="col-lg-4 col-md-4 col-sm-6 g-2">
                <div className="card">
                    <img src={post.imgLink} className="card-img-top" alt="Post Image" />
                    <div className="card-header bg-green">
                        sold product
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Price: {post.price}</h5>
                        <p className="card-text">User Email: {post.userId.email}</p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SalePostCard;
