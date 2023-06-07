const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  try{
     const categoriesData = await Category.findAll({
    include:[{model:Product}]// be sure to include its associated Products
  })
  
  res.status(200).json(categoriesData)
  }catch(err){
    res.status(500).json(err)
  }
 
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  try{
     const categoryId = req.params.id
  const categoryData = await Category.findOne({
    where:{id:categoryId},
    include:[{model:Product}]// be sure to include its associated Products
  })

  res.status(200).json(categoryData)
  }catch(err){
    res.status(500).json(err)
  }
 
  
});

router.post('/', async(req, res) => {
 try{
   // create a new category
   const { category } = req.body
   const newCategory = await Category.create({category_name:category})
   res.status(201).json(newCategory)
 }catch(err){
  console.log(err)
  res.status(500).json({err:'Failed to create.'})
 }
});

router.put('/:id', async(req, res) => {
  try{
      // update a category by its `id` value

  Category.update({
    category_name:req.body.category
  },
  {
    where:{
      id:req.params.id
    }
  })
  .then((rowsAffected)=>{
    res.status(200).json({message:rowsAffected+" row(s) affected!"}) 
  })

  
  
  }catch(err){
    res.status(500).json("failed to update the category",err)
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    Category.destroy({
      where:{
        id:req.params.id
      }
    }).then((rowsAffected)=>{
      res.status(200).json({message:rowsAffected+" row(s) affected!"})
    })
  }catch(err){
    res.status(500).json("failed to delete the category",err)
  }
});

module.exports = router;
