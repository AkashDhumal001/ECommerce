import React from 'react';
import { FaUsers, FaHandshake, FaLightbulb } from 'react-icons/fa';
import '../styles/AboutUs.css';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Akash Dhumal',
      position: 'Backend Developer',
      image: '/images/Akash.png'
    },
    {
      id: 2,
      name: 'Aniruddha Lalge',
      position: 'Frontend Developer',
      image: '/images/Aniruddha.png'
    },
    {
      id: 3,
      name: 'Abhijit Kulkarni',
      position: 'Frontend',
      image: '/images/Abhijit.png'
    }
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About ShopEasy</h1>
        <p>We're revolutionizing the way people shop online with our innovative platform and exceptional customer service.</p>
      </div>

      <div className="about-content">
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1350&q=80" alt="Our Team" />
        </div>
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, ShopEasy began as a small startup with a big vision: to make online shopping easier, faster, and more enjoyable for everyone. 
            What started as a simple idea has grown into one of the most trusted e-commerce platforms in the region.
          </p>
          <p>
            Our team of dedicated professionals works tirelessly to bring you the best products at competitive prices, 
            with a shopping experience that's second to none.
          </p>

          <h2>Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <FaUsers className="value-icon" />
              <h3>Customer Focus</h3>
              <p>Our customers are at the heart of everything we do.</p>
            </div>
            <div className="value-item">
              <FaHandshake className="value-icon" />
              <h3>Integrity</h3>
              <p>We believe in honest and transparent business practices.</p>
            </div>
            <div className="value-item">
              <FaLightbulb className="value-icon" />
              <h3>Innovation</h3>
              <p>We're always looking for ways to improve and innovate.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          {teamMembers.map(member => (
            <div key={member.id} className="team-member">
              <div className="team-member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
