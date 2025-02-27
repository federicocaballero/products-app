import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ThemeButton from '@/presentation/theme/components/ThemeButton';
import { Link, router } from 'expo-router';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';

const LoginScreen = () => {
  const { login } = useAuthStore();
  const { height } = useWindowDimensions();

  const backgroundColor = useThemeColor({}, 'background') || '#fff';
  const [isPosting, setisPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const onLogin = async () => {
    console.log(form);
    if (form.email.length === 0 || form.password.length === 0) {
      //TODO Mostrar alerta
      return
    }

    setisPosting(true);

    const wasSuccessful = await login(form.email, form.password);
    setisPosting(false);

    if (wasSuccessful) {
      router.replace('/(products-app)/(home)')
      return
    }

    Alert.alert('Error', 'Credenciales incorrectas');
  }
  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 40, backgroundColor: 'midnightblue' }}>
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type='title'>Ingresar</ThemedText>
          <ThemedText style={{ color: 'grey' }}>Por favor ingrese para continuar</ThemedText>
        </View>

        <View>
          {/* Email y pass */}
          <View style={{ marginTop: 20 }}>

            <ThemedTextInput
              placeholder='Email'
              keyboardType='email-address'
              autoCapitalize='none'
              icon='mail-outline'
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <ThemedTextInput
              placeholder='Contraseña'
              secureTextEntry
              autoCapitalize='none'
              icon='lock-closed-outline'
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />

          </View>

          {/* Boton */}
          <ThemeButton disabled={isPosting} additionalStyles={{ marginTop: 20 }} textButton='Ingresar' onPress={() => {
            onLogin();
          }}
            icon='arrow-forward' />

          {/* Enlace a registro */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'center', gap: 10 }}>
            <ThemedText>¿No tienes una cuenta?</ThemedText>
            <Link href={'/auth/register'} style={{ color: 'skyblue' }} >Registrate</Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen