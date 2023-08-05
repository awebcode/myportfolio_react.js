import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentReacts, getCommentReactsUnAuth, reactComment } from "../../actions/reactActions";
import {
  replyComment,
  updateComment,
  deleteComment,
} from "../../actions/commentAction";
import Input from "./Input";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactsPopup from "../react/ReactPopups";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Table from "react-bootstrap/Table";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


import ModalToggle from "./ModalToggle";
import Delete from "@mui/icons-material/Delete"
import Edit from "@mui/icons-material/Edit";

const CommentList = ({ children, comment, showReply, setShowReply, match }) => {
  const [onReply, setOnReply] = useState(false);
  //const { auth } = useSelector((state: RootStore) => state)
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [edit, setEdit] = useState();
  //react post
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
   const [Modals, setModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [allNameR, setAllNameR] = useState();
   //console.log("cmre", allNameR);
  const [checkSaved, setCheckSaved] = useState();
  useEffect(() => {
    if (user) {
      getReactsPost();
    } else {
      getReactsPostUnauth()
    }
  }, [comment,user,setAllNameR]); // dependence reacts for timely update

  const getReactsPost = async () => {
    const res = await getCommentReacts(comment?._id);
   
    setAllNameR(res.all)
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);
    setCheckSaved(res.checkSaved);
  };
  //un auth
  const getReactsPostUnauth = async () => {
    const res = await getCommentReactsUnAuth(comment?._id);
    
    setReacts(res.reacts);
    //setCheck(res.check);
    setAllNameR(res.all);
    setTotal(res.total)
   
  };

  const reactHandler = async (type) => {
   
    reactComment(comment?._id, type);
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
  const handleReply = (body,file) => {
    if (!user) return;

    const data = {
      user: user,
      blog_id: comment.blog_id,
      image:file,
      blog_user_id: comment.blog_user_id,
      content: body,
      replyCM: [],
      reply_user: comment.user,
      comment_root: comment.comment_root || comment?._id,
      createdAt: new Date().toISOString(),
    };

    setShowReply([data, ...showReply]);
    // dispatch(replyComment(data, auth.access_token))
    dispatch(replyComment(data));
    setOnReply(false);
  };

  const handleUpdate = (body) => {
    if (!user || !edit) return;

    if (body === edit.content) return setEdit(undefined);

    const newComment = { ...edit, content: body };
    // dispatch(updateComment(newComment, auth.access_token))
    dispatch(updateComment(newComment));
    setEdit(undefined);
  };

  const handleDelete = (comment) => {
    if (!user) return;
    //dispatch(deleteComment(comment, auth.access_token));
    dispatch(deleteComment(comment));
  };
//reactions menus
  const onClose = (e) => {
    setShowMenu(false)
  }
  const menuref = useRef();
  

  useEffect(() => {
    let handler = (e) => {
      if (!menuref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  //converstaions create
  const navigate=useNavigate();
   const handleContact = async (order) => {
     
     
     const id = (user?._id + order?._id) || (order?._id + user?._id)
     

     try {
       const res = await NewRequest.get(`/conversations/single/${id}`);
       navigate(`/message/${res.data.id}`);
     } catch (err) {
       if (err.response.status === 404) {
         const res = await NewRequest.post(`/conversations`, {
           to: user?.isActiveUser ? user?._id : order?._id,
         });
         navigate(`/message/${res.data.id}`);
       }
     }
   };
  const ref = React.useRef();
  const reactRef = React.useRef();
  React.useEffect(() => {
    let handler = (e) => {
      if (!ref.current.contains(e.target)) {
        setModal(false);
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
  const Nav = (comment) => {
    return (
      <div style={{ float: "right" }}>
        <Delete
          className="fa fa-trash-o"
          aria-hidden="true"
          onClick={() => handleDelete(comment)}
        />
        <Edit
          className="fa fa-pencil-square-o"
          aria-hidden="true"
          onClick={() => setEdit(comment)}
        />
      </div>
    );
  };

  return (
    <div className="w-100">
      {edit ? (
        <Input callback={handleUpdate} edit={edit} setEdit={setEdit} />
      ) : (
        <div className="comment_box" ref={ref}>
          <div
            className="p-2"
            dangerouslySetInnerHTML={{
              __html: comment.content,
            }}
            style={{ display: "flex" }}
          />
          {comment?.image && (
            <div style={{ height: "200px", width: "200px" }}>
              <img
                onClick={() => setModal(!Modals)}
                src={comment.image}
                alt=""
                style={{ width: "100%", height: "100%", animation: "none" }}
              />
            </div>
          )}
          {Modals && <ModalToggle comment={comment} setModal={setModal} />}
          <div className="d-flex justify-content-between p-2">
            <small style={{ cursor: "pointer" }} onClick={() => setOnReply(!onReply)}>
              {onReply ? "- Cancel -" : "- Reply -"}
            </small>

            <small className="d-flex">
              <div className="comment_nav">
                {comment.blog_user_id === user?._id || user?.role === "admin" ? (
                  comment.user?._id === user?._id || user?.role === "admin" ? (
                    Nav(comment)
                  ) : (
                    <>
                      <div style={{ float: "right" }}>
                        <i
                          className="fa fa-trash-o"
                          aria-hidden="true"
                          onClick={() => handleDelete(comment)}
                        />
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                          onClick={() => setEdit(comment)}
                        />
                      </div>
                    </>
                  )
                ) : (
                  comment?.user?._id === user?._id && Nav(comment)
                )}
              </div>

              <div>{new Date(comment?.createdAt).toLocaleString()}</div>
            </small>
          </div>
          {/* <LikeDislikes
            comment
            // productId={productId}
            commentId={comment?._id}
            userId={user?._id}
            allComment={comment}
          /> */}
          <div className="post_infos" ref={menuref}>
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
                          <>
                            <img
                              onClick={() => {
                                setShowMenu(!showMenu);
                              }}
                              src={`../../reacts/${react.react}.svg`}
                              alt=""
                              key={i}
                              style={{ animation: "none" }}
                            />
                          </>
                        )
                    )}
                <span style={{ padding: "5", position: "relative" }}>
                  {total > 0 && total}
                </span>
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

                          <th>Message</th>
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
                                  <Link to={`/account/${re?.reactBy?._id}`}>
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
                                    Message
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
                    }, 50);
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
        </div>
      )}

      {onReply && <Input callback={handleReply} />}

      {children}
    </div>
  );
};

export default CommentList;
