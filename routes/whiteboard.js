const express = require('express')
const Whiteboard = require('../models/WhiteboardModel.js')
const User = require('../models/UserModel.js');
const router = express.Router();
const bodyParser = require('body-parser');
// router.get('/:username' , async (req,res)=>{
//     const { username }= req.params;
//     console.log(username)
//     // console.log(username)
//     const user = await User.findOne({ username: username });
//     console.log(user)
//     res.status(200).json({ message: 'Login successful', user: user });
//         // const whiteboards = await Whiteboard.find({}).exec();
//         // res.send(json(whiteboards))
// })

// router.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username: username });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         // Compare passwords directly (not secure)
//         if (password !== user.password) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         res.status(200).json({ message: 'Login successful', user: user });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: error.message });
//     }
// });

// GET ALL WHITEBOARDS HERE
router.post('/whiteboards', async (req,res) =>{
    try {
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

// GET ALL WHITEBOARDS HERE
router.get('/whiteboards/count/:user_id', async (req, res) => {
    
    try {
        const userId = req.params.user_id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const whiteboardCount = user.whiteboards.length;
        const newWhiteboard = {
            name: `Whiteboard ${whiteboardCount + 1}`
        };

        user.whiteboards.push(newWhiteboard);
        await user.save();

        const newWhiteboardObj = user.whiteboards[user.whiteboards.length - 1];
        res.status(200).json({ message: 'New whiteboard added successfully', whiteboardObject: newWhiteboardObj });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.put('/saveWhiteboard', async (req, res) => {
    const { document, session, userId, boardId } = req.body;
    console.log(document)
    try {


        if (!document || !session || !userId || !boardId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const whiteboard = user.whiteboards.id(boardId);
        if (!whiteboard) {
            return res.status(404).json({ message: 'Whiteboard not found' });
        }

        whiteboard.document = JSON.stringify(document);
        whiteboard.session = JSON.stringify(session);
        whiteboard.snapshot = JSON.stringify({ document, session });

        await user.save();
        res.status(200).json({ message: 'Save successful!' });
    } catch (error) {
        console.error('Error saving whiteboard:', error.message);
        res.status(500).json({ message: error.message });
    }
});


// router.get('/boardname/:userId/:boardId', async (req,res)=>{
//     const userId = req.params.userId
//     const boardId = req.params.boardId
//     const user = await User.findById(userId)
//     const boardname = 
//     res.status(200).json({message:"get successful"},board)
// })

router.get('/loadWhiteboard/:userId/:boardId', async (req,res)=>{
    const userId = req.params.userId
    const boardId = req.params.boardId
    const user = await User.findById(userId);
    const whiteboard = user.whiteboards.id(boardId)
    const document = whiteboard.document

    const session = whiteboard.session

    res.status(200).json({ message: 'Save successful!',  document:document, session:session})
})



router.get('/lastthreewhiteboards/:userId', async (req,res)=>{
    const userId = req.params.userId
    const user = await User.findById(userId);
    const displayBoardsCount = () => {
        if (user.whiteboards.length >=3 ){
            return 3
    } else{
    return user.whiteboards.length
    } 
}  
    const boardsToDisplayCount = displayBoardsCount()
    // console.log(boardsToDisplayCount)
    const toDisplayBoards =[];
    const getLastThreeBoardsbase64 =() =>{
    for ( let i=0; i<boardsToDisplayCount; i++){
        toDisplayBoards.push(user.whiteboards[user.whiteboards.length-i-1])
    }     
    }
    getLastThreeBoardsbase64()
    return res.status(200).json({
        message:"Got last 3 board as objects", 
        displayBoards: toDisplayBoards})
}
)

router.delete('/deleteWhiteboard/:userId/:boardId', async (req,res)=> {
    try{
        const userId = req.params.userId
        const boardId = req.params.boardId
        const user = await User.findById(userId)
        user.whiteboards.pull(boardId)
        user.save()
        return res.status(200).json({message:"board deleted"})
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }});


// Example usage





// router.post('/saveSnapshot', async (req, res) => {
//     try {
//         const { userId, whiteboardJson } = req.body;

//         // Find the user by ID and update the whiteboard_json field
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//         }

//         console.log(user)
//         await user.save();

//         res.status(200).send({ message: 'Snapshot saved successfully', user });
//     } catch (error) {
//         res.status(500).send({ message: 'Error saving snapshot', error });
//     }
// });




// CREATE A NEW WHITEBOARD
// router.post('/new', async (req, res) => {
//     try {
//         const  userinfo  = req.body;
//         console.log(userinfo)
//         const user = await User.findOne({ username: username });
//         const whiteboard_count = Whiteboard.countDocuments({}, function( err, count){
//             console.log( "Number of users:", count );
//     })
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         // Compare passwords directly (not secure)
//         if (password !== user.password) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         res.status(200).json({ message: 'Login successful', user: user });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: error.message});
//     }
// });
// CREATE A NEW WHITEBOARD


module.exports = router