import { NavigationHelpersContext } from '@react-navigation/native';
import React, {useState, useEffect} from 'react'
import { Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input'
import { auth } from '../firebase';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    },[])

    const signIn = ()=>{
        auth.signInWithEmailAndPassword(email,password).catch(error => alert(error))
    }
    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri:"https://logowik.com/content/uploads/images/t_signal-messenger-icon9117.jpg"
                    }}
                    style={{width:200, height:200}}
                />
            </View>
            <Input placeholder="Email" 
                autoFocus 
                type="email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input 
                placeholder="Password" 
                secureTextEntry 
                type="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
            />
                
            <Button containerStyle={styles.buttonLogin}  onPress={signIn} title="Login" />
            <Button onPress={()=> navigation.navigate('Register')} containerStyle={styles.button} type="outline" title="Register"/>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"white",
        padding: 10
    },
    button:{
        width: windowWidth - 30,
        marginTop:10,
        color: '#000'

    },
    buttonLogin:{
        width:windowWidth - 30,
        marginTop:10,
        backgroundColor: "blue"
    },
    inputContainer:{
        width: 300
    },
    registerTxt:{
        fontSize: 12,
        color: "blue",
        marginTop: 5

    }
})
