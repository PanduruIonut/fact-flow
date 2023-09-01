import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@env"
import axios from 'axios';

export const getUserCategories = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('selectedCategories')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Error fetching user categories:', e);
        return null;
    }
}

export async function generateFact(category) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: `Tell me an interesting fact from the domain ${category}`,
                max_tokens: 100,
                temperature: 0.5,
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const fact = response.data.choices[0]?.text;
        if (!fact || fact.trim() === '') {
            console.warn('Generated fact is empty:', fact);
            return null;
        }

        return fact;
    } catch (error) {
        console.error('Error generating fact:', error);
        return null;
    }
}

export const getDailyFacts = async () => {
    const currentDate = new Date().toDateString();
    let storedData = await AsyncStorage.getItem('dailyFacts');
    console.debug('Stored data:', storedData)

    if (storedData) {
        storedData = JSON.parse(storedData);
        if (storedData.date === currentDate) {
            console.debug('Returning stored facts', storedData.facts)
            return storedData.facts;
        }
    }

    const categories = await getUserCategories();
    const todayFacts = [];

    for (let i = 0; i < categories.length; i++) {
        const fact = await generateFact(categories[i]);
        console.debug('Generated fact:', fact)
        if (fact) {
            todayFacts.push(fact);
        }
    }

    const dataToStore = {
        date: currentDate,
        facts: todayFacts
    };

    await AsyncStorage.setItem('dailyFacts', JSON.stringify(dataToStore));

    return todayFacts;
};
