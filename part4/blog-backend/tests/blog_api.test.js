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
describe('when there is initially some blogs saved', () => {
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
})

describe('addition of a new blog', () => {
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

  test('blog without title or url is not added', async () => {
    const newBlog1 = {
      author: 'Louis Nauges',
      url: 'https://nauges.typepad.com/'
    }

    await api
      .post('/api/blogs')
      .send(newBlog1)
      .expect(400)

    const newBlog2 = {
      title: 'Blog de Louis Nauges',
      author: 'Louis Nauges'
    }

    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)

    const newBlog3 = {
      author: 'Louis Nauges'
    }

    await api
      .post('/api/blogs')
      .send(newBlog3)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(b => b.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
