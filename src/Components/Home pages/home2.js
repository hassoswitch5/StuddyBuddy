import React from 'react';
import './home.css';

const Home2 = () => {
    return (
        <div className="App2">
            <br></br>
            <br></br>
            <br></br>
            <br></br>



            <h1>
                Summarizer
            </h1>
            <br></br>
            <table>
                <tr>

                    <td>

                        <p className='par2'>
                            The Summarizer feature in our study app condenses lengthy texts into concise summaries, making it easier for users
                            to grasp key concepts quickly. By highlighting important information and eliminating unnecessary details, the Summarizer
                            helps students save time and enhance their understanding of complex topics. Whether for notes, articles, or textbooks,
                            this tool streamlines the study process and boosts productivity.
                        </p>
                    </td>

                    <td>
                        <img src='rr.png' width={290} height={280} alt='Summarizer'></img>
                    </td>

                </tr>

            </table>

            <br></br>
        </div>
    );
};



export default Home2;
