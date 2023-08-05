import React from 'react'
import { Link } from 'react-router-dom'






const AvatarComment= ({ user }) => {
  return (
    <div className="avatar_comment">
      <img src={user.avatar.url} alt="avatar" style={{ animation: "none" }} />

      <small className="d-block text-break">
        <Link to={`/account/other/${user._id}`}>{user.name}</Link>
      </small>
    </div>
  );
}

export default AvatarComment
