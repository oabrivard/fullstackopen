const dummy = () => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((prev,curr) => prev + curr.likes, 0)

const favoriteBlog = (blogs) => blogs.length ? blogs.reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr) : undefined

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}