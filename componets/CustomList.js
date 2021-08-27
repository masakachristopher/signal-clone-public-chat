import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Image } from 'react-native-elements/dist/image/Image'
import { ListItem } from 'react-native-elements/dist/'
import { db } from '../firebase'

const CustomList = ({id,chatName, enterChat}) => {

    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        const unsubsribe = db.collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot(snapshot =>(
        setChatMessages(snapshot.docs.map((doc)=> doc.data()

            ))
        ))

        return unsubsribe;
        
    }, [chatMessages])
    return (
        <ListItem onPress={()=>enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
            rounded
            source={{
                uri: chatMessages?.[0]?.photoURL ||

                "data:image/png;base64,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"
               
            }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"bold"}}>
                  {chatName}
                </ListItem.Title>
                <ListItem.Subtitle ellipsizeMode="tail" numberOfLines={1}>
                    {chatMessages ?.[0]?.displayName}: {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
          
        </ListItem>
    )
}

export default CustomList

const styles = StyleSheet.create({})
