import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
  Menu,
  CloseOutlined,
  PlusOne,
  Dashboard,
  VerifiedUserOutlined,
} from "@material-ui/icons";
import { Users } from "./dummyData";
import CloseFriend from "./CloseFriend";
import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GroupIcon from "@mui/icons-material/Group";
import AppsIcon from "@mui/icons-material/Apps";
import Plus from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import PaletteIcon from "@mui/icons-material/Palette";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import CommentIcon from "@mui/icons-material/Comment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Logout from "@mui/icons-material/Logout";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../actions/userAction";
import { toast } from "react-toastify";
import ThemeToggleMain from "../../portfolio/Navbar/ThemeToggleMain";
import CategoryIcon from "@mui/icons-material/Category";
import TagIcon from "@mui/icons-material/Tag";
export default function Sidebar() {
  const [toggle, setToggle] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.user);
  const logout = () => {
    dispatch(logoutAction());
    toast.success("Logged Out");
    navigate("/")
  };
  return (
    <div className={`${toggle ? "side-toggle" : "sidebar"}`}>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <span className="side-menu">
            {toggle ? (
              <ChevronRightIcon
                onClick={() => setToggle(!toggle)}
                style={{ fontSize: "30px" }}
              />
            ) : (
              <ChevronLeftIcon
                onClick={() => setToggle(!toggle)}
                style={{ fontSize: "30px" }}
              />
            )}
          </span>
          <li className="sidebarListItem">
            <NavLink to="/create/blog">
              {" "}
              <Plus className="sidebarIcon" style={{ cursor: "pointer" }} />
            </NavLink>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <NavLink to="/create/blog">Create</NavLink>
            </span>
          </li>
          {user?.role === "admin" && (
            <li className="sidebarListItem">
              <NavLink to="/dashboard">
                {" "}
                <Dashboard className="sidebarIcon" style={{ cursor: "pointer" }} />
              </NavLink>
              <span
                className={`${
                  toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
                }`}
              >
                <NavLink to="/dashboard">Dashboard</NavLink>
              </span>
            </li>
          )}
          {user?.role === "admin" ? (
            <>
              <li className="sidebarListItem">
                <NavLink to="/dashboard/all-users">
                  {" "}
                  <Group className="sidebarIcon" style={{ cursor: "pointer" }} />
                </NavLink>
                <span
                  className={`${
                    toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
                  }`}
                >
                  <NavLink to="/dashboard/all-users">All Users</NavLink>
                </span>
              </li>
            </>
          ) : (
            <li className="sidebarListItem">
              <NavLink to="/account">
                {" "}
                <VerifiedUserOutlined
                  className="sidebarIcon"
                  style={{ cursor: "pointer" }}
                />
              </NavLink>
              <span
                className={`${
                  toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
                }`}
              >
                <NavLink to="/account">Account</NavLink>
              </span>
            </li>
          )}
          <li className="sidebarListItem">
            <NavLink to="/dashboard/all-blogs">
              {" "}
              <AppsIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
            </NavLink>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <NavLink to="/dashboard/all-blogs">All Blogs</NavLink>
            </span>
          </li>
          {user?.role === "admin" && (
            <>
              <li className="sidebarListItem">
                <NavLink to="/dashboard/create/category">
                  {" "}
                  <CategoryIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
                </NavLink>
                <span
                  className={`${
                    toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
                  }`}
                >
                  <NavLink to="/dashboard/create/category">Create Category</NavLink>
                </span>
              </li>
              <li className="sidebarListItem">
                <NavLink to="/dashboard/create/tag">
                  {" "}
                  <TagIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
                </NavLink>
                <span
                  className={`${
                    toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
                  }`}
                >
                  <NavLink to="/dashboard/create/tag">Create Tag</NavLink>
                </span>
              </li>
            </>
          )}
          <li className="sidebarListItem">
            <NavLink to="/dashboard/comment">
              {" "}
              <CommentIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
            </NavLink>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <NavLink to="/dashboard/comment">Comment</NavLink>
            </span>
          </li>
          <li className="sidebarListItem">
            <NavLink to="/Earnings">
              {" "}
              <MonetizationOnIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
            </NavLink>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <NavLink to="/Earnings">Earnings</NavLink>
            </span>
          </li>
          <li className="sidebarListItem">
            <NavLink to="#">
              {" "}
              {/* <PaletteIcon className="sidebarIcon" style={{ cursor: "pointer" }} /> */}
              <ThemeToggleMain />
            </NavLink>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <NavLink to="#">Themes</NavLink>
            </span>
          </li>
          <li className="sidebarListItem">
            <NavLink to="/Settings">
              {" "}
              <SettingsIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
            </NavLink>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <NavLink to="/Settings">Settings</NavLink>
            </span>
          </li>
          <li className="sidebarListItem" onClick={logout}>
            <NavLink>
              {" "}
              <Logout className="sidebarIcon" style={{ cursor: "pointer" }} />
            </NavLink>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <NavLink>Logout</NavLink>
            </span>
          </li>
        </ul>
        {/* <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
