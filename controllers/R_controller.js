const C_register = require("../models/candidate_register");
const E_register = require("../models/employee_register");
const Job_post = require("../models/job_post");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//for hashing
const saltRounds = 8;

exports.Candidate_r = async (req, res) => {
  await C_register.findOne({ email: req.body.email.toLowerCase() }).then((user) => {
    if (user) {
      return res.render("Cregister",{err:"Email already exist!"});
    } else {
      if (req.body.password === req.body.cpassword && req.body.phone.length == 10) {

        //save the registeration details in database
        const newUser = new C_register({
          first_name: req.body.fname.toLowerCase(),
          last_name: req.body.lname.toLowerCase(),
          email: req.body.email.toLowerCase(),
          phone_number: req.body.phone,
          password: bcrypt.hashSync(req.body.password, saltRounds),
        });

        newUser.save();


        return res.redirect("/clogin");
      } else {
        if (req.body.password !== req.body.cpassword) {
          return res.render("Cregister",{err:"Incorrect detail"});
        } else {
          return res.render("Cregister",{err:"Incorect detail"});
        }
      }
    }
  });
};


exports.Employee_r = async (req, res) => {
    await E_register.findOne({ email: req.body.email.toLowerCase() }).then((user) => {
      if (user) {
        return res.render("Eregister",{err:"Email already exist!"});
      } else {
        if (req.body.password === req.body.cpassword && req.body.phone.length == 10) {
  
          //save the registeration details in database
          const newUser = new E_register({
            first_name: req.body.fname.toLowerCase(),
            last_name: req.body.lname.toLowerCase(),
            email: req.body.email.toLowerCase(),
            phone_number: req.body.phone,
            password: bcrypt.hashSync(req.body.password, saltRounds),
          });
  
          newUser.save();
  
  
          return res.redirect("/elogin");
        } else {
          if (req.body.password !== req.body.cpassword) {
            return res.render("Eregister",{err:"Incorect detail"});
          } else {
            return res.render("Eregister",{err:"Incorect detail"});
          }
        }
      }
    });
  };


  exports.E_login = async (req, res) => {
    await E_register
      .findOne({ email: req.body.email.toLowerCase() })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            //create token
            const token = jwt.sign(
              { id: user._id },
              process.env.TOKEN_SECRET_E.toString(),
              {
                expiresIn: 1000*60*60*24,
              }
            );
  
            //create cookies
            res.cookie("token", token, {
              expires: new Date(Date.now() + 1000*60*60*24),
              secure: false,
              httpOnly: true,
            });
            // res.status(200).send("login succcessfully");
            return res.redirect("/employee");
          } else {
            return res.render("Eregister",{err:"Incorect detail"});
          }
        } else {
          return res.render("Eregister",{err:"Incorect detail"});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.C_login = async (req, res) => {
    await C_register
      .findOne({ email: req.body.email.toLowerCase() })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            //create token
            const token = jwt.sign(
              { id: user._id },
              process.env.TOKEN_SECRET_C.toString(),
              {
                expiresIn: 1000*60*60*24,
              }
            );
  
            //create cookies
            res.cookie("token", token, {
              expires: new Date(Date.now() + 1000*60*60*24),
              secure: false,
              httpOnly: true,
            });
            // res.status(200).send("login succcessfully");
            return res.redirect("/candidate");
          } else {
            return res.render("Cregister",{err:"Incorect detail"});
          }
        } else {
          return res.render("Cregister",{err:"Incorect detail"});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  exports.Postjob = async (req,res)=>{
    const job = new Job_post({
      ...req.body,
      status:"Received",
      owner:req.user.id,
    })
    try{
      job.save();
      return res.render("Job",{data:"Post Successfully"});
    }
    catch(e){
      return res.status(400).send(e);
    }
  }


  exports.logout = (req, res) => {
    res.cookie("token", "", { expires: new Date(Date.now() + 0) });
    return res.redirect("/");
  };


  exports.showJobE = async (req,res)=>{
    const _id = req.user.id;
      const detail = await Job_post.find({owner:_id});
      try{
        return res.render("Employee",{detail});
      }
      catch(e)
      {
        return res.render("Employee",{detail:undefined});
      }
  }

  exports.showJobC = async (req,res)=>{
    const _id = req.user.id;
      const detail = await Job_post.find({status:"Received"});
      try{
        return res.render("Candidate",{detail});
      }
      catch(e)
      {
        return res.render("Candidate",{detail:undefined});
      }
  }


  exports.deleteJob = async (req,res)=>{
    const _id = req.params.id;
  
    try{
     const user =  await Job_post.findByIdAndRemove({_id});
      if(user == null){
        return res.status(400).send("Data not found");
      }
        return res.redirect("/employee");
    }
    catch(e)
    {
      return res.status(400).send(e);
    }
  }

  exports.acc = async (req,res)=>{
    const id = req.params.id;
    const _id = new ObjectID(id);
    try{
    await Job_post.updateOne({_id},
      {
        status:"Accepted",
      });

      return res.redirect("/candidate");
  }
  catch(e){
    return res.status(400).send("something went wrong");
    }
  }

  exports.rej = async (req,res)=>{
    const id = req.params.id;
    const _id = new ObjectID(id);
    try{
    await Job_post.updateOne({_id},
      {
        status:"Rejected",
      });

      return res.redirect("/candidate");
  }
  catch(e){
    return res.status(400).send("something went wrong");
    }
  }

  exports.showAcc = async (req,res)=>{
    const _id = req.user.id;
      const detail = await Job_post.find({status:"Accepted"});
      try{
        return res.render("Accepted",{detail});
      }
      catch(e)
      {
        return res.render("Accepted",{detail:undefined});
      }
  }

  exports.showRej = async (req,res)=>{
    const _id = req.user.id;
      const detail = await Job_post.find({status:"Rejected"});
      try{
        return res.render("Rejected",{detail});
      }
      catch(e)
      {
        return res.render("Rejected",{detail:undefined});
      }
  }

  exports.rec = async (req,res)=>{
    const id = req.params.id;
    const _id = new ObjectID(id);
    try{
    await Job_post.updateOne({_id},
      {
        status:"Received",
      });

      return res.redirect("/candidate");
  }
  catch(e){
    return res.status(400).send("something went wrong");
    }
  }