import User from '../models/user.js';

export const getUsers = (req, res) => {
    User.find().sort({ createdAt: -1 })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => console.log(err))
}

export const createUser = (req, res) => {
    const user = new User(req.body)
    user.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
}

export const getUser = (req, res) => {
    const {id} = req.params;
    User.findById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => console.log(err))
}

export const deleteUser = (req, res) => {
    const {id} = req.params;

    User.findByIdAndDelete(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => console.log(err))
}

//This updates the record im the database and checks for valid parameters.
//See below for a more simpler implementation.
export const updateUser = (req, res) => {
    const {id} = req.params;
    const { firstName, lastName, age} = req.body;
    User.findById(id)
    .then((user) => {
        if(firstName) {
            user.firstName = firstName;
        }
    
        if(lastName) {
            user.lastName = lastName;
        }
    
        if(age) {
            user.age = age;
        }
        user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err))
    });
}

//Alternative to the above, without validation the "new: true" option ensures
//that the returned result is the new record rather than the previous old unaltered
//one that Mongoose / MongoDB returns by default.
export const updateUserAlt = (req, res) => {
    const id = req.params.id;
    User.findOneAndUpdate({_id:id}, {...req.body}, {new: true})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });

}