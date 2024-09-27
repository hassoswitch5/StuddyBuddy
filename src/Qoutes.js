import React, { useState } from 'react';
import './Qoutes.css';


const quotes = [
    '"The only way to do great work is to love what you do." - Steve Jobs',
    '"Success is not how high you have climbed, but how you make a positive difference to the world." - Roy T. Bennett',
    '"What lies behind us and what lies before us are tiny matters compared to what lies within us." - Ralph Waldo Emerson',
    '"Believe you can and you’re halfway there." - Theodore Roosevelt',
    "The act of creating is more important than the results",
    "There are places you haven't been where you already belong",
    "Stop getting distracted by things that have nothing to do with you goals",
    "To remain in the past means to be dead ",
    "Confidence doesn't come out of nowhere  it's a result of something ,hours and days of constant work and dedication",
    "The first step towards getting somewhere is to decide that you are not getting to stay where you are",
    "Anyone who has never made a mistake  has never tried something new",
    "Do not let what you can't do interfere what you do",
    "The best fighter is never angry",
];

const funFacts = [
    'Bananas are berries, but strawberries aren\'t!',
    'Honey never spoils; archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible.',
    'Octopuses have three hearts!',
    'A group of flamingos is called a "flamboyance."',
    "Octopus Hearts: An octopus has three hearts—two pump blood to the gills, and one pumps it to the rest of the body.",
    "Banana Radioactivity: Bananas contain potassium-40, a radioactive isotope, making them slightly radioactive!",
    "Longest Wedding Veil: The longest wedding veil was longer than 23 football fields, measuring over 23,000 feet!",
    "Honey Never Spoils: Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
    "The Eiffel Tower's Height: The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion of the metal.",
    "Wombat Poop: Wombats produce cube-shaped poop, which helps it stay in place and mark their territory.",
    "Hot Water Freezes Faster: The Mpemba effect states that hot water can freeze faster than cold water under certain conditions.",
    "Lobsters and Age: Lobsters do not age like humans; they can continue to grow and reproduce throughout their lives, potentially living for over 100 years.",
    "Penguin Proposals: Male Gentoo penguins propose to their mates by presenting them with a pebble.",
    "Koala Fingerprints: Koalas have fingerprints that are so similar to humans' that they can confuse crime scene investigators!",
    "Tardigrades: Also known as water bears, tardigrades can survive extreme conditions, including the vacuum of space.",
    "Venus's Day Length: A day on Venus (one rotation) is longer than a year on Venus (one orbit around the sun).",
    "Pineapple Growth: It takes about two to three years for a pineapple to grow and be ready for harvest.",
    "Sea Otters Holding Hands: Sea otters hold hands while sleeping to keep from drifting apart.",
    "Dolphin Names: Dolphins use unique whistles that function similarly to names, allowing them to call each other.",

];

const mindfulnessTip=[
    "Body Scan: Lie down or sit comfortably and mentally scan your body from head to toe, noticing any tension and consciously relaxing those areas.",

    "Mindful Eating: Pay attention to the taste, texture, and aroma of your food. Eat slowly and savor each bite.",

    "Gratitude Journaling: Each day, write down three things you’re grateful for. This practice helps shift your focus to the positive aspects of your life.",

    "Nature Walks: Spend time in nature and focus on the sights, sounds, and smells around you. Allow yourself to be fully present in the environment.",

    "Five Senses Exercise: Identify five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste.",
    "Limit Multitasking: Focus on one task at a time. This helps improve concentration and reduces stress.",

    "Mindful Listening: Practice active listening in conversations. Give your full attention to the speaker without planning your response while they talk.",

    "Digital Detox: Set aside time each day to unplug from screens. Use this time to engage in a mindful activity, like reading or meditating.",

    "Guided Meditation: Use apps or online resources for guided meditations. These can help you stay focused and learn different mindfulness techniques.",

    "Mindful Morning Routine: Start your day with intention. Spend a few moments stretching, meditating, or reflecting before jumping into daily tasks.",

    "Affirmations: Use positive affirmations to reinforce mindfulness. Repeat phrases like “I am present” or “I embrace this moment.”",

    "Mindful Commuting: Whether walking, driving, or riding public transport, use your commute as a time to practice mindfulness by focusing on your surroundings.",

    "Engage in a Hobby: Dedicate time to a hobby you love. Focus completely on the process, whether it’s painting, knitting, or gardening.",

    "Reflect Before Sleep: Before going to bed, reflect on your day. Consider what you experienced and express gratitude for the moments that stood out.",

]


function Quote() {
    const [quote, setQuote] = useState(quotes[0]);
    const [fact, setFact] = useState(funFacts[0]);
    const [Tip, setTip] = useState(mindfulnessTip[0]);

    const newQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    };

    const newFact = () => {
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        setFact(funFacts[randomIndex]);
    };

    const newMindfulnessTip = () => {
        const randomIndex = Math.floor(Math.random() * mindfulnessTip.length);
        setTip(mindfulnessTip[randomIndex]);
    };

    return (
        <div className='quot'>
            <h1 className='head'>Boredom Break</h1>
            <div className='insp-quote'>
                <h2>Inspiring Quotes</h2>
                <blockquote>{quote}</blockquote>
                <button onClick={newQuote}>New Quote</button>
            </div>
            <div className='insp-quote'>
                <h2>Fun Facts</h2>
                <p>{fact}</p>
                <button onClick={newFact} >New Fact</button>
            </div>
            <div className='insp-quote' >
                <h2>Mindfulness Tip</h2>
                <p>{Tip}</p>
                <button onClick={newMindfulnessTip} >New Tip</button>
            </div >
        </div>
    );
}

export default Quote;
