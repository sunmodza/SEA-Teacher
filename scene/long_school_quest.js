import {db,app,auth_tool} from '../firebase-config';
import { useState , useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,RefreshControl, Button} from 'react-native';
import { getFirestore , collection ,getDocs,getDoc,onSnapshot,addDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage,ref,listAll } from "firebase/storage";
import {DataTable, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import { communication,get_student_id,get_summited_quest } from '../components/school_quest';
import {useIsFocused} from '@react-navigation/native';



export default function SchoolQuestLong(){

    const [summited_quest_list,setSummitedQuestList] = useState([]);

    const [quest_list,setQuestList] = useState({});

    const [quest,setQuest] = useState({});

    const Nav = useNavigation();

    const [refreshing,setRefreshing] = useState(false);

    const focused = useIsFocused();

    useEffect(
        () => {
            console.log(213)
            communication(setQuestList);
            get_summited_quest().then(
                (res) => {
                    setSummitedQuestList(res)
                    setRefreshing(false)
                }
            )
        const db = getFirestore(app);
        const q = collection(db, "school_events");
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const all = []
            querySnapshot.forEach((doc) => {
                const quest_name = doc.data()["name"]
                const quest_point = doc.data()["point"]
                const obj ={name:quest_name,point:quest_point}
                all.push(obj)
            })
            setQuest(all)
        });
        },[focused,refreshing]
    )

    const [quest_name,setQuestName] = useState("");
    const [quest_point,setQuestPoint] = useState("");
    const [quest_describe,setQuestDescribe] = useState("");
    const [quest_date,setQuestDate] = useState("");

    

    let total = 0
    return (
        <ScrollView style={styles.container} 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />}>
            <View style = {styles.header_container}>
                <Text style = {styles.school_quest_header}>SchoolQuestManager</Text>
            </View>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title><Text>Workname</Text></DataTable.Title>
                    <DataTable.Title><Text>StudentID</Text></DataTable.Title>
                </DataTable.Header>
                {
                    summited_quest_list.map((item) => {
                        const pointed_data = quest_list[item[0]];
                        return (
                            <TouchableOpacity onPress={() =>{
                                Nav.navigate("ViewQuest",{"quest_id":item[0],"quest_detail":pointed_data,"submiter":item[1]})
                            }}>
                            <DataTable.Row style = {styles.student_data_container}>
                                <DataTable.Cell>{pointed_data.name}</DataTable.Cell>
                                <DataTable.Cell>{item[1]}</DataTable.Cell>
                            </DataTable.Row>
                            </TouchableOpacity>
                        )
                    })
                }

            </DataTable>

            <DataTable style = {{paddingTop:30}}>
                <DataTable.Header>
                    <DataTable.Title><Text>Quest</Text></DataTable.Title>
                    <DataTable.Title><Text>point</Text></DataTable.Title>
                </DataTable.Header>
                {
                    Object.keys(quest).map((key) => {
                        return(
                            <DataTable.Row style = {styles.student_data_container}>
                                <DataTable.Cell>{quest[key].name}</DataTable.Cell>
                                <DataTable.Cell>{quest[key].point}</DataTable.Cell>
                        </DataTable.Row>
                    )
                    })
                }

            </DataTable>
            <Button title='ADD QUEST' onPress={() => {
                const q = collection(getFirestore(), "school_events");
                addDoc(q,{
                    describe:quest_describe,
                    name:quest_name,
                    point:quest_point,
                    "out-dated":quest_date
                })
            }}></Button>
            <TextInput placeholder='name' onChangeText={setQuestName}></TextInput>
            <TextInput placeholder='describe' onChangeText={setQuestDescribe}></TextInput>
            <TextInput placeholder='point' onChangeText={(text) => setQuestPoint(parseFloat(text))}></TextInput>
            <TextInput placeholder='out-dated' onChangeText={setQuestDate}></TextInput>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
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