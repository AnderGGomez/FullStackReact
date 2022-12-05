const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {

  const reducer = (prev, item) =>{
    return item.likes > prev.likes ? item : prev
  }
  return blogs
    .map(blog => ({
      title : blog.title,
      author : blog.author,
      likes : blog.likes
    }))
    .reduce(reducer, {likes:0})
    
}
const favAuthor = (prev, author) => {
  if(prev.length === 0){
    prev.push(author)
  }else{
    const aut = prev.find(a=>a.name===author.name)
    aut ? 
      prev = prev.map(a=>a.name !== author.name ? a : ({name : aut.name, blog: aut.blog+1})) 
      : prev.push(author)
  }
  return prev
}
const maxBlog = (prev, author) => {
  return prev.blog === undefined ? author :
    prev.blog < author.blog ? author : prev
}
const maxBlogToAuthor = (blogs) => {
  return blogs.map(b=>({name:b.author, blog:1})).reduce(favAuthor,[]).reduce(maxBlog,{})
}


const likesAuthor = (prev, author) => {
  if(prev.length === 0){
    prev.push(author)
  }else{
    const aut = prev.find(a=>a.name===author.name)
    aut ?
      prev = prev.map(a=>a.name !== author.name ? a : ({name: aut.name, likes:aut.likes+author.likes}))
      : prev.push(author)
  }
  return prev
}

const maxLikes = (prev, author) => {
  return prev.likes === undefined ? author : 
    prev.likes < author.likes ? author : prev 
}


const maxLikesToAuthor = (blogs) => {
  return blogs.map(b=>({name: b.author, likes:b.likes})).reduce(likesAuthor,[]).reduce(maxLikes,{})
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  maxBlogToAuthor,
  maxLikesToAuthor
}