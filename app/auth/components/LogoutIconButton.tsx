import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { Ionicons } from '@expo/vector-icons'

const LogoutIconButton = () => {

    const primary = useThemeColor({}, 'primary')
    const { logout } = useAuthStore()
    return (
       <TouchableOpacity onPress={logout} style={{marginRight: 10}}>
            <Ionicons name='log-out-outline' size={24} color={primary} onPress={logout} />
       </TouchableOpacity>

    )
}

export default LogoutIconButton