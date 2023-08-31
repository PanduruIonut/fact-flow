import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CategoriesScreen from '../screens/categories';
import FeedScreen from '../screens/feed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={loadSelectedCategories() ?  FeedScreen : CategoriesScreen}
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


const loadSelectedCategories = async () => {
    try {
        const storedCategories = await AsyncStorage.getItem('selectedCategories');
        if (storedCategories !== null) {
            setSelectedCategories(JSON.parse(storedCategories));
        }
    } catch (error) {
        console.error('Error loading selected categories:', error);
    }
};

export default BottomTabNavigator;
