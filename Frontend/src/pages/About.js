import React from 'react'
import { useNavigate } from 'react-router'
import Home from './Home';
import PageTitle from '../PageTitle/PageTitle';
import Footer from '../Footer/Footer';
import "./About.css"


const About = () => {
    const navigate=useNavigate();
  return (
    <div className="bodydesign">
      <PageTitle title="About" />
      <header class="hero">
    <h1>About Flavors & Forks</h1>
    <p>Where every dish tells a story</p>
  </header>

  <section class="about">
    <h2>Our Story</h2>
    <p>
     Flavors & Forks started with a simple dream: to bring people together over delicious food in a cozy, welcoming atmosphere.
      Since opening our doors in 2015, we’ve been serving up homemade meals inspired by family recipes and global flavors.
    </p>
    <p>
      Whether you're here for our signature desserts, freshly brewed coffee, or hearty mains, you're always in for a treat.
    </p>
  </section>

  <section class="team">
    <h2>Meet Our Chefs</h2>
    <div class="team-container">
      <div class="chef-card">
        <img src="chef/shef1.jpg" alt="Chef Anna" />
        <h3>Chef Anna</h3>
        <p>Master of Italian cuisine and the heart of our kitchen.</p>
      </div>
      <div class="chef-card">
        <img src="chef/chef2.jpg" alt="Chef Marco" />
        <h3>Chef Marco</h3>
        <p>Bringing bold fusion flavors to every plate.</p>
      </div>
    </div>
  </section>

  {/* <footer class="footer">
    <p>&copy; 2025 Delight Bistro. All rights reserved.</p>
  </footer> */}
      {/* <button onClick={()=>navigate("/")}>go to home</button> */}
    </div>
  )
}

export default About
