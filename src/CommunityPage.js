// ko/CommunityPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const CommunityPage = () => {
    const { topic } = useParams();

    const gradientStyle = {
        background: 'linear-gradient(to right, #a2d3e9, #ffffff)',
        height: '100vh',
        margin: 0,
        display: 'flex',
        flexDirection: 'column'
    };



    const mainContentStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px'
    };
    const name2= sessionStorage.getItem('name')
    return (
        <div className="CommunityPage" style={gradientStyle}>
            <marquee>Welcome {name2}</marquee>
            <div style={mainContentStyle}>
                <h1 style={{fontWeight: 'bold', fontSize: '60px'}}>
                    Community for {topic}

                </h1>


            </div>

        </div>

    );
};

export default CommunityPage;
