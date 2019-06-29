const path = require('path')
const Post = require('../database/models/Post')
module.exports = (req,res) => {
  const { image } = req.files
  const imagename = Date.now() + image.name
  image.mv(path.resolve(__dirname,'../public/posts', imagename),(error)=>{
    Post.create({
      ...req.body,
      image:`/posts/${imagename}`
    },(error,post)=>{
      res.redirect('/')
    })
  })
};
