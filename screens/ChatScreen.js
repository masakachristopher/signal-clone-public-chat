import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { TextInput } from 'react-native-gesture-handler'
import firebase from 'firebase'
import { auth, db } from '../firebase'

const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: ()=>(
                <View
                style={{
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems: "center"
                }}>
                    <Avatar
                    rounded
                    source={{
                        uri: auth?.currentUser?.photoURL
                    }}/>
                    <Text style={{color:"white", marginLeft: 10, fontWeight:"bold"}}>{route.params.chatName}</Text>

                </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity style={{marginLeft:10}} onPress={navigation.goBack}>
                    <Icon name="arrowleft" type="antdesign" size={24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <View style={{
                    marginReft:20,
                    justifyContent:"center",
                    width: 80,
                    flexDirection: "row"
                }} >
                <TouchableOpacity style={{paddingLeft: 10}}>
                    <Icon name="video-camera" type="font-awesome" size={24} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingLeft: 10}}>
                    <Icon name="phone" type="font-awesome" size={24} color="white"/>
                </TouchableOpacity>
                </View>
            )
        })
  
    }, [navigation])

    const sendMessage = ()=>{
        Keyboard.dismiss()
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput('')
    }

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot)=>{
          setMessages(snapshot.docs.map(doc=>({
                    id: doc.id,
                    data: doc.data()
                })))
        })
        return unsubscribe;
    }, [route])
    return (
        <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding": "height"}
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                <ScrollView>
                    {messages.map(({id, data})=>
                        data.email === auth.currentUser.email ?
                        (<View key={id} style={styles.reciever}>
                            <Avatar
                            position="absolute"
                            rounded
                            containerStyle={{
                                bottom: -15,
                                right:-5,
                                position: "absolute"
                            }}
                            bottom = {-15}
                            right ={-5}
                            source={{
                                uri: data.photoURL
                            }}
                            />
                            <Text style={styles.recieverText}>{data.message}</Text>

                        </View>):
                        (<View style={styles.sender}>
                             <Avatar
                            position="absolute"
                            rounded
                            containerStyle={{
                                bottom: -15,
                                left:-5,
                                position: "absolute"
                            }}
                            bottom = {-15}
                            left ={-5}
                            />
                            <Text tyle={styles.senderText}>{data.message}</Text>
                        </View>)
                    )}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput 
                    value={input} 
                    onChangeText={(text)=>setInput(text)}
                    placeholder="Signal Message" 
                    style={styles.textInput}
                    onSubmitEditing={sendMessage}/>
                    <TouchableOpacity onPress={sendMessage}>
                        <Icon name="send" type="material" size={24} color="blue"/>
                    </TouchableOpacity>
                </View>
               </>
               </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    footer:{
        flexDirection: "row",
        alignItems:"center",
        width: "100%",
        padding: 15
    },
    textInput:{
        bottom: 0,
        height: 40,
        flex:1,
        marginLeft:15,
        borderColor: "transparent",
        backgroundColor: "#ececec",
        borderWidth:1,
        padding: 10,
        color: "grey",
        borderRadius: 30

    },
    sender:{
        padding: 15,
        backgroundColor: "#ececec",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    reciever:{
        padding: 15,
        backgroundColor: "#ececec",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    senderName: {
        left:10,
        paddingLeft: 10,
        fontSize: 10,
        color: "white"
    },
    senderText:{
        color: "white",
        marginLeft: 10,
        marginBottom: 15,
        fontWeight: "bold"
    }
})
