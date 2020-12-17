const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const ArticleRouter = require('./routes/articles')
const Article = require('./models/Article')
const mtdOverride = require('method-override')

mongoose.connect('mongodb://localhost/blogapp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(mtdOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render("articles/index", { articles: articles })
})

app.use('/articles', ArticleRouter)


app.listen(3000, () => {
  console.log("Server Up And Running...")
})
