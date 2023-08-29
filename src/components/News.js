import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  document.title = `${capitalizeFirstLetter(props.category)} - NewsHub`;
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${setPage}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(50);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
  }, [])

  //const componentDidMount=async()=> {
  //let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a15e3ab0de324afc980340e57a40c6c0&page=1&pageSize=${props.pageSize}`;
  //this.setState({loading:true})
  //let data = await fetch(url);
  //let parsedData = await data.json()
  //console.log(parsedData);
  //this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false })
  //}
  const HandleOnNext = async () => {
    // console.log("next");
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {
    // } else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a15e3ab0de324afc980340e57a40c6c0&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //   this.setState({loading:true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   console.log(parsedData);
    //   this.setState({
    //     page: page + 1,
    //     articles: parsedData.articles,
    //     loading:false
    //   })
    // }
    setPage(page + 1)
    updateNews();
  }
  const HandleOnPrev = async () => {
    // console.log("prev");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a15e3ab0de324afc980340e57a40c6c0&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    // setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // setState({
    //   page: page - 1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    setPage(page - 1)
    updateNews();
  }
  const fetchData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a15e3ab0de324afc980340e57a40c6c0&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)


  };

  return (
    <div className="container my-3">
      <h1 className="text-center my-6" style={{ marginTop: '90px' }}>NewsHub - Top {props.category} Headlines   </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length !== totalResults}
        loader={loading && <Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url} >
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} source={element.source.name} author={element.author} date={element.publishedAt} discription={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://cutewallpaper.org/21x/e5jlrn8ec/2356523878.jpg"} newsUrl={element.url} /></div>
            })}
          </div>
        </div></InfiniteScroll>
      {/*div className="container d-flex justify-content-between">
        <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={HandleOnPrev}>&larr; Previous</button>
          <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={this.HandleOnNext}>Next &rarr;</button></div>*/}
    </div>

  )
}
News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
