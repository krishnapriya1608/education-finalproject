import React, { useState } from 'react';
import { adddEvent } from '../Service/allAPI';
import '../Styles/Eventscreate.css';

const Eventscreate = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [data, setData] = useState({
        name: "",
        description: "",
        image: null,
        date: "",
        teacher: user ? user._id : "",
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, description, date, image } = data;

        if (!name || !description || !date) {
            setError('Please fill out all fields.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token is missing.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('date', date); 
        formData.append('image', image);

        const reqHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        };

        try {
            const response = await adddEvent(formData, reqHeaders);

            if (response.status === 200) {
                setSuccessMessage('Event created successfully!');
                setData({
                    name: "",
                    description: "",
                    image: null,
                    date: "",
                    teacher: user ? user._id : "",
                });
                setIsModalOpen(false); // Close the modal on success
            } else {
                alert("Event creation failed");
                console.log(response);
            }
        } catch (err) {
            alert(err.response ? err.response.data.message : 'Server error');
            console.error("Error details:", err.response || err);
        }
    };

    return (
        <div style={{marginLeft:"120px",marginTop:"15px",borderRadius: "5px 10px 5px 10px",color:"green"}}>
            <div style={{width:"200px",height:"100px",backgroundColor:"rgb(138, 164, 102)",position:"relative",right:"70px",borderRadius:"5px 10px 5px 10px",bottom:"10%"}}>
                <button style={{borderRadius: "5px 10px 5px 10px",color:"white",backgroundColor:"rgb(133, 147, 115)",marginTop:"30px",marginLeft:"20px"}} onClick={() => setIsModalOpen(true)}>Create Event</button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Create Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Event Name:</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={data.name} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div>
                                <label>Description:</label>
                                <textarea 
                                    name="description"
                                    value={data.description} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div>
                                <label>Date:</label>
                                <input 
                                    type="datetime-local" 
                                    name="date"
                                    value={data.date} 
                                    onChange={handleChange} 
                                />
                            </div>

                            {error && <div style={{ color: 'red' }}>{error}</div>}
                            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

                            <button type="submit">Create Event</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Eventscreate;
