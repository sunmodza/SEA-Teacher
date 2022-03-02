import {db,app,auth_tool} from '../firebase-config';
import { useState , useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,RefreshControl} from 'react-native';
import { getFirestore , collection ,getDocs,getDoc,onSnapshot} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage,ref,listAll } from "firebase/storage";
import {DataTable} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export function communication(quest_funct){
    //server.get_quest() something
    const db = getFirestore(app);
    const q = collection(db, "score_database");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const all_data = {};
        querySnapshot.forEach((doc) => {
            const obj = doc.data();
            all_data[doc.id] = obj;
        ;})    
        //console.log(all_data)
        quest_funct(all_data);
    });
}



export default function schoolQuest(){
    const [refresh,setRefresh] = useState(false)

    const [student_Data,setStudentData] = useState({});

    const [ready,setReady] = useState(false);

    const Nav = useNavigation();


    //c

    useEffect(
        () => {
            communication(setStudentData)
            setReady(true)
        },[refresh]
    )

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={() => {
                setRefresh(true)
                setTimeout(() => {
                    setRefresh(false)
                }, 1000);
            }}/>
        }>
            <TouchableOpacity style = {styles.container} onPress={() => {
                Nav.navigate("LongSchoolDatabase");
            }}>
                <View style = {styles.header_container}>
                    <Text style = {styles.school_quest_header}>SchoolDataBase</Text>
                </View>

                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title><Text>StudentID</Text></DataTable.Title>
                    </DataTable.Header>
                {
                    Object.keys(student_Data).map((key) => {
                        return(
                            <DataTable.Row>
                                <DataTable.Cell><Text>{key}</Text></DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }

                </DataTable>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'blue',
        paddingTop: 0,
        borderWidth: 3,
    },
    header_container: {
        borderColor: 'blue',
        paddingTop: 0,
        
        borderBottomWidth: 3
    },
    school_quest_header:{
        fontSize: 15,
        color: 'black',
        borderColor: 'blue',
        paddingLeft: 10,
        paddingBottom: 10,
    },
    student_data_container:{
        justifyContent: 'space-between',
        flexDirection: 'column',
    }
})


