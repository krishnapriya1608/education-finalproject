import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adddiscussion, getdiscussion } from '../Service/allAPI';
import axios from 'axios';

const DiscussionPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    createdAt: new Date().toISOString(),
    user: user ? user._id : "",
  });

  useEffect(() => {
    if (user) {
      setData(prevData => ({ ...prevData, user: user._id }));
    }
  }, [user]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const { title, description, createdAt, user } = data;
    if (!title || !description || !createdAt) {
      alert("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token is missing! Please log in again.");
      return;
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await adddiscussion(data, reqHeader);
      if (response.status === 201) {
        alert("Post submitted successfully!");
        setShowPostModal(false);
        fetchDiscussions();
      }

      setData({
        title: "",
        description: "",
        createdAt: new Date().toISOString(),
        user: user._id,
      });
    } catch (error) {
      console.error("Error creating discussion:", error);
    }
  };

  const fetchDiscussions = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You are not logged in. Please log in.");
      navigate("/login");
      return;
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await getdiscussion(reqHeader);
      console.log(response.data);  // Add this line to inspect the structure of the data

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
      fetchDiscussions();
    } else {
      navigate("/login");
    }
  }, [navigate]);

 

  const handleLike = (postId) => {
    const updatedDiscussions = discussions.map(post =>
      post._id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
    );
    setDiscussions(updatedDiscussions);
  };

  const handleDislike = (postId) => {
    const updatedDiscussions = discussions.map(post =>
      post._id === postId ? { ...post, dislikes: (post.dislikes || 0) + 1 } : post
    );
    setDiscussions(updatedDiscussions);
  };
  const handleDelete = async (postId) => {
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
        const response = await axios.delete(`http://localhost:5020/api/discussions/discussion/${postId}`, { headers: reqHeader });

        if (response.status === 200) {
            alert("Post deleted successfully!");
            setDiscussions(discussions.filter(post => post._id !== postId));  
        } else {
            alert("Failed to delete the post");
        }
    } catch (error) {
        alert("Error deleting post");
        console.error("Error deleting post:", error);
    }
};

  return (
    <div style={styles.container}>
      <Link style={{ textDecoration: "none" }} to={'/dash'}>
        <h1 style={styles.heading}>Discussion Forum</h1>
      </Link>

      <button onClick={() => setShowPostModal(true)} style={styles.postButton}>Post Question</button>

      {showPostModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Ask a New Question</h2>
            <input
              type="text"
              placeholder="Enter Post Title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              style={styles.titleInput}
            />
            <textarea
              placeholder="Ask a question or share knowledge..."
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              style={styles.textarea}
            />
            <input
              type="date"
              value={data.createdAt.split("T")[0]}
              onChange={(e) => setData({ ...data, createdAt: e.target.value })}
              style={styles.dateInput}
            />
            <button onClick={handlePostSubmit} style={styles.postButton}>Post Question</button>
            <button onClick={() => setShowPostModal(false)} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}

      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

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
            <p><strong>Posted by:</strong> {discussion.user?.name || "Anonymous"}</p>
            <div>
              <h4>Comments</h4>
              {discussion.comments?.length > 0 ? (
                discussion.comments.map((comment, index) => (
                  <p key={index}>
                    <strong>{comment?.user?.name || "Anonymous"}:</strong> {comment.comment}
                  </p>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>

            {/* Delete button (visible only for the post author) */}
            {user && user._id === discussion.user?._id && (
              <button
                onClick={() => handleDelete(discussion._id)}
                style={styles.deleteButton}
              >
                Delete Post
              </button>
            )}

            <div style={styles.postActions}>
              <button onClick={() => handleLike(discussion._id)} style={styles.likeButton}>Like ({discussion.likes || 0})</button>
              <button onClick={() => handleDislike(discussion._id)} style={styles.dislikeButton}>Dislike ({discussion.dislikes || 0})</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(to right,rgb(34, 96, 130),rgb(142, 182, 185))",

    padding: "20px",
    maxWidth: "1600px",
    margin: "0 auto",

     borderRadius: "8px",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    textAlign: "center",
    color: "rgb(59, 50, 131)",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  postButton: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  titleInput: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "vertical",
    height: "100px",
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
  postActions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  likeButton: {
    padding: "5px 10px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  dislikeButton: {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default DiscussionPage;
