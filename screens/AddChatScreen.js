import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Input } from 'react-native-elements/dist/input/Input'
import { db } from '../firebase'

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("")
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a New Chat",
            headerBackTitle: "Chats"
        })
      
    }, [navigation])

    const createChat = async () =>{
        await db.collection('chats').add({
            chatName: input
        })
        .then(()=>{
            navigation.goBack()
        })
        .catch((error)=>{
            alert(error)
        })
    }
    return (
        <View>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={text => setInput(text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
                onSubmitEditing={createChat}
            />
            <Button containerStyle={{backgroundColor:"blue"}} onPress={createChat}  title="Create New Chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({})
