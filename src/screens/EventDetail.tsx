import * as React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native'
import { globalStyles } from '../style';
import { RouteProp, useRoute} from '@react-navigation/native';
import { RootStackParamList } from '../navigators/AppNavigatior';


export const EventDetailScreen: React.FC = () => {
   
    const route = useRoute<RouteProp<RootStackParamList, 'EventDetail'>>();

    return (
    <SafeAreaView style={globalStyles.container}>
        <ScrollView style={{width: '100%'}}>
            <Text>id: {route.params?.item.id}</Text>
            <Text>type: {route.params?.item.type}</Text>
            <Text>created_at: {route.params?.item.created_at}</Text>
        </ScrollView>
    </SafeAreaView>
    )
}