// /import React, { useState } from 'react';
// import './Qoutes.css';
//
// const quotes = [
//     '"The only way to do great work is to love what you do." - Steve Jobs',
//     '"Success is not how high you have climbed, but how you make a positive difference to the world." - Roy T. Bennett',
//     '"What lies behind us and what lies before us are tiny matters compared to what lies within us." - Ralph Waldo Emerson',
//     '"Believe you can and you’re halfway there." - Theodore Roosevelt',
// ];
//
// const funFacts = [
//     'Bananas are berries, but strawberries aren\'t!',
//     'Honey never spoils; archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible.',
//     'Octopuses have three hearts!',
//     'A group of flamingos is called a "flamboyance."',
// ];
//
// function Quote() {
//     const [quote, setQuote] = useState(quotes[0]);
//     const [fact, setFact] = useState(funFacts[0]);
//
//     const newQuote = () => {
//         const randomIndex = Math.floor(Math.random() * quotes.length);
//         setQuote(quotes[randomIndex]);
//     };
//
//     const newFact = () => {
//         const randomIndex = Math.floor(Math.random() * funFacts.length);
//         setFact(funFacts[randomIndex]);
//     };
//
//     return (
//         <div className="container">
//             <h1>Boredom Break</h1>
//             <section className="quotes">
//                 <h2>Inspiring Quotes</h2>
//                 <blockquote>{quote}</blockquote>
//                 <button onClick={newQuote}>New Quote</button>
//             </section>
//             <section className="fun-facts">
//                 <h2>Fun Facts</h2>
//                 <p>{fact}</p>
//                 <button onClick={newFact}>New Fun Fact</button>
//             </section>
//             <section className="mindfulness">
//                 <h2>Mindfulness Tip</h2>
//                 <p>Take a deep breath in for 4 seconds, hold for 4 seconds, and exhale for 4 seconds.</p>
//             </section>
//         </div>
//     );
// }
//
// export default Quote;
