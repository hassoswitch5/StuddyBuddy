import React from 'react';
import '../src/App2.css';


const Home3 = () => {
    return (
        <div className="App2">



            <h1>
                To do List
            </h1>
            <br></br>
            <table>
                <tr>
                    <td>
                        <p className='par2'>
                            A to-do list for your studies is an essential tool for staying organized and focused. Begin by listing all
                            your subjects and any upcoming assignments, exams, or projects. Break each task into smaller, manageable steps
                            to make it less overwhelming. Prioritize tasks based on due dates and importance, and set specific goals for
                            each study session. Don’t forget to include time for review and self-care breaks to keep your mind sharp. By checking off
                            completed tasks, you’ll not only stay on track but also boost your motivation and sense of accomplishment.
                        </p>
                    </td>
                    <td>
                        <img src='to.png' width={280} height={280} alt='to do list'></img>
                    </td>


                </tr>
            </table>
            <br></br>
        </div>
    );
};



export default Home3;