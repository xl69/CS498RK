var User = require('../models/user');
var Task = require('../models/task');
const express = require('express');
const router = express.Router()
const { ObjectId } = require('bson')

function addPars(s) {
    return "(" + s + ")";
}

router.get('/', async function (req, res) {
    try {           
        let users = await User.find(eval(addPars(req.query.where)))
            .sort(eval(addPars(req.query.sort)))
            .skip(eval(addPars(req.query.skip)))
            .select(eval(addPars(req.query.select)))
            .limit(eval(addPars(req.query.limit)))
            .exec();
        if (users == null) throw "server error";
        else if (req.query.count != null && req.query.count == "true") {
            res.status(200).json({
                message: "OK",
                data: users.length,
            });
        } else {
            res.status(200).json({
                message: "OK",
                data: users,
            });
        }
    } catch(err) {
        res.status(500).json({
            message : err,
            data : [],
        })
    }
})

router.post('/', async function (req, res) {
    if (req.body == null || req.body.email == null || req.body.name == null) {
        res.status(400).json({
            message: 'Invalid request input!',
            data: []
        })
    }
    let user = null;
    if (req.body.pendingTasks == null) {
        user = {
            name: req.body.name,
            email: req.body.email,
            pendingTasks: [],
            dateCreated: Date.now()
        }
    } else {
        user = {
            name: req.body.name,
            email: req.body.email,
            pendingTasks: req.body.pendingTasks,
            dateCreated: Date.now()
        }
    }

    try {
       let hasUser = await User.findOne({email: req.body.email});
       if (hasUser == null) {
            User.create(user)
                .then((info) => {
                        res.status(201).json({
                        message: 'create user', 
                        data: info,
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message : "server error",
                        data : err,
                    })
                });
        } else {
            res.status(400).json({
                message:'user already exists', 
                data: [],
            });
        }
    } catch(err) {
        res.status(500).json({
            message : "server error",
            data : err,
        })
    }
})

router.get('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                message: "invalid input id",
                data: id,
            })
            return;
        }
        user = await User.findById(id).exec();
        if (!user) {
            res.status(404).json({
                message:"not found", 
                data: id,
            });
        } else {
            res.status(200).json({
                message: "OK", 
                data: user,
            });
        }
    } catch(err) {
        res.status(500).json({
            message : "server error",
            data : err,
        })
    }
})

router.put('/:id', async function (req, res) {
    if (req.body == null || req.body.email == null || req.body.name == null) {
        return res.status(400).json({
            message: 'Invalid request input!',
            data: []
        })
    }
    let user = null;
    if (req.body.pendingTasks == null) {
        user = {
            name: req.body.name,
            email: req.body.email,
            pendingTasks: [],
            dateCreated: Date.now()
        }
    } else {
        user = {
            name: req.body.name,
            email: req.body.email,
            pendingTasks: req.body.pendingTasks,
            dateCreated: Date.now()
        }
    }

    try {
        let hasUser = await User.findOne({email: req.body.email});
        if (hasUser == null) {
            res.status(404).json({
                message:"no user found", 
                data: [],
            });
        } else if (user.id !== req.params.id) {
            return res.status(400).json({
                message:'email already exist', 
                data: [],
            });
        } else {
            let newUser = await User.findByIdAndUpdate(req.params.id, {$set: newUser}, {returnOriginal: false});
            return res.status(200).json({
                message:"OK",
                data: newUser,
            });
        }
    } catch(err) {
        res.status(500).json({
            message : "server error",
            data : err,
        })
    }
})

router.delete('/:id', async function (req, res) {
    try {
        id = req.params.id;
        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                message: "invalid input id",
                data: id,
            })
            return;
        }
        let user = await User.findById(id).exec();
        if (user == null) {
            res.status(404).json({
                message: "not found",
                data: [],
            })
        } else {
            user.delete().then(()=>{
                res.status(200).json({
                    message: "OK",
                    data: user,
                })
            })
        }
    } catch(err) {
        res.status(500).json({
            message: "server error",
            data: err,
        })
    }
})

module.exports = router;