const router = require("express").Router();
const   R_controller = require("../controllers/R_controller");
const  C_dash = require("../middleware/C_auth");
const E_auth = require("../middleware/E_auth");

//after login get request
router.get("/employee/post",E_auth.authAuthorization,async (req,res)=>{
    res.render("Job",{data:""})
})

router.get("/employee/delete/:id",E_auth.authAuthorization,R_controller.deleteJob);

router.get("/candidate/acc/:id",E_auth.authAuthorization,R_controller.acc);

router.get("/candidate/rej/:id",E_auth.authAuthorization,R_controller.rej);

router.get("/candidate/rec/:id",E_auth.authAuthorization,R_controller.rec);

router.get("/candidate/accepted",E_auth.authAuthorization,R_controller.showAcc);

router.get("/candidate/rejected",E_auth.authAuthorization,R_controller.showRej);

//after login post request
router.post("/employee/post",E_auth.authAuthorization,R_controller.Postjob);



//get request
router.get("/",C_dash.authAuthorization,async (req,res)=>{
    res.render("Eregister",{err:""});
})

router.get("/cregister",C_dash.authAuthorization,async (req,res)=>{
    res.render("Cregister",{err:""});
})

router.get("/elogin",C_dash.authAuthorization,async (req,res)=>{
    res.render("Elogin",{err:""});
})

router.get("/clogin",C_dash.authAuthorization,async (req,res)=>{
    res.render("Clogin",{err:""});
})

router.get("/employee",E_auth.authAuthorization,R_controller.showJobE);

router.get("/candidate",E_auth.authAuthorization,R_controller.showJobC);

router.get("/logout",R_controller.logout);

//post request
router.post("/", R_controller.Employee_r)

router.post("/cregister", R_controller.Candidate_r)

router.post("/elogin",R_controller.E_login)

router.post("/clogin",R_controller.C_login)

module.exports = router;