import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyNavbar from './Navbar';
import SignUp from './SignUp';
import Login from './Login';
import AboutUs from './AboutUs';
import TopicsPage from './TopicsPage';
import CommunityPage from './CommunityPage';
import TodoList from "./TodoList";
import Summarize from "./sum";
import Home from './home';
import Home2 from './home2';
import Home3 from './home3';
import Home4 from './home4';
// import Quote from './Qoutes';
import "../src/App2.css"
import Quiz from "./quiz";
// import Quote from './Qoutes'
import './App.css'
import StuddyPlan from "./StuddyPlan";

function App() {
    const gradientStyle = {
        background: 'linear-gradient(to right, #a2d3e9, #ffffff)',
        height: '100vh',
        margin: 0,
        display: 'flex',
        flexDirection: 'column'
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/members")
            .then(res => res.json())
            .then(data => {
                setData(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const mainContentStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px'
    };

    const textStyle = {
        flex: 1,
        marginRight: '20px'
    };

    const imageStyle = {
        flex: 1,
        textAlign: 'center'
    };





    return (
        <Router>
            <div className="App" style={gradientStyle}>
                <MyNavbar />

                <Routes>
                    <Route path="/" element={
                        <><><><><div className="container mt-4" style={mainContentStyle}>
                            <div style={textStyle}>
                                <h1 style={{ marginTop: '0.1px', fontWeight: 'bold', fontSize: '75px' }}>
                                    StudyBuddy
                                </h1>
                                <h6 style={{ marginTop: '3px', fontWeight: 'bold' }}>
                                    Are you a new Buddy? Click the button below
                                </h6>
                                <h6 style={{ fontWeight: 'bold' }}>
                                    to sign up and become a studying buddy
                                </h6>
                                <button style={{
                                    marginTop: '30px',
                                    marginBottom: '50px', // Add space below the button
                                    fontSize: '20px',
                                    backgroundColor: '#2c94cc',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    display: 'inline-block'
                                }}>
                                    <Link to="/signup" style={{ color: '#3c5d78', textDecoration: 'none' }}>
                                        Sign Up
                                    </Link>
                                </button>
                                <div>

                                </div>
                            </div>
                            <div style={imageStyle}>
                                <img src='foxblue.png' alt="Hi"
                                     style={{ width: '75%', maxWidth: '500px', height: 'auto' }} />

                            </div>


                        </div>

                            <Home /></><Home2 /></><Home3 /></><Home4 /></>
                    }


                    />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/topics" element={<TopicsPage />} />
                    <Route path="/community/:topic" element={<CommunityPage />} />
                    <Route path='todo-list' element={<TodoList />} />
                    <Route path='/sum' element={<Summarize />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/Quiz' element={<Quiz />} />
                    <Route path='/home3' element={<Home3 />} />
                    <Route path='/home4' element={<Home4 />} />
                    <Route path='/StuddyPlan' element={< StuddyPlan/>} />
                    {/* <Route path="Qoutes" element={<Quote/>} /> */}

                </Routes>
            </div>

        </Router>




    );
}

export default App;