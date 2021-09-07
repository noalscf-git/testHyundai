import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { EventsScreen } from '../screens/Events';
import { createStackNavigator } from '@react-navigation/stack';
import { EventDetailScreen } from '../screens/EventDetail';
import { TEvents } from '../actions/EventActions';


export type RootStackParamList = {
    Events: undefined;
    EventDetail: {
        item: TEvents;
    };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Events" component={EventsScreen} options={{headerShown: false}} />
                <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{title: 'Детальная'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
