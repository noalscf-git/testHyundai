import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView, FlatList} from 'react-native'
import {useEffect, useState} from "react";
import EventActions, { TEvents } from "../actions/EventActions";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../reducers/rootReducer';
import { EventState } from '../reducers/eventReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { globalStyles } from '../style';


interface RenderItemEventProps{
    item: TEvents,
    onPress: (item:TEvents) => void,
}

const RenderItemEvent:React.FC<RenderItemEventProps>=({item,onPress})=>{
    return(
        <View key={item.id} style={styles.task}>
            <TouchableOpacity onPress={()=>onPress(item)} >
                <Text>id: {item.id}</Text>
                <Text>type: {item.type}</Text>
                <Text>created_at: {item.created_at}</Text>
        </TouchableOpacity>
        </View>
    )
}

export const EventsScreen: React.FC = () => {

    const {events,loading} = useSelector<AppState,EventState>(({ event }) => event);
    const dispatch = useDispatch();
    const navigation=useNavigation()
    const [isRefreshing, setIsRefreshing] = useState(true);
    const isFocused = useIsFocused();
        
    useEffect(()=>{
        isFocused&&getEvents()
    },[isFocused])

    useFocusEffect(
    React.useCallback(() => { 
             
        if(isRefreshing){
            const intervalId = setInterval(() => { 
                getEvents()
            }, 60000)
            return () => clearInterval(intervalId); 
        }
        else{
            const intervalId = setTimeout(() => {  
                setIsRefreshing(true)
            }, 15000)
            return () => clearTimeout(intervalId); 
        }
    }, [isRefreshing])
    );
          

    const getEvents = async () => {
        try {
            await dispatch(EventActions.getEvents());
            setIsRefreshing(false)
            return null;
        } catch (error) {
            console.log("getEvents error", error)
        }
        return null
    }

    const onPressEvent=React.useCallback((item:TEvents)=>{
        navigation.navigate("EventDetail",{item:item})
    },[events])


    return (
        <SafeAreaView style={globalStyles.container}>
            <Text>Тестовое задиние</Text>
                <FlatList
                    data={events}
                    renderItem={({item})=>{
                        return(
                        <RenderItemEvent 
                            item={item}
                            onPress={onPressEvent}
                            key={item.id}
                        />
                        )}}
                            
                    keyExtractor={(item) => item.id}
                    onRefresh={isRefreshing?()=>getEvents():undefined}
                    refreshing={loading}
                />                   
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    task:{
        width: '100%', 
        padding:10,
        borderBottomWidth:StyleSheet.hairlineWidth
    }
  });