var router = require('express').Router();
var Category = require('../models/category');
var Product = require('../models/product');

router.get('/add-category', function(req, res, next){
    res.render('admin/add-category', {message: req.flash('success')});
});

router.post('/add-category', function(req, res, next){
    
    var category = new Category();
    
    category.name = req.body.name;
    
    category.save(function(err){
        if (err) return next(err);
        
        req.flash('success', 'Successifully added a category');
        return res.redirect('/add-category');
    });
    
});

router.get('/add-product', function(req, res, next){
   res.render('admin/add-product', {message: req.flash('success')}); 
});


// Adding a product doesn't work because I don't know how to add it to the category except manually adding it with the category id. Also, I don't know how to make admin only add this.

router.post('/add-product', function(req, res, next){
    var proizvod = new Product();
    
    proizvod.category = "59b32588fdd0291a48fe8427";
    proizvod.name = req.body.name;
    proizvod.price = req.body.price;
    
    proizvod.save(function(err){
        if(err) return next(err);
        req.flash('success', 'Successifully added a product');
        res.redirect('/add-product');
    });
});




module.exports = router;