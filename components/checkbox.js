import { Text } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const CheckBox = ({ text, isChecked, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: isChecked ? 'lightblue' : 'lightgray',
                padding: 20,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}
            onPress={onPress}
        >
            {isChecked ? (
                <Ionicons name="checkbox" size={24} color="green" />
            ) : (
                <Ionicons name="checkbox-outline" size={24} color="black" />
            )}
            <Text style={{ marginLeft: 10 }}>{text}</Text>
        </TouchableOpacity>
    );
};

export default CheckBox;