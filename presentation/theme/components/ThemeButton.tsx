import { View, Text, Touchable, TouchableOpacity, TouchableOpacityProps, StyleSheet, Pressable, PressableProps, StyleProp } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '../hooks/useThemeColor';
interface Props extends PressableProps {
    onPress: () => void,
    textButton: string,
    icon?: keyof typeof Ionicons.glyphMap;
    additionalStyles?: any
}
const ThemeButton = ({ onPress, textButton, icon, additionalStyles, ...props }: Props) => {

    const primaryColor = useThemeColor({}, 'primary');
    return (

        <Pressable onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? primaryColor + '90' : primaryColor
                },
                styles.button,
                additionalStyles
            ]}
            {...props}
        >

            <Text style={{ color: 'white' }}>{textButton}</Text>
            {icon && <Ionicons name={icon} size={24} color="white" />}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderRadius: 5,
        padding: 15,
        justifyContent: 'center'
    }
})
export default ThemeButton