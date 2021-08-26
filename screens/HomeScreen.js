import React, {useEffect, useLayoutEffect, useState} from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity,StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import CustomList from '../componets/CustomList'
import { auth, db } from '../firebase'

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([])

    const signOut = ()=>{
        auth.signOut().then(()=>{
            navigation.replace("Login")
        })
    }
// console.log(chats);
    useEffect(()=>{
        const unsubscribe = db.collection('chats').onSnapshot(snapshot =>{
           setChats(snapshot.docs.map(doc =>({
                id: doc.id,
                data: doc.data()
            })))
        })

        return unsubscribe;
    },[])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: {backgroundColor: "#fff"},
            headerTitleStyle: {color:"black"},
            headerTintColor:"black",
            headerLeft: ()=>(
                    <View style={{marginLeft: 20}}>
                    <TouchableOpacity onPress={signOut}>
                    <Avatar
                    rounded
                    source={{
                        uri: auth?.currentUser?.photoURL
                    }}
                    
                    />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: ()=>(
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Icon size={24} type="antdesign" name="camera"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                        <Icon size={24} type="antdesign" name="edit"/>
                    </TouchableOpacity>
                </View>
            )
        })
        return () => {
        }
    }, [])

    const enterChat = (id,chatName)=>{
        navigation.navigate("Chat", {
            id,
            chatName
        })
    }
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data:{chatName}})=>{
                    return  (<CustomList enterChat={enterChat} key={id} id={id} chatName={chatName}/>)

                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles =  StyleSheet.create({
    container:{
        height: "100%"
    }
})
