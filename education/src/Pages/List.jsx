import React from 'react';
import '../Styles/List.css';

const InstructorPage = () => {
  return (
    <div className="instructor-page">
      <div className="instructor-container">
        {/* Profile Image */}
        <div className="profile-section">
          <img
            className="profile-pic"
            src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
            alt="Instructor"
          />
        </div>

        {/* Instructor Details */}
        <div className="details-section">
          <h2 className="title">INSTRUCTOR</h2>
          <h1 className="name">Tanzeel Ur Rehman</h1>
          <h3 className="role">Full Stack Web Developer and SEO Expert</h3>

          <div className="stats">
            <div className="stat">
              <h2>147,864</h2>
              <p>Total students</p>
            </div>
            <div className="stat">
              <h2>8,545</h2>
              <p>Reviews</p>
            </div>
          </div>

          {/* About Section */}
          <h3 className="section-heading">About me</h3>
          <p className="description">
            Tanzeel Ur Rehman has been working with WordPress since he was 13 years old. He spends his whole day, 
            experimenting with HTML, CSS, and JavaScript; dabbling with PHP and MySQL; and inhaling a wide variety of potential 
            information through RSS feeds. He builds websites that <b>delight</b> and <b>inform</b>.
          </p>
          <p className="description">
            He is passionate about teaching others, especially Web Development and WordPress. As an SEO expert, 
            he excels in his field. Tanzeel is also a Software Engineer, graphic designer, and tech geek.
          </p>

          {/* Social Media Links */}
          <div className="social-buttons">
            <button className="social-button website">🌐 Website</button>
            <button className="social-button x">X</button>
            <button className="social-button facebook">📘 Facebook</button>
            <button className="social-button linkedin">🔗 LinkedIn</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
