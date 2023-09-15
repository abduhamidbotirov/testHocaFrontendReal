import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import AdminCard from "../../components/adminCard";
import {Modal} from "react-bootstrap";
import SalePostCard from "../../components/salePostCard";

export const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: "",
    file: null,
  });
  const [formDataUpdate, setFormDataUpdate] = useState({
    title: "",
    desc: "",
    price: "",
    file: null,
  });
  const adminToken = localStorage.getItem("admin");
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const openModal = (id) => {
    getPostId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://hoca-test.onrender.com/api/posts"
      );
      setPosts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Hata:", error);
      setLoading(false);
    }
  };

  const getPostId = async (id) => {
    try {
      const response = await axios.get(
        "https://hoca-test.onrender.com/api/posts/" + id
      );
      setPost(response.data.data);
      setFormDataUpdate({
        title: response.data.data.title,
        desc: response.data.data.desc,
        price: response.data.data.price,
        file: null, // Eski rasmni saqlamaslik uchun
      });
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`https://hoca-test.onrender.com/api/posts/${postId}`, {
        headers: {
          token: `${adminToken}`,
        },
      });
      getPosts();
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataUpdate({ ...formDataUpdate, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleUpdateFileChange = (e) => {
    const file = e.target.files[0];
    setFormDataUpdate({ ...formDataUpdate, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData :", formData);

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("desc", formData.desc);
    formDataObj.append("price", formData.price);
    formDataObj.append("file", formData.file);

    try {
      const response = await axios.post(
        "https://hoca-test.onrender.com/api/posts",
        formDataObj,
        {
          headers: {
            token: `${adminToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Başarıyla gönderildi:", response.data);
      getPosts();
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      // Formni tozalash
      setFormData({
        title: "",
        desc: "",
        price: "",
        file: null,
      });
    }
  };

  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("title", formDataUpdate.title);
    formDataObj.append("desc", formDataUpdate.desc);
    formDataObj.append("price", formDataUpdate.price);
    formDataObj.append("file", formDataUpdate.file);

    try {
      const response = await axios.put(
        "https://hoca-test.onrender.com/api/posts/" + id,
        formDataObj,
        {
          headers: {
            token: `${adminToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Başarıyla güncellendi:", response.data);
      getPosts();
      closeModal(); // Modalni yopish
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      // Formni tozalash
      setFormDataUpdate({
        title: "",
        desc: "",
        price: "",
        file: null,
      });
    }
  };

  const [salePosts, setSalePosts] = useState([]);

  useEffect(() => {
    getSalePosts();
  }, []);

  const getSalePosts = async () => {
    try {
      const response = await axios.get(
        "https://hoca-test.onrender.com/api/posts/sale/posts",
        {
          headers: {
            token: `${adminToken}`,
          },
        }
      );
      setSalePosts(response.data.data);
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  return (
    <div className="container forBtn">
      {/* Modal ochilganda modal oynasi */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleUpdateSubmit(e, post._id)}>
            {/* Title input */}
            <div className="mb-3 allInputs">
              <label htmlFor="updateTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="updateTitle"
                name="title"
                value={formDataUpdate.title}
                onChange={handleUpdateInputChange}
              />
            </div>

            {/* Description input */}
            <div className="mb-3">
              <label htmlFor="updateDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="updateDescription"
                name="desc"
                value={formDataUpdate.desc}
                onChange={handleUpdateInputChange}
              />
            </div>

            {/* Price input */}
            <div className="mb-3">
              <label htmlFor="updatePrice" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="updatePrice"
                name="price"
                value={formDataUpdate.price}
                onChange={handleUpdateInputChange}
              />
            </div>

            {/* Img upload input */}
            <div className="mb-3">
              <label htmlFor="updateFile" className="form-label">
                Img Upload
              </label>
              <input
                type="file"
                className="form-control"
                id="updateFile"
                name="file"
                onChange={handleUpdateFileChange}
              />
            </div>

            {/* Update button */}
            <button type="submit" className="form-control btn btn-info mt-4">
              Update
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Yaratish formi */}
      <form onSubmit={handleSubmit} className="form-control p-5">
        <h2 className="fs-2 text-center">Create POST</h2>
        <div>
          <label htmlFor="title" className=" mt-3 fs-4">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control  p-2"
            onChange={handleInputChange}
            value={formData.title}
          />
        </div>
        <div>
          <label htmlFor="desc" className=" mt-3 fs-4">
            Description:
          </label>
          <textarea
            id="desc"
            name="desc"
            className="form-control  p-2"
            onChange={handleInputChange}
            value={formData.desc}
          />
        </div>
        <div>
          <label htmlFor="price" className=" mt-3 fs-4">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="form-control  p-2"
            onChange={handleInputChange}
            value={formData.price}
          />
        </div>
        <div>
          <label htmlFor="file" className=" mt-3 fs-4">
            Img Upload
          </label>
          <input
            type="file"
            id="file2"
            name="file"
            className="form-control p-2"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="form-control btn btn-info mt-4">
          Submit
        </button>
      </form>

      {/* DELETE va UPDATE kartalari */}
      {loading ? (
        <div className="text-center mt-5">Loading...</div>
      ) : (
        <div className=" mt-4">
          <h2 className="text-center">DELETE and UPDATE cards</h2>
          <div className="row">
            {posts.map((post) => (
              <AdminCard
                post={post}
                key={post._id}
                deletePost={deletePost}
                openModal={openModal}
              />
            ))}
          </div>
        </div>
      )}

      <h2 className="text-center mt-4">Sale Posts</h2>
      <div className="row">
        {salePosts.map((salePost) => (
          <SalePostCard key={salePost._id} post={salePost} />
        ))}
      </div>
    </div>
  );
};
