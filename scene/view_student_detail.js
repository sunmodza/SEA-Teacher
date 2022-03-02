import { StyleSheet, Text, View ,Image,ScrollView,AsyncStorage,Button,TextInput} from 'react-native';
import 'firebase/storage';
import {getAuth} from 'firebase/auth'
import { useEffect,useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { getFirestore , collection ,getDocs,getDoc,onSnapshot,doc,query,setDoc,updateDoc,arrayUnion} from "firebase/firestore";
//import { removeAllListeners } from 'npm';
//import storage from '@react-native-firebase/storage';

export default function Detail(props) {
    const Nav = useNavigation();
    const subject = props.route.params.subject;
    //const all_event = props.route.params.all_event;
    const [all_event,setAllEvent] = useState([])
    //const total_score = props.route.params.total_score
    const student_id = props.route.params.student_id;
    const [total_score,setTotalScore] = useState(0)

    useEffect(() => {
        const ref = doc(collection(getFirestore(),"score_database"),student_id)
        onSnapshot(ref,(doc) => {
            //console.log(doc.data()[subject])
            setAllEvent(doc.data()[subject])
            let total = 0;
            let total_full = 0;
            try {
                if (doc.data()[subject].length !== 0) {
                    doc.data()[subject].forEach(element => {
                        total+=parseFloat(element.point)
                        total_full+=parseFloat(element.full_score)
                    })
                }
            } catch (error) {
                console.log(error)
            }
            
            setTotalScore(total)
            setTotalFullScore(total_full)
        })
    },[])
    const [total_full_score,setTotalFullScore] = useState(0)

    const [newScore,setNewScore] = useState(0)
    const [newEvent,setNewEvent] = useState("")
    const [newFullScore,setNewFullScore] = useState(0)

    return (
        <ScrollView style={styles.container}>
            <DataTable>
                    <Text style={styles.headtext}>{subject}</Text>
                    
                    <DataTable.Header>
                        <DataTable.Title>EVENT</DataTable.Title>
                        <DataTable.Title>SCORE</DataTable.Title>
                        <DataTable.Title>FULL</DataTable.Title>
                    </DataTable.Header>

                    {Object.entries(all_event).map(([key,value]) => {
                        //setTotalScore(total_score + value.point);
                        return (
                                <DataTable.Row>
                                    <DataTable.Cell>{value.event}</DataTable.Cell>
                                    <DataTable.Cell>{value.point}</DataTable.Cell>
                                    <DataTable.Cell>{value.full_score}</DataTable.Cell>
                                </DataTable.Row>
                                )
                    })}
                    <DataTable.Header>
                        <DataTable.Title>TOTAL</DataTable.Title>
                        <DataTable.Title>{total_score}</DataTable.Title>
                        <DataTable.Title>{total_full_score}</DataTable.Title>
                    </DataTable.Header>
                    <TextInput placeholder='event_name' onChangeText={setNewEvent}/>
                    <TextInput placeholder='score' onChangeText={setNewScore}/>
                    <TextInput placeholder='full_score' onChangeText={setNewFullScore}/>
                    <Button title="ADD" onPress={()=>{
                                const db = getFirestore()
                                const ref = doc(collection(db,"score_database"),student_id)
                                updateDoc(ref,{[subject]:arrayUnion({event:newEvent,point:newScore,full_score:newFullScore})})
                                //addDoc(subref,{addText:[]})
                                }} style={styles.addButton}/>
                </DataTable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#fff',

        //justifyContent: 'flex-start',

        paddingTop: 0,
        paddingLeft: 10,
    },
    text: {
        fontSize: 15,
        color: 'blue',
        textAlign: 'left',
    },
    score: {
        fontSize: 30,
        color: 'red',
    },
    map:{
        width: '100%',
        resizeMode: 'contain',
        alignContent: 'center',
        justifyContent: 'center',
    },
});