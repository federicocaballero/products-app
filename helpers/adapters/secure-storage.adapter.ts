import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
export class SecureStorageAdapter {

    static async setItem(key: string, value: string) {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            Alert.alert('Error', 'Error al guardar la información');
        }
    }

    static async getItem(key: string) {
        try {
            const value = await SecureStore.getItemAsync(key);
            return value;
        } catch (error) {
            Alert.alert('Error', 'Error al obtener la información');
        }

    }

    static async deleteItem(key: string) {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error al eliminar la información');
        }
    }
}