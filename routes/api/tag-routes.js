const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try{
    // find all tags
  const tags = await Tag.findAll({
    include:[{model:Product}] // be sure to include its associated Product data
  })
  res.status(200).json(tags)
 
  }catch(err){
    res.status(500).json({message:err})
  }
});

router.get('/:id',async (req, res) => {
  // find a single tag by its `id`
  try{
    const tag = await Tag.findOne({
      where:{
        id:req.params.id
      },
      include:[{model:Product}]// be sure to include its associated Product data
    })
    res.status(200).json(tag)
  }catch(err){
    res.status(500).json({message:err})
  }
  
});

router.post('/',async (req, res) => {
try{
    // create a new tag
    const { tag_name } = req.body
    const tag = await Tag.create({
      tag_name:tag_name
    })
    res.status(200).json(tag)
}catch(err){
  res.status(500).json({message:err})
}
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    
    Tag.update(req.body,{
      where:{
        id:req.params.id
      }
    }).then((rows)=>{
      res.status(200).json({message:rows+' row(s) affected!'})
    }).catch((err)=>{
      res.json(err)
    })
  }catch(err){
    res.status(500).json({message:err})
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
try{
  Tag.destroy({
    where:{
      id:req.params.id
    }
  }).then((row)=>{
    res.status(200).json({message:row+' row(s) affected!'})
  })
}catch(err){
  res.status(500).json({message:err})
}
});

module.exports = router;
