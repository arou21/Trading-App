import React, { Component } from 'react'

export default class Article extends Component {
  render() {
    const article = this.props.articleInfo
    return (
        <div className="card" style={{width: '18rem'}}>
        <img src={ article.urlToImage } className="card-img-top" alt={ article.title }/>
        <div className="card-body">
        <h5 className="card-title">{ article.title }</h5>
        <h6 className="card-subtitle mb-2 text-muted">{ article.author } - { article.source.name }</h6>
        <p className="card-text">{ article['description'] }</p>
        <a href={ article.url } className="btn btn-primary">View Full Article</a>
        </div>
    </div>
    )
  }
}