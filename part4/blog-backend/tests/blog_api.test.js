const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogs = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog identifier field is [id]', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(b => expect(b.id).toBeDefined())
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Blog de Louis Nauges',
    author: 'Louis Nauges',
    url: 'https://nauges.typepad.com/',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(b => b.title)
  expect(contents).toContain(newBlog.title)
})

test('likes is set to 0 if not given for a new blog', async () => {
  const newBlog = {
    title: 'Blog de Louis Nauges',
    author: 'Louis Nauges',
    url: 'https://nauges.typepad.com/'
  }

  const createdBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogInDb = await helper.blogInDb(createdBlog.body.id)
  expect(blogInDb.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})
