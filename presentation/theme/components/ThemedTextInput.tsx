import { View, Text, TextInputProps, StyleSheet, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap;
}
const ThemedTextInput = ({ icon, style, ...props }: Props) => {
    const primaryColor = useThemeColor({}, 'primary');
    const textColor = useThemeColor({}, 'text');
    const [isActive, setisActive] = useState(false)
    const inputRef = useRef<TextInput>(null)
    return (
        <View style={[{
            ...styles.border,
            //cambiar si tiene el foco el input
            borderColor: isActive ? primaryColor : '#ccc',
        }, style]}
            onTouchStart={() => inputRef.current?.focus()}>
            {icon && <Ionicons name={icon} size={24} color={textColor} style={{ marginRight: 10 }} />}
            <TextInput
                ref={inputRef}
                placeholderTextColor='#5c5c5c'
                onFocus={() => setisActive(true)}
                onBlur={() => setisActive(false)}
                style={{ color: textColor, marginRight: 10, flex: 1 }}
                {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
})
export default ThemedTextInput