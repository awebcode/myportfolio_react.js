import React, { useEffect, useState } from 'react'
import "./sider.css"
import Facebook from "@material-ui/icons/Facebook"
import Whatsapp from "@material-ui/icons/WhatsApp";
import Twitter from "@material-ui/icons/Twitter"
import Instragram from "@material-ui/icons/Instagram";
import Youtube from "@material-ui/icons/YouTube";
import Mail from "@material-ui/icons/Mail";
import{ Data} from "../data/Data"
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, loadUser } from '../../actions/userAction';
import { getAllProducts, getProductDetails } from '../../actions/productAction';
import { Link, NavLink, useParams } from 'react-router-dom';
import { getTags } from '../../actions/tagAction';
import { getCategories } from '../../actions/categoryAction';

const SideRight = () => {
 
 const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allProducts);
  const [cat, setCat] = useState([])
  const [tag, setTag] = useState([]);
   const [data, setData] = useState([]);
  console.log(cat)
   console.log(tag);
  const categoriess = useSelector((state) => state.category);
  const tags = useSelector((state) => state.tags);

  useEffect(() => {
     
     dispatch(getCategories());
     dispatch(getTags());
   
    setCat(categoriess)
     setTag(tags);
  
 
   
  }, [dispatch])
  
 
  return (
    <div className="side-r">
      <div>
        <h2>Popular Posts</h2>
        <ul className="popular">
          {products
            .sort((a, b) => {
              return b.count - a.count;
            })
            .slice(0, 4)
            .map((v, i) => {
              return (
                <li>
                  <NavLink to={`/blog/${v._id}`}>
                    <a href="#">
                      <img src={v?.images[0]?.url} alt="" />
                    </a>
                    <p>{v.title.slice(0, 20)}</p>
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </div>

      <div>
        <h2>Category</h2>
        <ul>
          {cat?.map((v, i) => {
                  return (
                    <li key={v?._id}>
                      <Link to={`/blog/category/${v?.name}`}>{v?.name}</Link>
                    </li>
                  );
                })}
         
        </ul>
      </div>
      <div>
        <h2>Tags</h2>
        <ul>
          {tag?.map((v, i) => {
            return (
              <li key={v?._id}>
                <Link to={`/blog/tag/${v?.name}`}>{v?.name}</Link>
              </li>
            );
          })}
         
        </ul>
      </div>

      <div>
        <h2>Follow Me</h2>
        <ul className="social">
          <li>
            <a href="#">
              <Facebook />{" "}
            </a>
          </li>
          <li>
            <a href="#">
              <Whatsapp />{" "}
            </a>
          </li>
          <li>
            <a href="#">
              <Twitter />{" "}
            </a>
          </li>
          <li>
            <a href="#">
              <Instragram />{" "}
            </a>
          </li>
          <li>
            <a href="#">
              <Youtube />{" "}
            </a>
          </li>
          <li>
            <a href="#">
              <Mail />{" "}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideRight