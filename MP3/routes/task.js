const express = require('express');
const router = express.Router()
var User = require('../models/user');
var Task = require('../models/task');
const { ObjectId } = require('bson')

function addPars(s) {
    return "(" + s + ")";
}

router.get('/', async function (req, res) {
    try {
        let tasks = await Task.find(eval(addPars(req.query.where)))
            .sort(eval(addPars(req.query.sort)))
            .select(eval(addPars(req.query.select)))
            .skip(eval(addPars(req.query.skip)))
            .limit(eval(addPars(req.query.limit)));
        if (tasks == null) throw "server error";
        else if (req.query.count != null && req.query.count == "true") {
            res.status(200).json({
                message: "OK",
                data: tasks.length,
            });
        } else {
            res.status(200).json({
                message: "OK",
                data: tasks,
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
    if (!req.body || !req.body.name || !req.body.deadline) {
        return res.status(400).json({
            message: 'Invalid request input!',
            data: [],
        })
    }

    var newTask = {
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        completed: req.body.completed,
        assignedUser: req.body.assignedUser ? req.body.assignedUser : "",
        assignedUserName: req.body.assignedUserName ? req.body.assignedUserName: "unassigned",
        dateCreated: Date.now()
    }

    let hasAssignUser = req.body.assignedUser;
    if (!hasAssignUser) {
        try {
            createdTask = Task.create(newTask);
            if (createdTask) {
                res.status(201).json({
                    message: 'created', 
                    data: taskData
                });
            } else {
                throw "server error, cannot created"
            }
        } catch (error) {
            res.status(500).json({
                message : error,
                data : [],
            })
        }
        return;
    }
    try {
        let postId = await User.findById(hasAssignUser).exec();
        if (postId.name == req.body.assignedUserName) {
            Task.create(newTask)
                .then((taskDetail)=>{
                    User.findByIdAndUpdate(hasAssignUser, {$push: {pendingTasks: taskDetail._id}})
                    res.status(201).json(
                        {message: 'created', 
                        data: taskDetail,
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: 'cannot created', 
                        data: err,
                    });
                })
        } else {
            res.status(400).json({
                message: 'input not valid',
                data: [],
            })
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
        id = req.params.id;
        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                message: "invalid input id",
                data: id,
            })
            return;
        }
        getTask = await Task.findById(id).exec();
        if (!getTask) {
            res.status(404).json({
                message: "not found",
                data: id,
            })
        } else {
            res.status(200).json({
                message: "OK",
                data: getTask,
            })
        }
    } catch(err) {
        res.status(500).json({
            message : "server error",
            data : err,
        })
    }
})

router.put('/:id', async function (req, res) {
    if (!req.body || !req.body.name || !req.body.deadline) {
        res.status(400).json({
            message: 'Invalid request input!',
            data: [],
        })
        return;
    }
    var newTask = {
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        completed: req.body.completed,
        assignedUser: req.body.assignedUser ? req.body.assignedUser : "",
        assignedUserName: req.body.assignedUserName ? req.body.assignedUserName: "unassigned",
        dateCreated: Date.now()
    }
    try {
        id = req.params.id;
        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                message: "invalid input id",
                data: id,
            })
            return;
        }
        let findAndUpdateId = await Task.findByIdAndUpdate(id, {$set: newTask}, {returnOriginal: false});
        if (findAndUpdateId) {
            let hasAssignUser = req.body.assignedUser;
            let hasCompleted = req.body.completed;
            if (!hasAssignUser && !hasCompleted) {
                res.status(200).json({
                    message:"OK", 
                    data: findAndUpdateId,
                });
            } else if (hasAssignUser && hasCompleted) {
                User.findByIdAndUpdate(req.body.assignedUser, {$pull: {pendingTasks: findAndUpdateId._id}})
                    .then(()=>{
                        res.status(200).json({
                            message:"OK", 
                            data: findAndUpdateId});
                        })
                    .catch((err) => {
                        res.status(404).json({
                            message:"user not found", 
                            data: findAndUpdateId
                        });
                    });
            } else if (hasAssignUser && !hasCompleted) {
                User.findByIdAndUpdate(req.body.assignedUser, {$push: {pendingTasks: tsk._id}})
                    .then(() => {
                        res.status(200).json({
                            message: "OK", 
                            data: findAndUpdateId,
                        });
                    })
                    .catch((err) => {
                        res.status(404).json({
                            message:"user not found", 
                            data: findAndUpdateId,
                        });
                    });
                }
        } else {
            res.status(404).json({
                message:"not found", 
                data: id,
            });
        }
    } catch(err) {
        res.status(500).json({
            message: "server error",
            data: err,
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
        let deleteId = await User.findById(req.params.id).exec();
        if (deleteId == null) {
            res.status(404).json({
                message: "not found",
                data: [],
            })
        } else {
            user.delete().then(()=>{
                res.status(200).json({
                    message: "OK",
                    data: deleteId,
                })
            })
        }
    } catch(err) {
        res.status(500).json({
            message : "server error",
            data : err,
        })
    }
})

module.exports = router;