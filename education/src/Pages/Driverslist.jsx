import React from "react";
import '../Styles/Driverslist.css'
import Drivers from "../Components.jsx/Drivers";
import { Link } from "react-router-dom";

const courses = [
  {
    image: "https://media.istockphoto.com/id/1317804584/photo/one-businesswoman-studio-portrait-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=Tx3nGQfxaI781gi97Siw7DIEBbKg1oBxl8n0JEwMQ6s=", 
    title: "Avanthika menon",
    description: "Full Practice Exam | Learn Cloud Computing | Pass the AWS Certified Solutions Architect Certification SAA-C03!",
    rating: 4.7,
    reviews: "244,647",
    lectures: "401",
    level: "All Levels",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-NV9q05F16g50huet5CWXj-AtbmH30NTR4A&s",
    title: "Betty thomas",
    description: "Full Practice Exam included + explanations | Learn Cloud Computing | Pass the AWS Cloud Practitioner CLF-C02 exam!",
    rating: 4.7,
    reviews: "232,058",
    lectures: "284",
    level: "Beginner",
  },
  {
    image: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
    title: "Alan Titus",
    description: "Become an ethical hacker that can hack like black hat hackers and secure systems like cybersecurity experts.",
    rating: 4.6,
    reviews: "128,703",
    lectures: "145",
    level: "All Levels",
  },
  {
    image: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
    title: "Alan Titus",
    description: "Become an ethical hacker that can hack like black hat hackers and secure systems like cybersecurity experts.",
    rating: 4.6,
    reviews: "128,703",
    lectures: "145",
    level: "All Levels",
  },
];

function Driverslist() {
  return (
    <div style={{background:"linear-gradient(rgb(57, 122, 151),rgb(45, 49, 156))"}} className="app">
        <Link style={{textDecoration:"none",color:"white"}} to={'/teacher'}>      <h1>Our Instructors</h1>
        </Link>
      <div className="course-list">
        {courses.map((course, index) => (
          <Drivers key={index} {...course} />
        ))}
      </div>
    </div>
  );
}

export default Driverslist;
