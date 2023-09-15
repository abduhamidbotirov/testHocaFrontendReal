import { useEffect, useState } from "react";
import axios from "axios";
import apiRoot from "../API/api";

const Card = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token")); // Local Storage dan tokenni olish
  const [likeCount, setLikeCount] = useState(post.like);
  const [dislikeCount, setDislikeCount] = useState(post.dislike);

  useEffect(() => {
    // Token mavjud emasligini tekshirish
    if (!token) {
      setShowModal(true); // Modal'ni ochish
    }
  }, [token]);

  useEffect(() => {
    // likeCount va dislikeCount o'zgarishlarini tekshirish
    // Bu qismni o'zingizning loyihangizga moslashtirishingiz kerak
    setLikeCount(post.like);
    setDislikeCount(post.dislike);
  }, [post.like, post, post.dislike]);

  const handleLike = async () => {
    if (token) {
      try {
        // Axios orqali like so'rovini yuborish
        const response = await apiRoot.patch(`/posts/like/${post._id}`, null, {
          headers: {
            token: `${token}`, // Tokenni Headerga qo'shish
          },
        });
        if (response.data.success) {
          // Agar like muvaffaqiyatli qo'yilgan bo'lsa, postning yangilangan ma'lumotini o'qish
          const updatedPost = response.data.data;
          console.log("Post yangilandi:", updatedPost);
          setLikeCount(updatedPost.like);
          setDislikeCount(updatedPost.dislike);
        }
      } catch (error) {
        console.error("Like qilishda xatolik:", error);
      }
    }
  };
  const handleDislike = async () => {
    if (token) {
      try {
        // Axios orqali dislike so'rovini yuborish
        const response = await apiRoot.patch(
          `/posts/dislike/${post._id}`,
          null,
          {
            headers: {
              token: `${token}`, // Tokenni Headerga qo'shish
            },
          }
        );
        if (response.data.success) {
          // Agar dislike muvaffaqiyatli qo'yilgan bo'lsa, postning yangilangan ma'lumotini o'qish
          const updatedPost = response.data.data;
          console.log("Post yangilandi:", updatedPost);
          setLikeCount(updatedPost.like);
          setDislikeCount(updatedPost.dislike);
        }
      } catch (error) {
        console.error("Dislike qilishda xatolik:", error);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST isteği gönder ve tokeni al
      const response = await apiRoot.post(`/users`, { email });
      if (response.data.success) {
        // Token'i yerel depolamaya kaydet
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        // Modal'ı kapat
        setShowModal(false);
      }
    } catch (error) {
      console.error("Token olishda xatolik:", error);
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 g-4">
      <div className="card h-100">
        <img src={post.imgLink} alt={post.title} className="card-image" />
        <h3 className="card-title">{post.title}</h3>
        <p className="card-desc">{post.desc}</p>
        {/* Like va Dislike düğmeleri */}
        <div className="card-actions">
          <div className="card-action" onClick={handleLike}>
            <i className="far fa-thumbs-up"></i> {likeCount}
          </div>
          <div className="card-action" onClick={handleDislike}>
            <i className="far fa-thumbs-down"></i> {dislikeCount}
          </div>
          <div className="card-action">
            <i className="far fa-comment"></i> {post.comments.length}
          </div>
          <div className="card-action">
            <i className="far fa-share-square"></i> Share
          </div>
        </div>
      </div>
      {showModal && (
        <div>
          {/* Modal fon (backdrop) */}
          <div className="modal-backdrop" onClick={handleModalClose}></div>

          {/* Modal tarkibi */}
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="E-mailingizni kiriting"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Jo'natish</button>
              <button type="button" onClick={handleModalClose}>
                Yopish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
