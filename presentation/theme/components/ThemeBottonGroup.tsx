import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface Props {
    options: string[];
    selectedOption: string[];
    onSelect: (option: string) => void;
}
const ThemeBottonGroup = ({ options, selectedOption, onSelect }: Props) => {
    return (
        <View style={styles.container}>
            {
                options.map((option) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => onSelect(option)}
                        style={[styles.button, selectedOption.includes(option) && { backgroundColor: 'red' }]}>
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={[
                                styles.buttonText, selectedOption.includes(option) && styles.selectedButtonText]}
                        >{option[0].toUpperCase() + option.slice(1)}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,

    },
    buttonText: {
        fontSize: 16,
        color: '#fff'
    },
    selectedButtonText: {
        color: '#fff'
    }
})
export default ThemeBottonGroup