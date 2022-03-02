import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import SstLong from '../components/school_quest/sst_long';
//import SstShort from '../components/school_quest/sst_short';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import SchoolQuest from '../components/school_quest';
import SchoolDataBase from '../components/school_database';

export default function Home() {
    //const ssts = [SstShort];
    const Nav = useNavigation();
    return (
        <View>
        <View style = {styles.container}><Text style = {styles.headtext}></Text></View>
        <SchoolQuest></SchoolQuest>
        <SchoolDataBase></SchoolDataBase>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#4257F6',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0,
    },
    headtext: {
      fontSize: 15,
      color: '#fff',
      fontWeight: 'bold',
      paddingBottom: 10,
    },
    sstShort: {
      //spacing between upper element
      backgroundColor: '#fff', 
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      borderColor: 'blue',
      //blue border
      borderWidth: 5,
    },
    map:{
        width: '100%',
        resizeMode: 'contain',
    },
});
  