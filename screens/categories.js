import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = ['Sport', 'Art', 'Fashion', 'Technology'];
const STORAGE_KEY = 'selectedCategories';

const CategoriesScreen = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        loadSelectedCategories();
    }, []);

    const loadSelectedCategories = async () => {
        try {
            const storedCategories = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedCategories !== null) {
                setSelectedCategories(JSON.parse(storedCategories));
            }
        } catch (error) {
            console.error('Error loading selected categories:', error);
        }
    };

    const toggleCategory = async (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((item) => item !== category)
            : [...selectedCategories, category];

        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
            setSelectedCategories(updatedCategories);
        } catch (error) {
            console.error('Error saving selected categories:', error);
        }
    };

    return (
        <View>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => toggleCategory(category)}
                    style={{
                        backgroundColor: selectedCategories.includes(category) ? 'lightblue' : 'lightgray',
                        padding: 10,
                        margin: 5,
                    }}
                >
                    <Text>{category}</Text>
                </TouchableOpacity>
            ))}
            <Text>Selected categories: {selectedCategories.join(', ')}</Text>
        </View>
    );
};

export default CategoriesScreen;
