import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './scene/home';
import SchoolQuestLong from './scene/long_school_quest';
import ViewQuest from './scene/view_detail_quest';
import SchoolDataBase from './components/school_database';

import Login from './scene/login';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LongSchoolDataBase from './scene/long_school_database';
import ViewStudentDetail from './scene/view_student_detail';
import StudentDataInspect from './scene/student_data_inspect';
//screenOptions={{headerShown: false}
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component = {Login}/>
        <Stack.Screen name="Home" component = {Home}/>
        <Stack.Screen name="LongQuest" component = {SchoolQuestLong}/>
        <Stack.Screen name="ViewQuest" component = {ViewQuest}/>
        <Stack.Screen name="SchoolDatabase" component = {SchoolDataBase}/>
        <Stack.Screen name="LongSchoolDatabase" component = {LongSchoolDataBase}/>
        <Stack.Screen name="ViewStudentDetail" component = {ViewStudentDetail}/>
        <Stack.Screen name="StudentDataInspect" component = {StudentDataInspect}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
