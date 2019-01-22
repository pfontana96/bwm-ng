const User = require('../models/user');
const {normalizeErrors} = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = function(req, res){
    
    const { email, password} = req.body;
    if(!password || !email){
        return res.status(422).send({title: "Data missing", detail: "Provide email and password"});
    }
    User.findOne({email}, function(err, user){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if(!user){
            return res.status(422).send({title: "Invalid user", detail: "User does not exist"});
        }

        if(user.hasSamePassword(password)){
            //return token
            const token = jwt.sign({
                userId: user.id,
                username: user.username
              }, config.SECRET, { expiresIn: '1h' }); 
            return res.json(token);

        }else{
            return res.status(422).send({title: "Wrong Data", detail: "Wrong password or user"});
        }
    });

}

exports.register = function(req, res){
    const {username, email, password, passwordConfirmation} = req.body;

    if(!password || !email){
        return res.status(422).send({title: "Data missing", detail: "Provide email and password"});
    }

    if(password !== passwordConfirmation){
        return res.status(422).send({title: "Invalid Password", detail: "Passwords are not the same"});
    }

    User.findOne({email}, function(err, exisitingUser){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)}); 
        }

        if(exisitingUser){
            return res.status(422).send({title: "Invalid email", detail: "Email is already registered"});
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function(err){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            return res.json({'registered': true});
        })
    })

}

exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;
    if(token){
        const user = parseToken(token);
        User.findById(user.userId, function(err, user){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            if(user){
                res.locals.user = user;
                next();
            }else{
                return notAuthorized(res);        
            }
        });
    }else{
        return notAuthorized(res);
    }
}


function parseToken(token){
    // Token by default is coded as 'Bearer jahfahfawhefaelfhskdhflah'
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res){
    return res.status(401).send({errors: 'Not authorized', detail: 'You need to log in.'});
}