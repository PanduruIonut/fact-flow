import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@env"
import OpenAI from "openai";

export const getUserCategories = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('selectedCategories')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
}

export async function generateFact(category) {
    const openai = new OpenAI({
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true
    });
    const prompt = `Tell me an interesting fact about ${category}.`;
    try {
        const completion = await openai.completions.create({
            max_tokens: 100,
            prompt: prompt,
            model: "text-davinci-003",
            temperature: 0.5,
        });
        return completion.choices[0]?.text;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status, error.response.data);
        } else {
            console.log(error.message);
        }

        return false;

    }
}

export const getDailyFacts = async () => {
    const currentDate = new Date().toDateString();
    let storedData = await AsyncStorage.getItem('dailyFacts');

    if (storedData) {
        storedData = JSON.parse(storedData);
        if (storedData.date === currentDate) {
            return storedData.facts;
        }
    }

    const categories = await getUserCategories();
    const todayFacts = [];
    
    for (let i = 0; i < categories.length; i++) {
        const fact = await generateFact(categories[i]);
        todayFacts.push(fact);
    }

    const dataToStore = {
        date: currentDate,
        facts: todayFacts
    };

    await AsyncStorage.setItem('dailyFacts', JSON.stringify(dataToStore));

    return todayFacts;
};