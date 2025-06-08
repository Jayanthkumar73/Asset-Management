import React from 'react';
import './AboutUs.css';
import SahithyaImage from '../assets/Sahithya.jpg';
import raviimage from '../assets/ravi1.jpg';
import pardhiv from '../assets/aakash.jpg'; 
import jayanth from '../assets/jayanth.jpg';
const Aboutus = () => (
  <div className="aboutus-container">
    <div className="aboutus-info">
      <h1>About Us</h1>
      <p>
        Welcome to our Asset Management System – a powerful web-based solution designed to simplify and streamline the process of tracking and managing organizational assets. 
        We are a team of passionate developers committed to solving real-world operational challenges through technology. Our project combines the power of modern web development 
        with practical usability to help institutions, colleges, and companies manage their physical resources effectively.
      </p>
      <p>
        The goal of this system is to centralize asset management within an intuitive platform. We want to help organizations reduce asset losses, improve inventory tracking, and make data-driven decisions 
        regarding their physical resources. Whether it's managing equipment, furniture, or tools, this system ensures that nothing is lost or overlooked.
      </p>
      <p>
        This system was developed with scalability and efficiency in mind. It enables administrators to register, update, monitor, and maintain detailed records of all assets – from computers and electronics to 
        lab equipment and office furniture – ensuring that every item is accounted for throughout its lifecycle. This also helps organizations to avoid unnecessary purchases, thus saving costs.
      </p>

      <h2>Purpose of the Project</h2>
      <p>
        The purpose of this project is to digitize and streamline the asset tracking process in institutions or organizations. It eliminates the need for manual logs by providing a centralized platform for managing all 
        asset-related information, improving transparency, accountability, and decision-making. By digitizing asset management, this project helps organizations achieve better control over their resources.
      </p>
      <p>
        Moreover, by tracking assets more efficiently, organizations can avoid costly errors, enhance compliance with regulations, and ensure the proper maintenance of their equipment. The project also promotes better asset lifecycle management.
      </p>

      <h2>Project Workflow</h2>
      <ul>
        <li><strong>Asset Registration:</strong> Admin users can add new assets to the system with key details like name, type, dealer, model, warranty, etc. All asset records are stored in a central database for easy access.</li>
        <li><strong>Repair Management:</strong> When an asset needs repair, the system allows users to log the repair date and track the status, ensuring the maintenance process is well-documented.</li>
        <li><strong>Warranty Tracking:</strong> The system notifies or keeps track of assets whose warranties are near expiry or expired, ensuring timely actions like renewals or replacements.</li>
        <li><strong>CRUD Operations:</strong> Admins can update or delete assets as needed, and the changes reflect instantly in the database, ensuring real-time data updates.</li>
        <li><strong>Inventory Monitoring:</strong> The system provides features to monitor asset usage, location, and condition, enabling better decision-making.</li>
        <li><strong>Frontend:</strong> Built using React.js for a dynamic and interactive user interface, the frontend offers reusable components, allowing for smooth navigation and scalability.</li>
        <li><strong>Backend:</strong> Node.js/Express handles API requests and responses, while MongoDB stores asset data securely and efficiently.</li>
        <li><strong>Testing:</strong> API endpoints and the overall system functionality are thoroughly tested using tools like Thunder Client, ensuring that the system works flawlessly under different scenarios.</li>
        <li><strong>Reporting:</strong> Built-in reporting tools allow administrators to generate reports on asset health, warranty status, and usage trends.</li>
      </ul>

      <h2>Technologies Used</h2>
      <p>
        This system is built with a modern tech stack to ensure performance, scalability, and security. The technologies used include:
      </p>
      <ul>
        <li><strong>React.js:</strong> For building the dynamic frontend and ensuring an interactive user experience.</li>
        <li><strong>Node.js:</strong> A powerful runtime environment used for handling backend logic.</li>
        <li><strong>Express.js:</strong> A fast and minimal framework for building RESTful APIs and managing HTTP requests.</li>
        <li><strong>MongoDB:</strong> A NoSQL database to store asset data, providing high flexibility and scalability.</li>
        <li><strong>CSS/SCSS:</strong> For styling and ensuring a responsive and user-friendly design.</li>
      
        <li><strong>Thunder Client:</strong> For API testing and ensuring robust communication between the frontend and backend.</li>
      </ul>
    </div>

    <div className="developer-section">
      <h2>Meet Our Developers</h2>
      <div className="developer-profiles">
        <div className="developer-card">
          <img
            src={jayanth}
            alt="Developer 1"
            className="developer-image"
          />
          <h3>Jayanth</h3>
          <p>Frontend Developer</p>
          <p>
            Jayanth is responsible for developing the intuitive user interface using React.js. He ensures that the system is easy to navigate and offers a seamless experience.
          </p>
        </div>

        <div className="developer-card">
          <img
            src={raviimage}
            alt="Developer 2"
            className="developer-image"
          />
          <h3>Ravi reddy</h3>
          <p>Backend Developer</p>
          <p>
            Ravi reddy manages the backend infrastructure of the system using Node.js and Express. He also handles the database management in MongoDB to ensure smooth data storage and retrieval.
          </p>
        </div>

        <div className="developer-card">
          <img
            src={SahithyaImage}
            alt="Developer 3"
            className="developer-image"
          />
          <h3>Sahithya</h3>
          <p>DevOps Engineer</p>
          <p>
            Sahithya is responsible For API testing and ensuring robust communication between the frontend and backend..
          </p>
        </div>

        <div className="developer-card">
          <img
            src={pardhiv}
            alt="Developer 4"
            className="developer-image"
          />
          <h3>Aakash</h3>
          <p>UI/UX Designer</p>
          <p>
            Aakash designs the user interfaces with a focus on providing an intuitive and attractive experience. He ensures the system is accessible and user-friendly.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Aboutus;
