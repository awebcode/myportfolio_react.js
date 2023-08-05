import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../actions/categoryAction";
import { createTAG, deleteTAG, updateTAG } from "../../actions/tagAction";



const Tag = () => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(null);

  const tags = useSelector((state) => state.tags);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //if (!user?.role !== "admin" || !name) return;

    if (edit) {
      if (edit.name === name) return;
      const data = { ...edit, name };
      dispatch(updateTAG(data));
    } else {
      dispatch(createTAG(name));
    }
    setName("");
    setEdit(null);
  };

  const handleDelete = (id) => {
    //if(!user?.role !== 'admin') return;
    if (window.confirm("Are you sure to delete this tag?")) {
      dispatch(deleteTAG(id));
    }
  };
  const empty = () => {
    setEdit(null);
    setName("");
  };

  //if(user?.role !== 'admin') return <NotFound />
  return (
    <div className="category">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Create Tag</label>

        <div className="">
          {edit && <Delete className="emptyicon" onClick={empty} />}
          <input
            style={{ fontSize: "20px" }}
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit">{edit ? "Update" : "Create"}</button>
        </div>
      </form>

      <div className="tag-body">
        {tags &&
          tags?.map((category) => (
            <div className="category_row" key={category._id}>
              <p>{category.name}</p>

              <div>
                <Edit
                  className="fa fa-pencil-square-o"
                  onClick={() => setEdit(category)}
                />
                <Delete
                  className="fa fa-trash-o"
                  onClick={() => handleDelete(category._id)}
                />
              </div>
            </div>
          ))}
        {tags?.length < 1 && <h1 className="">No Tag Found!</h1>}
      </div>
    </div>
  );
};

export default Tag;
