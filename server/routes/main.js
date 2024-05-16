const express=require('express');
const router=express.Router();
const Post=require('../models/Post');
/** 
 * Get /
 * Home
*/
router.get('/',async (req,res)=>{
    
    try{
        const locals={
            title: "Blog",
            description: "Created Blog"
        }
        let perPage=6;
        let page=req.query.page || 1;

        const data = await Post.aggregate([{$sort: { createdAt: -1 }}]).skip(perPage*page-perPage).limit(perPage).exec();
        const cnt=await Post.countDocuments({});
        const nextPage=parseInt(page)+1;
        const hasNextPage=nextPage<=Math.ceil(cnt/perPage);
        //Add next page functionality
        res.render('index',{locals,data,current: page,nextPage: hasNextPage?nextPage:null});
    }catch(err){
        console.log(err);
    }
   
});

/**
 * Get/
 * Post :id
 */
router.get('/post/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        const data=await Post.findById({_id:id});
        res.render('post',{data});

    }catch(err){
        console.log(err);
    }
});

/**
 * Post/
 * Search
 */
router.post('/search',async(req,res)=>{
    try{
        let searchTerm=req.body.searchTerm;
        let noSpecialChar=searchTerm.replace(/[^a-zA-Z0-9]/g,"");

        const data= await Post.find(
            {
                $or: [
                    {title: { $regex: new RegExp(noSpecialChar)}},
                    {body: { $regex: new RegExp(noSpecialChar)}}
                ]
            }
        );
        res.render("search",{data});
    }catch(err)
    {
        console.log(err);
    }
})










router.get('/about',(req,res)=>{
    const locals={
        title: "About",
        description: "Created About"
    }
    res.render('about',{locals});
});


module.exports=router;






/*function insertPostData(){
    Post.insertMany(
        [
            {
                title: "Blog",
                body: "ashjdjabdajbdjbsba"

            },
            {
                title: "Blog1",
                body: "ashjdjabdajbdjbsba"

            },
            {
                title: "Blog2",
                body: "ashjdjabdajbdjbsba"

            },
            {
                title: "Blog3",
                body: "ashjdjabdajbdjbsba"

            }
        ]
    );
}
insertPostData();*/