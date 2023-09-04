import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CategoriesScreen from '../screens/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FactScreen from '../screens/factScreen';

const Tab = createBottomTabNavigator();

const loadSelectedCategories = async () => {
    try {
        const storedCategories = await AsyncStorage.getItem('selectedCategories');
        return storedCategories !== null ? JSON.parse(storedCategories) : null;
    } catch (error) {
        console.error('Error loading selected categories:', error);
    }
};


const BottomTabNavigator = () => {
    const [selectedCategories, setSelectedCategories] = useState();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const storedCategories = await loadSelectedCategories();
                setSelectedCategories(storedCategories);
            } catch (error) {
                console.error('Error loading selected categories:', error);
            }
        }
        fetchCategories();  
    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={ selectedCategories ? FactScreen : CategoriesScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};



export default BottomTabNavigator;
