const express = require('express');
const Discussion = require('../models/Discussion');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a discussion
router.post('/create', authenticateToken, async (req, res) => {
    const { title, description, createdAt } = req.body;

    try {
        const newDiscussion = new Discussion({
            title,
            description,
            user: req.user.id,
            createdAt,
            
          
           
        });

        await newDiscussion.save();
        res.status(201).json({ message: 'Discussion created successfully', discussion: newDiscussion });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Get all discussions
router.get('/getdiscussion', authenticateToken, async (req, res) => {
    try {
        const discussions = await Discussion.find()
            .populate('user', 'name email')  // Populate user field with name and email
            .populate('comments.user', 'name email')  // Populate user field within each comment with name and email
        res.status(200).json(discussions);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Add a comment to a discussion
router.post('/:id/comment', authenticateToken, async (req, res) => {
    const { comment } = req.body;
    const { id } = req.params;
    try {
        const discussion = await Discussion.findById(id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

        // Add comment to the discussion
        discussion.comments.push({
            user: req.user.id,  // Store the user id
            comment
        });

        // Save the discussion
        await discussion.save();

        // Populate user information after saving the comment
        const populatedDiscussion = await Discussion.findById(id).populate('comments.user');

        // Send the populated discussion with user details in comments
        res.status(200).json({ message: 'Comment added successfully', discussion: populatedDiscussion });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Like a discussion
router.post('/:id/like', authenticateToken, authorizeRole('teacher'),async (req, res) => {
    const { id } = req.params;
    try {
        const discussion = await Discussion.findById(id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

        discussion.likes += 1;
        await discussion.save();

        res.status(200).json({ message: 'Liked successfully', likes: discussion.likes, dislikes: discussion.dislikes });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Dislike a discussion
router.post('/:id/dislike', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const discussion = await Discussion.findById(id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

        discussion.dislikes += 1;
        await discussion.save();

        res.status(200).json({ message: 'Disliked successfully', likes: discussion.likes, dislikes: discussion.dislikes });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Like a comment
router.post('/:discussionId/comments/:commentId/like', authenticateToken, async (req, res) => {
    const { discussionId, commentId } = req.params;
    try {
        const discussion = await Discussion.findById(discussionId);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

        const comment = discussion.comments.id(commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        comment.likes += 1;
        await discussion.save();

        res.status(200).json({ message: 'Comment liked successfully', likes: comment.likes, dislikes: comment.dislikes });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Dislike a comment
router.post('/:discussionId/comments/:commentId/dislike', authenticateToken, async (req, res) => {
    const { discussionId, commentId } = req.params;
    try {
        const discussion = await Discussion.findById(discussionId);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

        const comment = discussion.comments.id(commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        comment.dislikes += 1;
        await discussion.save();

        res.status(200).json({ message: 'Comment disliked successfully', likes: comment.likes, dislikes: comment.dislikes });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});





  router.delete('/discussion/:id', authenticateToken, authorizeRole('student'), async (req, res) => {
    try {
        const discussionId = req.params.id;
        const userId = req.user._id; // Extracted from token

        // Find the discussion post
        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ message: "Discussion not found" });
        }

        // Check if the logged-in user is the owner
        if (discussion.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }

        // Delete the discussion
        await Discussion.findByIdAndDelete(discussionId);
        res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Server error" });
    }
});


  // Delete a comment
  router.delete("/:id", authenticateToken,authorizeRole('teacher'), async (req, res) => {
    try {
        const discussionId = req.params.id;
        const deletedPost = await Discussion.findByIdAndDelete(discussionId);

        if (!deletedPost) {
            return res.status(404).json({ message: "Discussion post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
});


module.exports = router;
