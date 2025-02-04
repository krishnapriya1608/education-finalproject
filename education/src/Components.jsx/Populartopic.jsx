import React from "react";
import '../Styles/Popular.css'
const topics = [
  "Data Science",
  "Python",
  "Deep Learning",
  "Generative AI (GenAI)",
  "Data Analysis",
  "Machine Learning",
  "Artificial Intelligence (AI)",
  "Large Language Models (LLM)",
  "MLOps",
  "LangChain",
];

function PopularTopics() {
  return (
    <div style={{marginTop:"40px",height:"300px",padding:"20px",margin:"20px"}} className="popular-topics">
      <h2>Popular topics</h2>
      <div className="topics-grid">
        {topics.map((topic, index) => (
          <div key={index} className="topic">
            {topic}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularTopics;
