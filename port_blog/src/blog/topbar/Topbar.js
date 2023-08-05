import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Topbar() {
  const [query, setQuery] = useState("")
  const { user } = useSelector((s) => s.user);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"><a href="/">Home</a></span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <input placeholder="Search for friend, post or video" className="searchInput" onChange={(e)=>setQuery(e.target.value)}/>
          <Search className="searchIcon" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src={user?.avatar?.url?user?.avatar?.url:"/man.png"} alt="" className="topbarImg" />
      </div>
    </div>
  );
}
