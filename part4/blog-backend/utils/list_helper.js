const _ = require('lodash');
const flow = require('lodash/fp/flow');
const countBy = require('lodash/fp/countBy');
const reduce = require('lodash/fp/reduce');

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((prev,curr) => prev + curr.likes, 0)

const favoriteBlog = (blogs) => blogs.length ? blogs.reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr) : undefined

const mostBlogs = (blogs) => 
  _.reduce(
    _.countBy(blogs,'author'),
    (result, value, key) => {
      const blogs = Number(value)
      return !result || blogs > result.blogs ? {author:key,blogs} : result
    }, 
    undefined
  )

const mostLikes = (blogs) => 
  _.maxBy(
    _.map(
      _.groupBy(
        blogs,
        'author'
      ),
      (blogs,author) => ({author, likes: totalLikes(blogs)})
    ), 
    o => o.likes
  )

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}