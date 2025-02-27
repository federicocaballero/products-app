import { View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { Redirect, Stack } from 'expo-router'
import LogoutIconButton from '../auth/components/LogoutIconButton'

const CheckAutenticationLayout = () => {
    const { status, checkStatus } = useAuthStore()

    useEffect(() => {
        checkStatus();
    }, [status])

    if (status === 'checking') {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
            <ActivityIndicator />
        </View>
    }

    if (status === 'unauthenticated') {
        //Guardar la ruta del usuario
        return <Redirect href={'/auth/login'} />
    }
    // const backgroundColor = useThemeColor({}, 'background');
    const backgroundColor = 'midnightblue';
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: backgroundColor,
                },
                contentStyle: {
                    backgroundColor: backgroundColor
                }
            }}
        >
            <Stack.Screen
                name="(home)/index" options={{ title: 'Productos', headerLeft: () => <LogoutIconButton /> }} />
            <Stack.Screen
                name="product/[id]" options={{ title: 'Productos' }} />
        </Stack>
    )
}

export default CheckAutenticationLayout