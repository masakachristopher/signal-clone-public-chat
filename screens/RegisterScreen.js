import { StatusBar } from 'expo-status-bar'
import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements';

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    return (
        <View style={styles.containerr}>
            <StatusBar style="light"/> 
            <Input placeholder="Full Name" 
                type="text"
                value={name}
                onChangeText={text => setName(text)}
            />
             <Input placeholder="Email" 
                type="email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
             <Input placeholder="Password" 
                type="password"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
             <Input placeholder="Image Url" 
                value={imageUrl}
                onChangeText={text => setImageUrl(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        
    }
})
export default RegisterScreen
