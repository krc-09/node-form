
const path = require('path');
const rootDir = require('../util/path');


exports.Postcontact =  (req,res,next)=>{
    console.log(req.body);
    res.redirect('/success')};



  exports.Getcontact = (req,res,next)=>{
   
        res.sendFile(path.join(rootDir,'views','contact-us.html'));
    };