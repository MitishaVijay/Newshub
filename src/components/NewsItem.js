import React from 'react'
const NewsItem=(props)=> {
    let { title, discription, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card" >
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: "50%" }}>
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{discription}</p>
            <a href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
            <p className="card-text"><small className="text-body-secondary">{!author ? '' : `${author} by`}  On {new Date(date).toGMTString()}</small></p>
          </div>
        </div>
      </div>
    )
  }
export default NewsItem