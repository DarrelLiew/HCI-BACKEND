const express = require('express')
const User = require('../models/UserModel.js')
const router = express.Router();
const { type } = require('os');

router.post('/', async (req,res) =>{
    try {
        const user = await User.create(req.body.username)
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare passwords directly (not secure)
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user: user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message+`connection secured ` });
    }
});

router.post('/create-user', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Received request body for user creation:', req.body);
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.\nPlease choose a different username.' });
        }

        console.log(`Creating user with username: ${username} and password: ${password}`);
        const user = await User.create({ username, password });
        res.status(200).json(user);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ message: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        return res.status(200).json({message: "got user id", user:user},
        )
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
    })

    //     const lastWhiteboardId = user.whiteboards[user.whiteboards.length-1]._id
    //     lastWhiteboard =  user.whiteboards.id(lastWhiteboardId)
    //     // console.log(`lastwhiteboard`+lastWhiteboard)
    //     if (user && user.whiteboards.length > 0) {

    //         const lastWhiteboard = user.whiteboards[user.whiteboards.length - 1];


    //         // Check if the last whiteboard has a document
    //         if (!lastWhiteboard.document) {
    //             // user.whiteboards.pop();
    //             await user.save();
    //             console.log('Last whiteboard removed due to missing document');
    //         } else {
    //             console.log('Document exists:', lastWhiteboard.document);
    //         }

    //         console.log('Total whiteboards after check:', user.whiteboards.length);
    //         return res.status(200).json({ message: "Check success", user: user });
    //     } else {
    //         return res.status(404).json({ message: "User not found or no whiteboards available" });
    //     }
    // } catch (error) {
    //     console.error(error.message);
    //     return res.status(500).json({ message: error.message });
    // }



// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params; 
//         const user = await User.findById(id);  // Fetch the user by ID from the database
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });  // Handle the case where no user is found
//         }
//         res.status(200).json(user);
//         console.log(`Valid User: ${user}`);  // Logging the user info correctly
//     } catch (error) {
//         console.error(error.message);  // Logging to the console correctly
//         res.status(500).json({ message: error.message });  // Send error message in response
//     }
// });


module.exports = router