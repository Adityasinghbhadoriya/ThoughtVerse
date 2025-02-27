const BlogModel = require("../Models/BlogModel");

const createData = async (req , res) =>{
    const data = req.body;
    try {
        const model = new BlogModel(data);
        await model.save();

        res.status(201).json({message: "Data Created Successfully", success: true});

    } catch (error) {
        console.error("Error creating data:", error); // Logs exact error in console
        res.status(500).json({message: "failed to Create Data", success: false});
    }
};

const fetchData = async (req , res) =>{
   
    try {
        const data = await BlogModel.find();
        res.status(200).json({message: "Data Fetched Successfully", success: true, data});

    } catch (error) {
        console.error("Error fetching data:", error); // Logs exact error in console
        res.status(500).json({message: "failed to fetch Data", success: false});
    }
};

const UpdateBlogById =async (req,res) =>{
    try {
       const id  = req.params.id;
       const body = req.body;
       const obj = { $set : {...body } };
      await BlogModel.findByIdAndUpdate(id, obj);
       
       res.status(200).json({message: "Blog Updated", success: true});
    } catch (error) {
       res.status(500).json({message: "Failed to Update Blog", success: false});
    }

}
const DeleteBlogById =async (req,res) =>{
    try {
       const id = req.params.id;
       await BlogModel.findByIdAndDelete(id);
       res.status(200).json({message: "Task Deleted", success: true});
    } catch (error) {
       res.status(500).json({message: "Failed to Delete the Tasks", success: false}); 
    }

}



module.exports = {
    createData,
    fetchData,
    UpdateBlogById,
    DeleteBlogById
}