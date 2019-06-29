const Post = require('../database/models/Post')
module.exports = async (req,res)=>{
  const posts = await Post.findById(req.params.id)
    res.render('blog',{
      posts
    })
};
