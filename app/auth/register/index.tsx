import { KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ThemeButton from '@/presentation/theme/components/ThemeButton';
import { Link } from 'expo-router';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 40 , backgroundColor: backgroundColor}}>
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type='title'>Crear cuenta</ThemedText>
          <ThemedText style={{ color: 'grey' }}>Por favor crea una cuenta para continuar</ThemedText>
        </View>

        <View>
          {/* Email y pass */}
          <View style={{ marginTop: 20 }}>

            <ThemedTextInput
              placeholder='Nombre completo'
              autoCapitalize='words'
              icon='person-outline'
            />
            <ThemedTextInput
              placeholder='Email'
              keyboardType='email-address'
              autoCapitalize='none'
              icon='mail-outline'
            />
            <ThemedTextInput
              placeholder='Contraseña'
              secureTextEntry
              autoCapitalize='none'
              icon='lock-closed-outline'
            />

          </View>

          {/* Boton */}
          <ThemeButton additionalStyles={{ marginTop: 20 }} textButton='Crear cuenta' onPress={() => {
            console.log('Ingresar');
          }}
            icon='arrow-forward' />

          {/* Enlace a registro */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'center', gap: 10 }}>
            <ThemedText>¿Ya tienes una cuenta?</ThemedText>
            <Link href={'/auth/login'} style={{ color: 'skyblue' }} >Iniciar sesión</Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen