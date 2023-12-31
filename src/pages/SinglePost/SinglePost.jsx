import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import FavouriteIcon from "@material-ui/icons/ThumbUp";
import DislikeIcon from "@material-ui/icons/ThumbDown";
import ShareIcon from "@material-ui/icons/Share";
import MarkUnreadChatAltIcon from "@material-ui/icons/Chat";
import MarkUnreadShareAltIcon from "@material-ui/icons/Share";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Container, Grid } from "@material-ui/core";
import toast, { Toaster } from "react-hot-toast";

import {
  LinkedinShareButton,
  FacebookShareButton,
  TelegramShareButton,
  EmailShareButton,
  PinterestShareButton,
  TwitterShareButton,
  LinkedinIcon,
  FacebookIcon,
  TelegramIcon,
  EmailIcon,
  PinterestIcon,
  TwitterIcon,
} from "react-share";
import axios from "axios";
import apiRoot from "../../API/api";
const id = window.location.href.split("post/")[1];
console.log(id);
const token = localStorage.getItem("token");
export const SinglePost = (props) => {
  // const useStyles = makeStyles((theme) => ({
  //   container: {
  //     paddingTop: theme.spacing(3),
  //   },
  //   root: {
  //     boxShadow:
  //       "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  //   },
  //   media: {
  //     height: 0,
  //     paddingTop: "56.25%",
  //   },
  //   avatar: {
  //     backgroundColor: blue[500],
  //     "& > img": {
  //       objectFit: "cover",
  //       width: "100%",
  //       height: "100%",
  //     },
  //   },
  //   actions: {
  //     display: "flex",
  //     justifyContent: "space-between",
  //   },
  // }));

  // const classes = useStyles();

  let {
    user,
    profile,
    blogImage,
    title,
    created,
    content,
    cost,
    shares,
    comments,
    likes,
    id,
    username,
    allComments,
    img,
    commentLikes,
    commentDislike,
  } = props;

  useEffect(() => {
    apiRoot
      .get(`/posts/${id}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        // if (res.data.data) {
        // setPosts(res.data.data);
        console.log(res);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [posts, setPosts] = useState();
  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(3),
    },
    root: {
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
    avatar: {
      backgroundColor: blue[500],
      "& > img": {
        objectFit: "cover",
        width: "100%",
        height: "100%",
      },
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
    },
  }));
  const classes = useStyles();

  let [comment, setComment] = useState(false);
  let [share, setShare] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDislikeCount] = useState(props.dislike);
  const [commentlikeCount, setCommentLikeCount] = useState(props.commentLikes);
  const [commentdislikeCount, setCommentDislikeCount] = useState(
    props.commentDislike
  );
  const [token, setToken] = useState(localStorage.getItem("token"));

  let url = window.location.href;

  useEffect(() => {
    // likeCount va dislikeCount o'zgarishlarini tekshirish

    // Bu qismni o'zingizning loyihangizga moslashtirishingiz kerak

    setLikeCount(props.likes);
    setDislikeCount(props.dislike);

    setCommentLikeCount(props.commentLikes);
    setCommentDislikeCount(props.commentDislike);
  }, [
    props.like,
    props,
    props.dislike,
    props.commentLikes,
    props.commentLikes,
  ]);

  const handleLike = async () => {
    if (token) {
      try {
        // Axios orqali like so'rovini yuborish

        const response = await apiRoot.patch(`/posts/like/${props.id}`, null, {
          headers: {
            token: `${token}`, // Tokenni Headerga qo'shish
          },
        });

        if (response.data.success) {
          // Agar like muvaffaqiyatli qo'yilgan bo'lsa, postning yangilangan ma'lumotini o'qish

          const updatedPost = response.data.data;

          // console.log("Post yangilandi:", updatedPost);

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
        // console.log(props);
        const response = await apiRoot.patch(
          `/posts/dislike/${props.id}`,
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

          // console.log("Post yangilandi:", updatedPost);

          setLikeCount(updatedPost.like);

          setDislikeCount(updatedPost.dislike);
        }
      } catch (error) {
        console.error("Dislike qilishda xatolik:", error);
      }
    }
  };

  const handleCommentLike = async (id) => {
    console.log(id);
    if (token) {
      try {
        // Axios orqali like so'rovini yuborish

        const response = await apiRoot.patch(
          `/comment/like/${id}`,
          null,
          {
            headers: {
              token: `${token}`, // Tokenni Headerga qo'shish
            },
          }
        );

        if (response.data.success) {
          // Agar like muvaffaqiyatli qo'yilgan bo'lsa, postning yangilangan ma'lumotini o'qish

          const updatedPost = response.data.data;

          // console.log("Post yangilandi:", updatedPost);

          setCommentLikeCount(updatedPost.like);

          setCommentDislikeCount(updatedPost.dislike);
        }
      } catch (error) {
        console.error("Like qilishda xatolik:", error);
      }
    }
  };
  const notify = () =>
  toast("Copied to Clipboard✔", {
    position: "top-right",
  });
  const handleCommentDislike = async (id) => {
    if (token) {
      try {
        // Axios orqali dislike so'rovini yuborish
        // console.log(props);
        const response = await apiRoot.patch(
          `/comment/dislike/${id}`,
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

          // console.log("Post yangilandi:", updatedPost);

          setCommentLikeCount(updatedPost.like);

          setCommentDislikeCount(updatedPost.dislike);
        }
      } catch (error) {
        console.error("Dislike qilishda xatolik:", error);
      }
    }
  };


  return (
    // <div>
    //   <Card className={classes.root}>
    //     <CardHeader
    //       avatar={
    //         <Avatar aria-label="recipe" className={classes.avatar}>
    //           <img loading="lazy" src={profileImg} alt="profile img" />
    //         </Avatar>
    //       }
    //     />
    //     <CardContent>
    //       <Typography variant="body1" color="textSecondary" component="p">
    //         <strong>Hello</strong>
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary" component="p">
    //         Lorem impusm felis Lorem impusm felis Lorem impusm felis Lorem
    //         impusm felis
    //       </Typography>
    //     </CardContent>
    //   </Card>
    // </div>
    <>
      <Grid item sm={8} md={10} className={classes.feed}>
        <h2 className="dashboardTitle"></h2>
        <Card className={classes.root}>
        <CardHeader
          subheader={
            new Date(created).getFullYear() +
            "-" +
            new Date(created).getMonth() +
            "-" +
            new Date(created).getDay()
          }
        />
        <CardMedia className={classes.media} image={blogImage} title={title} />
        <CardContent>
          <Typography variant="body1" color="textSecondary" component="p">
            <strong>{title}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content.length < 250 ? content : `${content.slice(0, 249)}...`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.actions}>
          <div>
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                localStorage.getItem("token")
                  ? handleLike()
                  : window.location.replace("/register");
              }}
            >
              <h5>{likeCount}</h5>
              <FavouriteIcon />
            </IconButton>
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                localStorage.getItem("token")
                  ? handleDislike()
                  : window.location.replace("/register");
              }}
            >
              <h5>{dislikeCount}</h5>
              <DislikeIcon />
            </IconButton>
            <IconButton
              aria-label="comment"
              onClick={() => {
                setComment((prev) => !prev);
                setShare(false);
              }}
            >
              <h5>{comments}</h5>
              <MarkUnreadChatAltIcon />
            </IconButton>
            {/* Share Box */}
            {comment == true ? (
              <div className="commentBox">
                <div className="leftContentBox">
                  <CardHeader
                    subheader={
                      new Date(created).getFullYear() +
                      "-" +
                      new Date(created).getMonth() +
                      "-" +
                      new Date(created).getDay()
                    }
                  />
                  <CardMedia
                    className={classes.media}
                    image={blogImage}
                    title={title}
                  />
                  <CardContent className="cardContent">
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>{title}</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {content}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.actions && "cardAction"}>
                    <div></div>
                    <div className="flex flex-end">
                      <h4>{cost}$</h4>
                      <a
                        href={"/post/" + id}
                        id={id}
                        style={{ textDecoration: "none" }}
                      >
                        <IconButton
                          aria-label="share"
                          style={{ fontSize: 16, color: "#2196f3" }}
                        >
                          More
                        </IconButton>
                      </a>
                    </div>
                  </CardActions>
                </div>
                <div className="rightCommentBox">
                  <h2>Comments</h2>
                  <hr />
                  <div className="allComments">
                    {allComments.map((comment) => {
                      return (
                        <div className="singleComment">
                          <div className="oneComment">
                            <Avatar
                              aria-label="recipe"
                              className={classes.avatar || ""}
                            >
                              {img ? (
                                <img
                                  loading="lazy"
                                  src={profile?.image}
                                  alt={"profileimg"}
                                />
                              ) : (
                                <span>
                                  {allComments
                                    ? comment?.user?.username?.split("")[0]
                                    : "Z"}
                                </span>
                              )}
                            </Avatar>
                            <h4>{comment.user.username}</h4>
                          </div>
                          <p className="commentText">{comment.text}</p>
                          <div className="df">
                            <IconButton
                              aria-label="add to favorites"
                              onClick={() => {
                                localStorage.getItem("token")
                                  ? handleCommentLike(comment._id)
                                  : window.location.replace("/register");
                              }}
                            >
                              <h5>{commentlikeCount}</h5>
                              <FavouriteIcon />
                            </IconButton>
                            <IconButton
                              aria-label="add to favorites"
                              onClick={() => {
                                localStorage.getItem("token")
                                  ? handleCommentDislike(comment._id)
                                  : window.location.replace("/register");
                              }}
                            >
                              <h5>{commentdislikeCount}</h5>
                              <DislikeIcon />
                            </IconButton>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div></div>
                </div>
                <span
                  className="close"
                  onClick={() => {
                    setComment(false);
                  }}
                >
                  &times;
                </span>
              </div>
            ) : (
              ""
            )}
            <IconButton
              aria-label="share"
              onClick={() => {
                setShare((prev) => !prev);
                setComment(false);
              }}
            >
              <h5>{shares}</h5>
              <MarkUnreadShareAltIcon />
            </IconButton>
            {share == true ? (
              <div className="shareBox">
                <span
                  className="close"
                  onClick={() => {
                    setShare(false);
                  }}
                >
                  &times;
                </span>
                <h2 className="shareTitle">Share</h2>
                <hr className="notificationsLine shareLine" />
                <div className="shareIconsDiv">
                  <LinkedinShareButton
                    title="Check out this website"
                    summary="The best website for community site to promote socialization between aliens and earthlings"
                    url={`${url}/post/${id}`}
                    className="shareIconBtn"
                  >
                    <LinkedinIcon size={45} round />
                    <span>Linkedin</span>
                  </LinkedinShareButton>
                  <FacebookShareButton
                    title="Check out this website"
                    summary="The best website for community site to promote socialization between aliens and earthlings"
                    url={`${url}/post/${id}`}
                    className="shareIconBtn"
                  >
                    <FacebookIcon size={45} round />
                    <span>Facebook</span>
                  </FacebookShareButton>
                  <TelegramShareButton
                    title="Check out this website"
                    summary="The best website for community site to promote socialization between aliens and earthlings"
                    url={`${url}/post/${id}`}
                    className="shareIconBtn"
                  >
                    <TelegramIcon size={45} round />
                    <span>Telegram</span>
                  </TelegramShareButton>
                  <EmailShareButton
                    title="Check out this website"
                    summary="The best website for community site to promote socialization between aliens and earthlings"
                    url={`${url}/post/${id}`}
                    className="shareIconBtn"
                  >
                    <EmailIcon size={45} round />
                    <span>Email</span>
                  </EmailShareButton>
                  <TwitterShareButton
                    title="Check out this website"
                    summary="The best website for community site to promote socialization between aliens and earthlings"
                    url={`${url}/post/${id}`}
                    className="shareIconBtn"
                  >
                    <TwitterIcon size={45} round />
                    <span>Twitter</span>
                  </TwitterShareButton>
                  <PinterestShareButton
                    title="Check out this website"
                    summary="The best website for community site to promote socialization between aliens and earthlings"
                    url={`${url}/post/${id}`}
                    className="shareIconBtn"
                  >
                    <PinterestIcon size={45} round />
                    <span>Pinterest</span>
                  </PinterestShareButton>
                </div>
                <div className="clipBoardDiv">
                  <span>{`${url}/post/${id}`}</span>
                  <button type="button" onClick={notify}>
                    Copy
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex">
            <h4>{cost}$</h4>
            <a href={"/post/" + id} id={id} style={{ textDecoration: "none" }}>
              <IconButton
                aria-label="share"
                style={{ fontSize: 16, color: "#2196f3" }}
              >
                More
              </IconButton>
            </a>
          </div>
        </CardActions>
      </Card>
      </Grid>
    </>
  );
};
