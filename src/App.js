import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyNavbar from './Navbar';
import SignUp from './SignUp';
import Login from './Login';
import AboutUs from './AboutUs';
import TopicsPage from './TopicsPage';
import CommunityPage from './CommunityPage';
import TodoList from "./TodoList";
import Summarizer from "./sum";
import Quiz from "./quiz";
import Quote from './Qoutes'
import Testpage from './test'
import SQR3method from './SQR3'
import  Retrieval from './retrieval'
import Spacedpractice from './spaced'


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
                        <div className="container mt-4" style={mainContentStyle}>
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
                                    marginBottom: '50px',  // Add space below the button
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
                                    <Link to="/signup" style={{ color: 'inherit', textDecoration: 'none' }}>
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

                    } />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/topics" element={<TopicsPage />} />
                    <Route path="/community/:topic" element={<CommunityPage />} />
                    <Route path='todo-list' element={<TodoList />} />
                    <Route path='/sum' element={<Summarizer />} />
                    <Route path='/quiz' element={<Quiz />} />
                    <Route path='Qoutes' element={<Quote/>} />
                    <Route path= '/test' element = {<Testpage/>}/>
                    <Route path= '/SQR3' element = {<SQR3method/>}/>
                    <Route path= '/retrieval' element = {<Retrieval/>}/>
                    <Route path= '/spaced' element = {<Spacedpractice/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
