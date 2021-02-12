import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login, SignUp, Dashboard, Splash} from '../container'
import { color } from '../utility/colors'


const Stack = createStackNavigator()

function NavContainer(){
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: true,
            headerStyle: {backgroundColor: 'white'},
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}>
          <Stack.Screen
            name="Splash"
            component={Splash}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerLeft: null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default NavContainer