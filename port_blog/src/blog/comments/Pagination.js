import React, { useState, useEffect } from 'react'
import { useHistory, useNavigate } from 'react-router-dom'



const Pagination = ({total, callback}) => {
  const [page, setPage] = useState(1)

  const newArr = [...Array(total)].map((_,i) => i + 1)
  const history = useNavigate()

  const isActive = (index) => {
    if(index === page) return "active";
    return ""
  }

  const handlePagination = (num) => {
    history(`?page=${num}`)
    callback(num)
  }

  useEffect(() => {
    console.log("history.location>pagination", history?.location?.search);
    const num = history?.location?.search.slice(6) || 1
    setPage(Number(num))
  },[history?.location?.search])


  return (
    <nav aria-label="Page navigation example" style={{cursor: 'pointer'}}>
      <ul className="pagination">
        {
          page > 1 && 
          <li className="page-item" 
          onClick={() => handlePagination(page - 1)}>
            <span className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        }
        

        {
          newArr.map(num => (
            <li key={num} className={`page-item ${isActive(num)}`}
            onClick={() => handlePagination(num)}>
              <span className="page-link">{num}</span>
            </li>
          ))
        }
        
        {
          page < total &&
          <li className="page-item"
          onClick={() => handlePagination(page + 1)}>
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Pagination
