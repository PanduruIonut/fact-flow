import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getDailyFacts } from '../utils/api';

const { height: windowHeight } = Dimensions.get('window');

const FactScreen = () => {
    const [facts, setFacts] = useState([]);

    useEffect(() => {
        async function fetchFacts() {
            try {
                const generatedFacts = await getDailyFacts();
                setFacts(generatedFacts);
            } catch (error) {
                console.error('Error fetching facts:', error);
                setFacts([]);
            }
        }
        fetchFacts();
    }, []);


    return (
        <FlatList
            data={facts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.factContainer}>
                    <Text style={styles.factText}>{item}</Text>
                </View>
            )}
            pagingEnabled
            horizontal={false}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    factContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight,
        backgroundColor: '#f0f0f0',
    },
    factText: {
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: '#333',
    },
});

export default FactScreen;
