import { StatusBar } from 'expo-status-bar'
import React, {useState, useLayoutEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back To Login"
        })
     
    }, [navigation])

    const register = ()=>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(authUser =>{
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7iMAl4jG0OEIm0Yw6HAOldwy7DMSnaweNeA&usqp=CAU"
            })
        })
        .catch(error => alert(error.message,"error"))

    }

 
    return (
        <View style={styles.containerr}>
            <StatusBar style="light"/> 
            <View style={styles.inputContainer}>
            <Text h2 style={{marginBottom: 50, fontSize: 24}}>
                Create A Signal Account
            </Text>
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
                onSubmitEditing={register}
                onChangeText={text => setImageUrl(text)}
            />
            <Button onPress={register} title="Register" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        
    },
    inputContainer:{
        paddingLeft: 15,
        paddingRight: 15
    }
})
export default RegisterScreen
