import * as React from 'react';
import { useState } from 'react';
import { View, Button } from 'react-native';
import CheckBox from '../components/checkbox';
const categories = ['Sport', 'Art', 'Fashion', 'Technology'];

const CategoriesScreen = ({ navigation }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((item) => item !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {categories.map((category, index) => (
                <CheckBox
                    key={index}
                    text={category}
                    isChecked={selectedCategories.includes(category)}
                    onPress={() => toggleCategory(category)}
                />
            ))}
        </View>
    );
};


export default CategoriesScreen;