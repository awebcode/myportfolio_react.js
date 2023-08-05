import { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { clearHistoryAction, deleteUser, getallUsersAction } from "../../actions/userAction";
import { DataGrid } from "@mui/x-data-grid";

import { Link, useNavigate } from "react-router-dom";
//import { AccordionDetails, Button } from "@material-ui/core";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import { Avatar } from "@mui/material";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Sidebar from "../sidebar/Sidebar";
function AllUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user:currUser } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.updateUser);

  const [user, setUser] = useState();
  console.log("user", user);
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  useEffect(() => {
    if (currUser?.role === "admin") {
      dispatch(getallUsersAction());
    }
    if (isDeleted === true) {
      toast.success("user deleted successfully");
      navigate("/Dashboard");
    }

    //setUser(users);
    //AllUsers();
  }, [dispatch, isDeleted]);

  // const AllUsers = async () => {
  //  const res = await axios.get(`/api/v1/all-users`);
  //  console.log(res.data);
  //  setUser(res.data);
  //   };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      minWidth: 50,
      flex: 0.2,
      renderCell: (params) => {
      
        // const {formattedValue} = params;
        // return <p>{formattedValue}</p>;
        return <Avatar src={params.formattedValue} className="avatar-dashb"/>
      },
    },
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.2,
    },

    {
      field: "name",
      headerName: "Name",
     
      flex: 0.3,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return (params.id, "role") === "user" ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/update/role/${params.id}`}>
              <EditIcon />
            </Link>

            <Link  onClick={() => deleteUserHandler(params.id)}>
              <DeleteIcon />
            </Link>
            <Link to={`/account/other/${params.id}`}>
              <LaunchIcon />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users?.users &&
    users?.users.forEach((item) => {
      rows.push({
        avatar: item.avatar?.url,

        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <Sidebar />
        </div>
        <div className="data-container">
          <div className="productListContainer">
            <h1 id="productListHeading">
              ALL Users{" "}
              <span style={{ color: "greenyellow" }}>({users?.users?.length})</span>
            </h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              disableSelectionOnClick
              // className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
