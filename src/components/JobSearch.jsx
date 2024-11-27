import React from 'react';
import './JobSearch.css';
import backgroundImage from '../assets/Job.png'; 
import { Button } from '@mui/material';  

function JobSearch() {
    return (
        <div
            className="job-search-page"
            style={{ backgroundImage: `url(${backgroundImage})` }} 
        >
            <div className="overlay"></div>
            <div className="content">
                <h1>Welcome to Job Hunt</h1>
                <p>Find your dream job here!</p>
                
                {/* Add Learn More and Browse Jobs buttons */}
                <div className="button-container">
                    <Button
                        variant="contained"
                        color="primary"
                        className="learn-more-btn"
                        href="#learn-more" 
                    >
                        Learn More
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        className="browse-jobs-btn"
                        href="#browse-jobs"  
                    >
                        Browse Jobs
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default JobSearch;
