import React, { useEffect } from "react";
import "./account.css";
import "./other.css";
import StarIcon from "@mui/icons-material/Star";
import StarIconOut from "@mui/icons-material/StarOutline";
import Check from "@mui/icons-material/Check";
import { Visibility } from "@material-ui/icons";
import Person from "@mui/icons-material/Person";
import Sms from "@mui/icons-material/Sms";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../actions/userAction";
import moment from "moment"
import BlogCard from "../../blog/Home/BlogCard";
const OtherInfo = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { userDetails } = useSelector((state) => state.userDetails);
  const { products } = useSelector((state) => state.allProducts);
  const user = userDetails;
  const userId = useParams().id;

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      {/* <!-- ===== ===== Body Main-Background ===== ===== --> */}
      <span class="main_bg"></span>

      {/* <!-- ===== ===== Main-Container ===== ===== --> */}
      <div class="container_account">
        {/* <!-- ===== ===== Header/Navbar ===== ===== --> */}
        <header>
          <div class="brandLogo" onClick={() => navigate("/")}>
            <figure>
              <img src="/1.png" alt="logo" width="40px" height="40px" />
            </figure>
            <span>MarqueTech</span>
          </div>
        </header>

        {/* <!-- ===== ===== User Main-Profile ===== ===== --> */}
        <section class="userProfile card">
          <div class="profile">
            <figure>
              <img
                src={`${user && user ? user?.avatar?.url : "/man.png"}`}
                alt="profile"
                width="250px"
                height="250px"
              />
            </figure>
          </div>
        </section>

        {/* <!-- ===== ===== Work & Skills Section ===== ===== --> */}
        <section class="work_skills card">
          {/* <!-- ===== ===== Work Contaienr ===== ===== --> */}
          <div class="work">
            <h1 class="heading">work</h1>
            <div class="primary">
              <h1>Spotify New York</h1>
              <span>Primary</span>
              <p>
                170 William Street <br /> New York, NY 10038-212-315-51
              </p>
            </div>

            <div class="secondary">
              <h1>
                Metropolitan <br /> Museum
              </h1>
              <span>Secondary</span>
              <p>
                S34 E 65th Street <br /> New York, NY 10651-78 156-187-60
              </p>
            </div>
          </div>

          {/* <!-- ===== ===== Skills Contaienr ===== ===== --> */}
          <div class="skills_Account">
            <h1 class="heading">Skills</h1>
            <ul>
              <li class="--i:0">Android</li>
              <li class="--i:1">Web-Design</li>
              <li class="--i:2">UI/UX</li>
              <li class="--i:3">Video Editing</li>
            </ul>
          </div>
        </section>

        {/* <!-- ===== ===== User Details Sections ===== ===== --> */}
        <section class="userDetails card">
          <div class="userName">
            <h1 class="name">{`${user && user ? user?.name : "default name"}`}</h1>
            <div class="map">
              <i class="ri-map-pin-fill ri">
                <PinDropIcon />
              </i>
              <span>New York, NY</span>
            </div>
            <p>Product Designer</p>
          </div>

          <div class="rank">
            <h1 class="heading">Rankings</h1>
            <span>8,6</span>
            <div class="rating">
              <i class="ri-star-fill rate">
                <StarIcon />
              </i>
              <i class="ri-star-fill rate">
                <StarIcon />
              </i>
              <i class="ri-star-fill rate">
                <StarIcon />
              </i>
              <i class="ri-star-fill rate">
                <StarIcon />
              </i>
              <i class="ri-star-fill rate">
                <StarIconOut />
              </i>
            </div>
          </div>

          <div class="btns">
            <ul>
              <li class="sendMsg">
                <i class="ri-chat-4-fill ri">
                  <Sms />
                </i>
                <a href="#">Send Message</a>
              </li>

              <li class="sendMsg active">
                <i class="ri-check-fill ri">
                  <Check />
                </i>
                <a href="#">Contacts</a>
              </li>

              <li class="sendMsg">
                <a href="#">Report User</a>
              </li>
            </ul>
          </div>
        </section>

        {/* <!-- ===== ===== Timeline & About Sections ===== ===== --> */}
        <section class="timeline_about card">
          <div class="tabs">
            <ul>
              <li class="timeline" style={{ padding: "80px 0px 0px 0px" }}>
                <i class="ri-eye-fill ri" style={{ color: "white" }}>
                  <Visibility />
                </i>
                <span>Timeline</span>
              </li>

              <li class="about active">
                <i class="ri-user-3-fill ri">
                  <Person />
                </i>
                <span>About</span>
              </li>
            </ul>
          </div>

          <div class="contact_Info">
            <h1 class="heading">Contact Information</h1>
            <ul>
              <li class="phone">
                <h1 class="label">Phone:</h1>
                <span class="info">+11 234 567 890</span>
              </li>

              <li class="address">
                <h1 class="label">Address:</h1>
                <span class="info">
                  S34 E 65th Street <br /> New York, NY 10651-78 156-187-60
                </span>
              </li>

              <li class="email">
                <h1 class="label">E-mail:</h1>
                <span class="info">{`${
                  user && user ? user?.email : "default@gmail.com"
                }`}</span>
              </li>

              <li class="site">
                <h1 class="label">Site:</h1>
                <span class="info">www.asikurecommerce.com</span>
              </li>
            </ul>
          </div>

          <div class="basic_info">
            <h1 class="heading">Basic Information</h1>
            <ul>
              <li class="birthday">
                <h1 class="label">Birthday:</h1>
                <span class="info">Dec 25, 2000</span>
              </li>

              <li class="sex">
                <h1 class="label">Gender:</h1>
                <span class="info">Male</span>
              </li>
              {userId === currentUser?._id && (
                <li class="sex" style={{ display: "block" }}>
                  <a href={`/update/profile`} style={{ textDecoration: "underline" }}>
                    Edit Profile
                  </a>
                  <a
                    href={`/update/password`}
                    style={{ textDecoration: "underline", display: "block" }}
                  >
                    Edit Password
                  </a>
                </li>
              )}
            </ul>
          </div>
        </section>
      </div>
      {/* Other In fo */}
      <div className="other-blog">
        <div className="container">
          <h1 className="main-title">
            User <span>Blogs.</span>
          </h1>

          <div className="other-blog-main">
            {/* <div className="other-blog-profile">
              <img src={user?.avatar.url} alt="" />
              <h1>{user?.name}</h1>
              <h2>{user?.role}</h2>
              <h3>{user?.email}</h3>
              <h3>{moment(user?.createdAt).format("LLLL")}</h3>
            </div> */}
            <div className="other-blog-content">
              {products?.map((v) => {
                return (
                  <>{v?.user?._id === user?._id && <BlogCard v={v} key={v._id} />}</>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherInfo;
