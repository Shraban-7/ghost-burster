const Model = require("../db/models");
const Ghost = Model.Ghost;


const ghostCreateView=(req,res)=>{
  const user=req.user;
    res.render('ghost_create',{user:user});
}

const ghostCreate = async (req, res) => {
  try {
    const { room_no,  des, type, price, isAvailable } = req.body;
    const ghostExist = await Ghost.findOne({ where: { room_no } }).catch((err) => {
      console.log("error " + err);
    });
    if (ghostExist) {
      return res.json({
        message: "this ghost already exist",
      });
    }
    await Ghost.create({
      room_no,
  
      des,
      type,
      price,
      isAvailable,
    });
    // res.send("Ghost created successfully!");
    res.redirect("/ghosts/list");
  } catch (error) {
    console.error("Error creating ghost:", error);
    res.status(500).send("Error creating ghost");
  }
};




const getAllGhosts = async (req, res,next) => {
  try {
    const ghosts = await Ghost.findAll();
     const user = req.user.id;
    // console.log(ghosts);

    res.render("ghost_list", { ghosts: ghosts ,user:user}); // the parameter passed to the view
    // res.json(ghosts);
  } catch (error) {
    throw new Error("Error retrieving ghosts: " + error.message);
  }
};

// Get a specific ghost by id

const getGhostById = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  // res.render('test');
  try {
    const ghost = await Ghost.findByPk(id);
    // res.json(ghost);

    res.render('ghost_edit',{ghost:ghost,user:user});
  } catch (error) {
    throw new Error("Error retrieving ghost: " + error.message);
  }
};
const getDetails = async (req, res) => {
  const id = req.params.id;
  const user=req.user.id;
  // res.render('test');
  try {
    const ghost = await Ghost.findByPk(id);
    // res.json(ghost);

    res.render('booking_create',{ghost:ghost,user:user});
  } catch (error) {
    throw new Error("Error retrieving ghost: " + error.message);
  }
};

const ghostUpdate = async (req, res) => {
  const id = req.params.id;
  const { room_no, des, type, price, isAvailable } = req.body;
  // const room_no= req.body.room_no;
  try {
    const ghost = await Ghost.findByPk(id);
    
    await ghost.update({
      isAvailable 
    });
    // req.render('test');
    // res.json(ghost);
     res.redirect("/ghosts/list");
  } catch (error) {
    throw new Error("Error updating ghost: " + error.message);
  }
};

const ghostDelete = async (req,res)=>{
    const id = req.params.id;
    try {
      const ghost = await Ghost.findByPk(id);
      if (!ghost) {
        throw new Error("Ghost not found");
      }
      await ghost.destroy();
      res.redirect("/ghosts/list");
      // res.send("Ghost deleted successfully");
    } catch (error) {
      throw new Error("Error deleting ghost: " + error.message);
    }
}

module.exports = {
  ghostCreate,
  getAllGhosts,
  getGhostById,
  ghostUpdate,
  ghostDelete,
  ghostCreateView,
  getDetails,
};
