import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams, Link, redirect } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  deleteProduct,
  getAllProducts,
  getProductDetails,
} from "../../actions/productAction";
import { Data } from "../data/Data";
import { EffectCoverflow, Pagination } from "swiper";
import "./details.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import moment from "moment";
import {
  getPostReacts,
  getPostReactsUnauth,
  reactPost,
} from "../../actions/reactActions";
import { createComment, getComments } from "../../actions/commentAction";
import NewRequest from "../NewRequest/NewRequest";
import Comments from "../comments/Comments";
import Paginations from "../comments/Pagination";
import Input from "../comments/Input";
import ReactsPopup from "../react/ReactPopups";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Button } from "@mui/material";
import Table from "react-bootstrap/esm/Table";

import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
const BlogDetails = () => {
  const comments = useSelector((state) => state.comments);
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState([]);
  const [filter, setFilter] = useState();
  console.log("filter", filter);
  const [loadings, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { product: products } = useSelector((state) => state.productDetails);
  const { products: pro } = useSelector((state) => state.allProducts);
  // const { product: products } = product;
  const procat = products?.category;
  const id = useParams().id;
  // useEffect(() => {
  //   dispatch(getProductDetails(id));
  // }, []);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      pro.forEach((f) => {
        if (f?._id === slug) return setFilter(f); //f.id.toString()
      });
    }
    if (slug) {
      pro.forEach((f) => {
        if (f?.category === slug) return setFilter(f); //f.id.toString()
      });
    }
    if (slug) {
      pro.forEach((f) => {
        if (f?.tag === slug) return setFilter(f); //f.id.toString()
      });
    }
  }, []);
  //react post
  const [quantity, setQuantity] = useState(1);
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [allNameR, setAllNameR] = useState();
  const [checkSaved, setCheckSaved] = useState();
  useEffect(() => {
    if (user) {
      getReactsPost();
    } else {
      getReactsPostUnauth();
    }
  }, [dispatch, filter, user]);

  const getReactsPost = async () => {
    const res = await getPostReacts(filter?._id); //products?._id
    //console.log("reacsst", res.all);
    setAllNameR(res.all);
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);
    setCheckSaved(res.checkSaved);
  };
  //un auth
  const getReactsPostUnauth = async () => {
    const res = await getPostReactsUnauth(filter?._id);
    setAllNameR(res?.all);
    setReacts(res.reacts);

    setTotal(res.total);
  };
  const reactHandler = async (type) => {
    reactPost(filter?._id, type);
    if (check == type) {
      setCheck();
      let index = reacts?.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts?.findIndex((x) => x.react == type);
      let index1 = reacts?.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
        console.log("reacts", reacts);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
        console.log(reacts);
      }
    }
  };
  //react part end
  const handleComment = (body, file) => {
    if (!user) return;

    const data = {
      content: body,
      image: file,
      user: user,
      blog_id: filter?._id,
      blog_user_id: filter?.user,

      replyCM: [],
      createdAt: new Date().toISOString(),
    };

    setShowComments([data, ...showComments]);
    dispatch(createComment(data, filter?._id));
  };

  useEffect(() => {
    //if (comments?.data?.length === 0) return;
    setShowComments(comments?.data);
  }, [comments?.data]);
  console.log(showComments);
  const fetchComments = useCallback(async (id, num = 1) => {
    setLoading(true);
    dispatch(getComments(id, num));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!filter?._id) return;
    const num = navigate?.location?.search.slice(6) || 1;
    fetchComments(filter?._id, num);
  }, [filter?._id, fetchComments, navigate]);

  const handlePagination = (num) => {
    if (!filter?._id) return;
    fetchComments(filter?._id, num);
  };
  //reactions menus
  const onClose = (e) => {
    setShowMenu(false);
  };
  const menuref = useRef();
  const reactRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuref.current.contains(e.target)) {
        setShowMenu(false);
      }
      if (!reactRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  //converstaions create

  const handleContact = async (order) => {
    // const id = user?._id + order?._id || order?._id + user?._id;

    // try {
    //   const res = await NewRequest.get(`/conversations/single/${id}`);
    //   navigate(`/message/${res.data.id}`);
    // } catch (err) {
    //   if (err.response.status === 404) {
    //     const res = await NewRequest.post(`/conversations`, {
    //       to: user?.isActiveUser ? user?._id : order?._id,
    //     });
    //     navigate(`/message/${res.data?.id}`);
    //   }
    // }
  };

  return (
    <div className="details">
      <div className="container">
        {filter?.user?.role === "admin" ||
          (filter?.user?._id === user?._id && (
            <NavLink to={`/update/blog/${filter?._id}`}>Update Blog</NavLink>
          ))}

        <h1 className="main-title">
          <span>Blog</span> Details.
        </h1>

        <div className="details-main">
          <div className="details-img">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={
                (true,
                {
                  clickable: true,
                })
              }
              autoplay={true}
              onDurationChange={200}
              autoHeight={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {filter?.images?.map((img) => {
                return (
                  <SwiperSlide>
                    <img src={img.url} alt="" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="details-content">
            <h3>{filter?.title}</h3>
            <p>{moment(filter?.createdAt).format("LLLL")}</p>
            <span>{filter?.desc}</span>
            <p>{filter?.category}</p>
            <p>{filter?.tag}</p>
          </div>
        </div>
        <>
          {/* React */}
          <div
            ref={menuref}
            className="post_infos"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div className="reacts_count">
              <div className="reacts_count_imgs">
                {reacts &&
                  reacts
                    .sort((a, b) => {
                      return b.count - a.count;
                    })
                    .slice(0, 3)
                    .map(
                      (react, i) =>
                        react.count > 0 && (
                          <img
                            onClick={() => {
                              setShowMenu(!showMenu);
                            }}
                            src={`../../reacts/${react.react}.svg`}
                            alt=""
                            key={i}
                            style={{ animation: "none" }}
                          />
                        )
                    )}
                <span style={{ margin: "0px 0px 0px 0px" }}>{total > 0 && total}</span>
                {showMenu && (
                  <div className="rc_dropdown">
                    <Button
                      onClick={onClose}
                      variant="outlined"
                      color="error"
                      style={{ float: "right", margin: "2px 15px" }}
                    >
                      {" "}
                      <CloseIcon />
                    </Button>

                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>Avatar</th>
                          <th>Name</th>
                          <th>Reactions(7)</th>

                          <th>Send Messages</th>
                        </tr>
                      </thead>

                      {allNameR?.map((re, i) => {
                        return (
                          <>
                            {/* <img src={re?.reactBy?.avatar?.url} />
                              <p>{re?.reactBy?.name}</p>
                              <img src={`../../reacts/${re.react}.svg`} alt="" key={i} /> */}
                            <tbody>
                              <tr>
                                <td>
                                  <Link to={`/account/other/${re?.reactBy?._id}`}>
                                    <img
                                      className="tdimg"
                                      src={re?.reactBy?.avatar?.url}
                                      style={{
                                        height: "30px",
                                        width: "30px",
                                        animation: "none",
                                      }}
                                    />
                                  </Link>
                                </td>
                                <td>{re?.reactBy?.name}</td>
                                <td>
                                  {" "}
                                  <img
                                    src={`../../reacts/${re.react}.svg`}
                                    alt=""
                                    key={i}
                                    style={{
                                      animation: "none",
                                      height: "30px",
                                      width: "30px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <Button
                                    variant="outlined"
                                    onClick={() => handleContact(re?.reactBy)}
                                  >
                                    Send Message
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </>
                        );
                      })}
                    </Table>
                  </div>
                )}
              </div>
              {/* <div className="reacts_count_num">{total > 0 && total}</div> */}
              <div className="post_actions" ref={reactRef}>
                <ReactsPopup
                  visible={visible}
                  setVisible={setVisible}
                  reactHandler={reactHandler}
                />
                <div
                  className="post_action hover1"
                  onMouseOver={() => {
                    setTimeout(() => {
                      setVisible(true);
                    }, 200);
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      setVisible(false);
                    }, 100);
                  }}
                  onClick={() => reactHandler(check ? check : "like")}
                >
                  {check ? (
                    <img
                      src={`../../reacts/${check}.svg`}
                      alt=""
                      className="small_react"
                      
                    />
                  ) : (
                    user && <ThumbUpOffAltIcon style={{ display: "block" }} />
                  )}
                  <span
                    style={{
                      color: `
          
          ${
            check === "like"
              ? "#4267b2"
              : check === "love"
              ? "#f63459"
              : check === "haha"
              ? "#f7b125"
              : check === "sad"
              ? "#f7b125"
              : check === "wow"
              ? "#f7b125"
              : check === "angry"
              ? "#e4605a"
              : ""
          }
          `,
                    }}
                  >
                    {check ? check : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "13px" }}>
            {user ? (
              <Input callback={handleComment} />
            ) : (
              <h5>
                Please <Link to={`/login?blog/${filter?._id}`}>login</Link> to comment.
              </h5>
            )}

            {loadings ? (
              <h1>Loading...</h1>
            ) : (
              showComments?.map((comment, index) => (
                <Comments key={index} comment={comment} />
              ))
            )}

            {comments?.total > 1 && (
              <Paginations total={comments?.total} callback={handlePagination} />
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default BlogDetails;
