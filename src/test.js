import React, { useState } from 'react';
import './index.css';
// import { Link } from 'react-router-dom';
// import { Outlet, Link } from "react-router-dom";
// import Spacedpractice from './spaced';
// import Retrieval from './retrieval';
// import SQR3method from './sq3r';
import { useNavigate } from "react-router-dom";
import '../src/test.css';





function Testpage() {

    const  [selectedValueq1, setSelectedValueq1] =useState()
    const  [selectedValueq2, setSelectedValueq2] =useState()
    const  [selectedValueq3, setSelectedValueq3] =useState()
    const  [selectedValueq4, setSelectedValueq4] =useState()
    const  [selectedValueq5, setSelectedValueq5] =useState()
    const  navigate = useNavigate();

    let tech = ''
    const questions=[

        { id: "1-How do you typically begin studying a new topic?",answer:  ["A) I survey the material first by reading headings and subheadings.",
                "B) I try to retrieve as much information as possible from memory before reviewing.",
                "C) I break the topic into chunks and review it over several days."
            ],state:[selectedValueq1, setSelectedValueq1]}
        ,
        {id:"2-What is your approach to reviewing material?",answer:["A) I read the material multiple times, checking for details I missed.",
                "B) I test myself repeatedly without looking at my notes.",
                "C) I review parts of the material in small sessions over a longer time period."
            ],state:[selectedValueq2, setSelectedValueq2]}
        ,
        {id:"3-How do you handle a concept you don't understand?",answer:["A) I break it down into questions and search for answers while reading.",
                "B) I test myself on the concept until I get it right.",
                "C) I return to it over time to see if I understand it or not."

            ],state:[selectedValueq3, setSelectedValueq3]}
        ,
        {id:"4-What is your study schedule like before an exam?",answer:["A) I read the material and create questions to guide me.",
                "B) I quiz myself regularly without re-reading too much.",
                "C) I plan my study sessions ahead of time, focusing on short intervals each day."

            ],state:[selectedValueq4, setSelectedValueq4]}
        ,
        {id:"5-How do you determine if you're ready for a test?",answer:["A) I feel ready when I've read the material thoroughly and created a summary.",
                "B) I know I'm ready when I can recall most information from memory.",
                "C) I feel confident after reviewing the material several times over different days ."
            ],state:[selectedValueq5, setSelectedValueq5] }
    ]


    return(
        <div  className='home'>
            <><div>
                <br></br>
                <br></br>
                <h1 className='h1'>Quiz To Determine The Studying Technique That Suits You</h1>
                <br></br>
                <br></br>
                <ul>
                    {questions.map(item => (
                        <><h3>{item.id}</h3><div>
                            {item.answer.map(ans => (
                                <><input type="radio"
                                         id={ans}
                                         value={ans}
                                         checked={item.state[0] === ans}

                                         onChange={() => {
                                             item.state[1](ans);
                                         } } /><label
                                    htmlFor={ans}
                                >{ans}</label><br></br></>

                            ))}
                        </div></>


                    ))}
                </ul>

            </div><div >


                {<button

                    onClick={
                        async()=>{
                            if (!selectedValueq1||!selectedValueq2||!selectedValueq3||!selectedValueq4||!selectedValueq5)
                            {
                                alert('Please complete the test')
                            }
                            else{
                                let answers= [selectedValueq1.substring(0,1),
                                    selectedValueq2.substring(0,1),
                                    selectedValueq3.substring(0,1),
                                    selectedValueq4.substring(0,1),
                                    selectedValueq5.substring(0,1)]

                                try {
                                    const response = await fetch('http://localhost:5000//studyingtechnique/get', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(answers),
                                    });

                                    const data = await response.json();
                                    console.log(data)
                                    if(data[0]==="sq3r"){
                                        navigate("/sq3r");
                                    }
                                    else if(data[0]==="spaced"){
                                        navigate("/spaced");
                                    }
                                    else if(data[0]==="retrieval"){
                                        navigate("/retrieval");
                                    }


                                } catch (err) {
                                    alert(err.err)
                                }

                            }

                        }
                    }

                > submit</button>}

                {

                    close => (

                        <div className='modal'>
                            <div className='content'>
                                hi
                            </div>
                            <div>
                                <button onClick=
                                            {() => close()}>
                                    Close modal
                                </button>
                            </div>
                        </div>
                    )
                }


            </div></>

        </div>


    )
}

export default Testpage;