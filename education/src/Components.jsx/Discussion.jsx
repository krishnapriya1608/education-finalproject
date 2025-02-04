import React, { useState, useEffect } from "react";
import { getdiscussion, addComment } from '../Service/allAPI'; // Import deleteComment
import { useNavigate } from 'react-router-dom';
import axios from "axios";
 
const Discussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState({}); // For the new comment input
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get user from local storage

  const fetchDiscussions = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("Token is missing! Please log in again.");
      navigate("/login"); // Redirect to login if no token
      return;
    }


    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await getdiscussion(reqHeader);
      if (response.status === 200) {
        setDiscussions(response.data);
      } else {
        setErrorMessage("Failed to fetch discussions.");
      }
    } catch (error) {
      setErrorMessage("Error fetching discussions.");
      console.error("Error fetching discussions:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchDiscussions(); // Fetch discussions after ensuring user is logged in
    } else {
      setErrorMessage("You are not logged in. Please log in.");
      navigate("/login"); // Redirect to login if no token
    }
  }, []);

  const handleCommentChange = (discussionId, value) => {
    setNewComment((prev) => ({
      ...prev,
      [discussionId]: value, // Update the comment for the specific discussion
    }));
  };

  const handleAddComment = async (discussionId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to add a comment.");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const commentData = {
      comment: newComment[discussionId] || "",
      user: { _id: user._id, name: user.name },
    };

    try {
      const response = await addComment(discussionId, commentData, reqHeader);
      if (response.status === 200) {
        setNewComment((prev) => ({
          ...prev,
          [discussionId]: "", // Clear the input field for the specific discussion
        }));
        fetchDiscussions(); // Reload discussions
      } else {
        alert("Failed to add comment.");
      }
    } catch (error) {
      alert("Error adding comment.");
      console.error("Error adding comment:", error);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (discussionId, commentId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.delete(`http://localhost:5020/api/discussions/${discussionId}/`, { headers: reqHeader });

      if (response.status === 200) {
        alert("Comment deleted successfully!");
        // Remove the deleted comment from the discussions state
        setDiscussions(discussions.map(discussion =>
          discussion._id === discussionId
            ? { ...discussion, comments: discussion.comments.filter(comment => comment._id !== commentId) }
            : discussion
        ));
      } else {
        alert("Failed to delete comment.");
      }
    } catch (error) {
      alert("Error deleting comment.");
      console.error("Error deleting comment:", error);
    }
  };


  return (
    <div style={styles.container}>
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
         <div style={{width:"200px",height:"100px",backgroundColor:"rgb(162, 129, 172)",borderRadius:"5px 10px 5px 10px",position:"relative",bottom:"10px",right:"80px"}}>
      <button onClick={() => setShowModal(true)} style={styles.openModalButton}>View All Posts</button>
      </div>
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>All Posts</h2>
            <div style={styles.postsList}>
              {discussions.map((discussion) => (
                <div key={discussion._id} style={styles.postItem}>
                  <div style={styles.postHeader}>
                    <h3>{discussion.title}</h3>
                    <span style={styles.timestamp}>
                      {new Date(discussion.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p>{discussion.description}</p>
                  <p><strong>Posted by:</strong> {discussion?.user.name || "Anonymous"}</p>

                  {/* Comment Section */}
                  <div>
                    <h4>Comments</h4>
                    <div>
                      {discussion.comments.map((c, index) => {
                        const commenterName = c.user ? c.user.name : "Anonymous"; // Default to "Anonymous" if user is missing
                        return (
                          <div key={index} style={styles.commentItem}>
                            <p>
                              <strong>{commenterName}:</strong> {c.comment}
                            </p>
                            {user._id === c.user?._id && ( // Check if the current user is the author of the comment
                              <button
                                onClick={() => handleDeleteComment(discussion._id, c._id)}
                                style={styles.deleteButton}
                              >
                                Delete Comment
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <textarea
                      value={newComment[discussion._id] || ""}
                      onChange={(e) => handleCommentChange(discussion._id, e.target.value)}
                      placeholder="Add a comment"
                      style={styles.commentInput}
                    />
                    <button
                      onClick={() => handleAddComment(discussion._id)}
                      style={styles.commentButton}
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowModal(false)} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    height: "100px",
    borderRadius: "8px",
    Color:"#f5f5f5",
  },
  openModalButton: {
    padding: "10px ",
    backgroundColor: "rgb(181, 160, 179)",
    color: "#fff",
    border: "none",
    borderRadius: "5px 10px 5px 10px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "30px",
    marginLeft:"30px"
    
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "80%",
    maxHeight: "80vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  postsList: {
    listStyleType: "none",
    padding: "0",
  },
  postItem: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
  },
  postHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  timestamp: {
    fontSize: "0.8rem",
    color: "#888",
  },
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  commentInput: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    fontSize: "1rem",
  },
  commentButton: {
    padding: "10px 20px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "10px",
  },
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "5px",
    fontSize: "0.9rem",
  },
};

export default Discussion;
