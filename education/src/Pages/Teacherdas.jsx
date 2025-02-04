import React, { useEffect, useRef, useState } from 'react';
import '../Styles/Teacher.css';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, Area } from 'recharts';

import { Link } from 'react-router-dom';



import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Col, Row } from 'react-bootstrap';


function Teacherdas() {
  // Data for LineChart
  const data = [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 500 },
    { month: 'Apr', value: 600 },
    { month: 'May', value: 700 },
    { month: 'Jun', value: 800 },
  ];
  const [scrollY, setScrollY] = useState(0);


  // Data for BarChart

  const barData = [
    { name: 'Greenwood ', value: 35, color: 'rgb(127, 54, 23)' },
    { name: 'Bluebell ', value: 30, color: 'rgb(189, 161, 71)' },
    { name: 'Cedarwood ', value: 25, color: 'rgb(119, 174, 42)' },
    { name: 'Sudheer', value: 20, color: 'rgb(30, 168, 145)' },
    { name: 'Oakridge ', value: 15, color: 'rgb(19, 97, 142)' },
    { name: 'Maple  ', value: 10, color: 'rgb(31, 65, 158)' },
  ];
  const sectionRef = useRef(null); 
  const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"],
});

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);  // Moves up
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);   // Moves up slower
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]); 
  const [isTextInView, setIsTextInView] = useState(false);
  const [isImageInView, setIsImageInView] = useState(false);
   // Moves up faster
 
  // Data for PieChart
  const pieData = [
    { name: 'Pass', value: 75 },
    { name: 'Fail', value: 25 },
  ];
 
  const chartRef = useRef(null);
  const isChartInView = useInView(chartRef, { once: true, margin: "-100px" });

  const textRef = useRef(null);

  const COLORS = ['#0088FE', '#00C49F'];
  //testimonals
  const testimonials = [
    {
      quote: "Udemy was rated the most popular online course or certification program for learning how to code according to StackOverflow's 2023 Developer survey.",
      source: "StackOverflow",
      responses: "37,076 responses collected",
      linkText: "View Web Development courses",
      link: "#",
    },
    {
      quote: "Udemy was truly a game-changer and a great guide for me as we brought Dimensional to life.",
      name: "Alvin Lim",
      position: "Technical Co-Founder, CTO at Dimensional",
      linkText: "View this iOS & Swift course",
      link: "#",
    },
    {
      quote: "Udemy gives you the ability to be persistent. I learned exactly what I needed to know in the real world. It helped me sell myself to get a new role.",
      name: "William A. Wachlin",
      position: "Partner Account Manager at Amazon Web Services",
      linkText: "View this AWS course",
      link: "#",
    },
    
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTextInView(true);
            setIsImageInView(true);
          } else {
            setIsTextInView(false);
            setIsImageInView(false);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }  
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className="dashboard">

      {/* sidebar */}
      <div className="main-content">
     

        <div className="right-content">


          
        <motion.div 
  style={{ y: y1 }}  
  className="hero-section"
  initial={{ opacity: 0, y: 50 }}  
  animate={{ opacity: 1, y: 0 }}  
  transition={{ duration: 2, ease: "easeOut" }} 
>
  {/* Logo Text */}
  <h6 className="hero-logo">StudyFusion</h6>

  {/* Heading */}
  <h1 className="hero-title">Grow your skills, define your future</h1>

  {/* Subtitle */}
  <p className="hero-subtitle">
    "Presenting Academy, the tech school for the future. <br />
    We teach you the right skills to be prepared for tomorrow."
  </p>

  {/* Button */}
  <div className="hero-button">
    <Link to={'/auth'}>
      <button className="create-course-btn">Go there</button>
    </Link>
  </div>
</motion.div>


            </div>
           
            <div style={{ marginLeft: "90px" ,marginTop:"30px"}}>
              <img height={"350px"} width={"400px"} src="https://assets.website-files.com/62ce572e448ae60684f0d244/62ce5c62fd06b3ba30e2a39e_hero.svg" alt="" />
            </div>
          </div>
          {/* stati */}
        
         

          <motion.div style={{ y: y2 }} className="stats-section">
      <div className="stat">
        <h3 className="stat-title" style={{ color: "#9f2009" }}>Students</h3>
        <p>
          <i className="fa-solid fa-graduation-cap fa-lg" style={{ color: "#9f2009" }}></i> 75,000+
        </p>
      </div>
      <div className="stat">
        <h3 className="stat-title" style={{ color: "#FFD43B" }}>Expert Mentors</h3>
        <p>
          <i className="fa-solid fa-chalkboard-user fa-lg" style={{ color: "#FFD43B" }}></i> 200+
        </p>
      </div>
      <div className="stat">
        <h3 className="stat-title" style={{ color: "#74C0FC" }}>Courses in Progress</h3>
        <p>
          <i className="fa-brands fa-python fa-lg" style={{ color: "#74C0FC" }}></i> 5
        </p>
      </div>
      <div className="stat">
        <h3 className="stat-title" style={{ color: "rgb(90, 175, 136)" }}>Forum Discussion</h3>
        <p>
          <i className="fa-solid fa-comment fa-lg" style={{ color: "rgb(90, 175, 136)" }}></i> 25
        </p>
      </div>
    </motion.div>
          {/* course section */}
      <motion.div
        style={{ marginTop: "50px", textAlign: "center" }} // Styling for the header section
        className="heading-section"
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>
          Popular Courses
        </h1>
        <Link to={'/card'}>
        <button
          className="view-all-btn"
          style={{
            padding: '10px 20px',
            fontSize: '10px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '5px',
            marginTop: '10px',
            position:"relative",
            left:"40%"

          }}
        >
          View All
        </button>
        </Link>
      </motion.div>

      {/* Course List Section */}
      <motion.div
        style={{ marginTop: "180px" }}
        className="course-list"
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {[
          { title: "UI/UX Design", count: "30+ Courses", color: "goldenrod", icon: "U" },
          { title: "Marketing", count: "25+ Courses", color: "rgb(149, 32, 11)", icon: "M" },
          { title: "Web Dev.", count: "30+ Courses", color: "rgb(92, 175, 53)", icon: "W" },
          { title: "Mathematics", count: "30+ Courses", color: "rgb(164, 162, 23)", icon: "M" },
        ].map((course, index) => (
          <motion.li
            key={index}
            className="course-item"
            transition={{ delay: 0.3 * index }}
            style={{
              transform: `translateY(${-scrollY * 0.3}px)`, // Move upwards as the page scrolls
            }}
          >
            <span className="course-icon" style={{ backgroundColor: course.color }}>
              {course.icon}
            </span>
            <span className="course-title" style={{ color: 'black' }}>
              {course.title}
            </span>
            <span className="course-count" style={{ color: 'black', marginTop: '10px', marginLeft: '10px' }}>
              {course.count}
            </span>
            <button className="view-courses-btn" style={{ color: course.color }}>
              View Courses
            </button>
          </motion.li>
        ))}
      </motion.div>



    {/* Scroll-triggered Text Section */}
    <motion.div
      ref={textRef}
      initial={{ opacity: 0 }}
      animate={isTextInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="course-text-section"
    >
    </motion.div>

    <Row ref={sectionRef} style={{ marginTop: '100px', marginLeft: '50px' }}>
      <Col>
        {/* Text with parallax effect */}
        <motion.p
          style={{
            color: 'rgb(90, 175, 136)',
            fontSize: '20px',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isTextInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          What we provide
        </motion.p>

        <motion.p
        style={{    fontFamily: "Caveat cursive"
        }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isTextInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 100, duration: '0.4' }}
        >
          The best education Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat necessitatibus amet eaque dolorem deleniti maiores, voluptatum quos laboriosam libero excepturi earum minima delectus molestias, est autem pariatur, nobis ea quisquam?
        </motion.p>
      </Col>

      <Col>
        {/* Image with stronger parallax effect */}
        <motion.img
          style={{
            width: '300px',
            marginLeft: '200px',
            marginBottom: '100px',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={isImageInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 2 }}
          src="https://assets.website-files.com/602fe2bf70a39248a71e2197/60366e54342405a30833f84c_Slider-Image.png"
          alt="slider image"
        />
      </Col>
    </Row>
<Row>
      <Col>
        {/* Chart fades in when scrolled into view */}
        <motion.div
          className="chart-container"
          ref={chartRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isChartInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          style={{marginTop:"20px"}}
        >
          <LineChart width={400} height={200} data={data} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#03A9F5" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </motion.div>

        <div className="para" ref={textRef}>
          {/* Text appears when scrolled into view */}
          <motion.p
            style={{ position: "relative", left: "16%", bottom: "10px" }}
            initial={{ opacity: 0 }}
            animate={isTextInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            This is the latest improvement
          </motion.p>

          {/* Scroll effect for button */}
          <motion.p
            style={{
              width: "200px",
              height: "50px",
              backgroundColor: "rgb(180, 46, 46)",
              color: "white",
              borderRadius: "10px",
              fontSize: "13px",
              padding: "5px",
              position: "relative",
              marginTop: "29px",
              left:"20px"
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isTextInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 100 }}
          >
            450+ Video Courses <i className="fa-solid fa-arrow-right fa-beat" style={{ color: "#0c69b0" }}></i>
          </motion.p>

          {/* Scroll-in effect for the yellow button */}
          <motion.p
            style={{
              width: "200px",
              height: "50px",
              backgroundColor: "rgb(162, 155, 22)",
              color: "white",
              borderRadius: "10px",
              fontSize: "13px",
              position: "relative",
              left: "37%",
              padding: "5px",
              bottom: "66px",
            }}
            initial={{ x: 50, opacity: 0 }}
            animate={isTextInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            200K+ video Courses <i className="fa-solid fa-video"></i>
          </motion.p>
        </div>
      </Col>

      <Col>
        {/* Heading appears from left when scrolled into view */}
        <motion.h2
          style={{ color: "rgb(67, 141, 141)", fontSize: "25px", position: "relative", right: "562px", bottom: "70px" }}
          initial={{ x: -100, opacity: 0 }}
          animate={isTextInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          Monthly progress
        </motion.h2>

        {/* Paragraph fades in when scrolled into view */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isTextInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          style={{fontFamily: "Caveat cursive"}}
        >
          Latest improvements Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt odit nemo praesentium magni, animi enim illum! Quo voluptas ullam ex aliquid, ad corrupti unde repudiandae dolores quaerat molestias iure quis!
        </motion.p>
      </Col>
    </Row>





    <div >

      {/* Performance Section with Animation */}
      <img width={"100%"} height={"500px"} style={{position:"relative",bottom:"50px",backgroundColor:"black"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEj7p2QDWnafrRTfqvMHFeKhXfODuGjWF_5S_4b26bgb51Qmiybn05LZjg_L8_QniYVM4&usqp=CAU" alt="" />

    </div>
    <motion.div style={{position:"relative",bottom:"50px"}} className="testimonials-section">
      <h2 className="testimonials-title">What Our Learners Say</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <blockquote style={{color:"black"}} className="testimonial-quote">
              "{testimonial.quote}"
            </blockquote>
            <p className="testimonial-author">
              {testimonial.name && `- ${testimonial.name}, `}
              {testimonial.position && <span>{testimonial.position}</span>}
            </p>
            {testimonial.responses && (
              <p className="testimonial-responses">{testimonial.responses}</p>
            )}
            <a
              href={testimonial.link}
              target="_blank"
              rel="noopener noreferrer"
              className="testimonial-link"
            >
              {testimonial.linkText}
            </a>
          </div>
        ))}
      </div>
    </motion.div>

        </div>



    
  );
}

export default Teacherdas
