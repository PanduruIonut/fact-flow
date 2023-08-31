import React from 'react';
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { getDailyFacts } from '../utils/api';

const FeedScreen = () => {
    const [facts, setFacts] = useState(null);

    useEffect(() => {
        async function fetchFacts() {
            const generatedFacts = await getDailyFacts();
            setFacts(generatedFacts);
        }
        fetchFacts();
    }, []);


    return (
        <View>
            <Text>{facts ? facts : 'Loading...'}</Text>
        </View>
    );
};

export default FeedScreen;