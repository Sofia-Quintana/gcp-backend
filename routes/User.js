const express = require('express');
const router = express.Router();
const pool = require('../database/connection');

//sign up endpoint
router.post('/sign-up', (request, response) => {
    console.log(request.body)
    const {name, username, password, biography, gravatar}= request.body;
    try {
        // username verification 
        pool.query("SELECT * FROM User WHERE username=? ;", [username], (error, result) => {
            if (error) throw error;
            if (result.length == 0) {
                let query = "INSERT INTO User (name, username, password, biography, avatar) VALUES(?,?,?,?,?);";
                pool.query(query, [name, username, password, biography, gravatar], (error, result) => {
                    if (error) throw error;
                });
                response.status(200).json({ message: 'User created successfully'});
            }else{
                response.status(409).json({ error: 'Username already exists, select a new one'}); 
            }
          });
    } catch (error) {
        response.status(500).json({ error: error });
    }
});

// log in endpoint
router.post('/log-in', (request, response) => {
    const { username, password } = request.body;
    try {
        let query = "SELECT * FROM User WHERE username=? ;"
        pool.query(query, [username], (error, result) => {
            if (error) throw error;
            if (result.length > 0) {
                const data = result[0];
                if ( data.password == password) {
                    response.status(200).json({ message: data});
                } else {
                    response.status(401).json({ error:'Password is incorrect, try again' }); 
                }
            }else{
                response.status(404).json({ error: 'Username does not match any registry in database' }); 
            }
        });
    } catch (error) {
        response.status(404).json({ error: error });
    }
});

//updated user data endpoint
router.put('/update', (request, response) => {
    console.log(req.body)
    const {name, username, password, biography, gravatar}= request.body;
    try {
        pool.query("SELECT * FROM User WHERE username=? ;", [username], (error, result) => {
            if (error) throw error;
            if (result.length != 0) { 
                //updating registry
                let query = "UPDATE User SET name=?, password=?, biography=?, avatar=? WHERE username=? ;";
                pool.query(query, [name, password, biography, gravatar, username], (error, result) => {
                    if (error) throw error;
                });
                response.status(200).json({ message: 'User has been updated successfully' });
            }else{
              response.status(409).json({ error: 'Username does not match any registry in database' }); 
            }
          });
    } catch (error) {
        response.status(500).json({ error: error });
    }
});

//delete user endpoint
router.delete('/delete', (request, response) => {
    const { username } = request.body;
    try {
        pool.query("SELECT * FROM User WHERE username=? ;", [username], (error, result) => {
            if (error) throw error;
            if (result.length != 0) { 
                let query = "DELETE FROM User WHERE username=? ;";
                pool.query(query, [username], (error, result) => {
                    if (error) throw error;
                });
                response.status(200).json({ message: 'User was deleted successfully' });
            }else{
              response.status(409).json({ error: 'Username does not match any registry in database'}); 
            }
          });
    } catch (error) {
        response.status(500).json({ error: error});
    }
});

//update user password endpoint
router.patch('/update-password',  (request, response) => {
    const { username, password }= request.body;
    try {
        pool.query("SELECT * FROM User WHERE username=? ;", [username], (error, result) => {
            if (error) throw error;
            if (result.length != 0) { 
                let query = "UPDATE User SET password=? WHERE username=? ;";
                pool.query(query, [password, username], (error, result) => {
                    if (error) throw error;
                });
                response.status(200).json({ message: 'Password was updated successfully' });
            }else{
              response.status(409).json({ error: 'Username does not match any registry in database' }); 
            }
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

module.exports = router;