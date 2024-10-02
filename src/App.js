import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyNavbar from './Components/Navigation code/Navbar';
import SignUp from './Components/signinandlogin/SignUp';
import Login from './Components/signinandlogin/Login';
import AboutUs from './Components/About us/AboutUs';
import TopicsPage from './Components/Community/TopicsPage';
import CommunityPage from './Components/Community/CommunityPage';
import TodoList from "./Components/TodoList/TodoList";
import Summarize from "./Components/Summarize/sum";
import Home from './Components/Home pages/home';
import Home2 from './Components/Home pages/home2';
import Home3 from './Components/Home pages/home3';
import Home4 from './Components/Home pages/home4';
// import Quote from './Qoutes';
import "./App.css"
import Quiz from "./Components/Quiz/quiz";
import Quote from './Components/Quotes/Qoutes'
import './App.css'
import StuddyPlan from "./Components/Study plan/StuddyPlan";
import Page from "./Components/button page/buttonpage";
import PomodoroTimer from "./Components/pomodoro/PomodoroTimer";
import Testpage from './Components/Study Techniques/test'
import SQR3method from './Components/Study Techniques/sq3r'
import Retrieval from './Components/Study Techniques/retrieval'
import Spacedpractice from './Components/Study Techniques/spaced'



function App() {







    return (
        <Router>
            <div className="App" >
                <MyNavbar />

                <Routes>
                    <Route path="/" element={
                        <><><><><div className="container mt-4" >
                            <div >
                                <br></br>
                                <br></br>
                                <br></br>
                                <h1 style={{ marginTop: '0.1px', fontWeight: 'bold', fontSize: '75px' }}>
                                    StudyBuddy
                                </h1>

                                <br></br>
                                <br></br>
                                <h6 style={{ marginTop: '3px', fontWeight: '500' }}>
                                    Are you a new Buddy? Click the button below
                                </h6>
                                <h6 style={{ fontWeight: '500' }}>
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
                                    <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
                                        Sign Up
                                    </Link>
                                </button>
                                <div>

                                </div>
                            </div>
                            <div >
                                <br></br>
                                <br></br>
                                <br></br>

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
                    <Route path='/page' element={< Page/>} />
                    <Route path="Qoutes" element={<Quote/>} />
                    <Route path="PomodoroTimer" element={<PomodoroTimer/>} />
                    <Route path= '/test' element = {<Testpage />}/>
                    <Route path= '/sq3r' element = {<SQR3method />}/>
                    <Route path= '/retrieval' element = {<Retrieval />}/>
                    <Route path= '/spaced' element = {<Spacedpractice />}/>

                </Routes>
            </div>

        </Router>




    );
}

export default App;
