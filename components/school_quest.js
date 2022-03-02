import {db,app,auth_tool} from '../firebase-config';
import { useState , useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,RefreshControl} from 'react-native';
import { getFirestore , collection ,getDocs,getDoc,onSnapshot} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage,ref,listAll } from "firebase/storage";
import {DataTable} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export function get_student_id(){
    return getAuth().currentUser.email.split('@')[0];
}

export function get_summited_quest(){
    const storage = getStorage();
    const my_id = get_student_id();
    let summited = [];
    const v = listAll(ref(storage,"/quest_summit")).then(
        (res) => {
            res.items.forEach((item) => {
                const focus = item.toString().split('-')
                //console.log(focus.toString())
                const student_id = focus[1].split('/').slice(-1).toString()
                const quest_name = focus.slice(-1).toString()
                //console.log(student_id,quest_name)
                //console.log(student_id,quest_name)
                summited.push([quest_name,student_id])
                //set_funct(quest_name,...summited)
                //summited = [...summited,quest_name]
                //setSummitedQuest(...summited_quest,quest_name)
            })
            return summited;
            //return summited;
            //setFunct(summited)
        }
    )
    return v;
}


export function communication(quest_funct){
    //server.get_quest() something
    const db = getFirestore(app);
    const q = collection(db, "school_events");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const all_data = {};
        querySnapshot.forEach((doc) => {
            const describe = doc.get('describe')
            const name = doc.get('name')
            const point = doc.get('point')
            const accomplishment = doc.get('accomplishment')
            const out_dated = doc.get('out-dated')
            const obj ={'describe':describe,'out-dated':out_dated,'name':name,'point':point,'accomplishment':accomplishment}
            
            all_data[doc.id] = obj;
        ;})    
        //console.log(all_data)
        quest_funct(all_data);
    });
}



export default function schoolQuest(){

    const [refresh,setRefresh] = useState(false)

    const [summited_quest_list,setSummitedQuestList] = useState([]);

    const [quest_list,setQuestList] = useState({});

    const [ready,setReady] = useState(false);

    const Nav = useNavigation();

    useEffect(
        () => {
            communication(setQuestList);
            get_summited_quest().then(
                (res) => {
                    setSummitedQuestList(res)
                    setReady(true)
                }
            )
        },[refresh]
    )
    let total = 0
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
                Nav.navigate("LongQuest");
            }}>
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
                            if (total < 2 && ready){
                                total+=1
                                const pointed_data = quest_list[item[0]];
                                //console.log(pointed_data.name)
                                return (
                                    <DataTable.Row style = {styles.student_data_container}>
                                        <DataTable.Cell>{pointed_data.name}</DataTable.Cell>
                                        <DataTable.Cell>{item[1]}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }
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