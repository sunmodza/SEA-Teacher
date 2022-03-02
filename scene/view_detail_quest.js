import { View ,Text,StyleSheet,Image,ScrollView,Button} from "react-native";
import { useState } from "react";
import { get_student_id } from "../components/school_quest";
import { getStorage ,ref ,uploadBytesResumable,putFile,upload,uploadString, uploadBytes,listAll,Alert,getDownloadURL,deleteObject} from 'firebase/storage'
import { useEffect } from "react/cjs/react.development";
import { useNavigation } from "@react-navigation/native";

import { getFirestore ,collection,setDoc,doc,getDoc,updateDoc,arrayUnion,deleteField, arrayRemove} from "firebase/firestore";

export default function ViewQuest(props){
    const quest_id = props.route.params.quest_id;
    const quest_detail = props.route.params.quest_detail;
    const submiter = props.route.params.submiter;
    const Nav = useNavigation();

    const [url,setUrl] = useState("");

    useEffect(() => {
        const storage = getStorage();
        const refer = ref(storage,'/quest_summit/' + submiter + '-' + quest_id);
        getDownloadURL(refer).then(
            (res) => {
                setUrl(res);
            }
        );
    } ,[])

    return (
        <ScrollView style={styles.container}>
            <Text>ID: {quest_id}</Text>
            <Text>FROM: {submiter}</Text>
            <Text>Name: {quest_detail.name}</Text>
            <Text>Description: {quest_detail.describe}</Text>
            <Image source={{uri:url}} style={styles.image}/>
            <Button title="APPROVE" onPress={() => {
                const db = getFirestore();
                const refer = doc(collection(db,'users'),submiter);
                getDoc(refer).then((v) => {
                    updateDoc(refer,{"quest_point":v.get("quest_point")+quest_detail.point});
                })
                //})
                updateDoc(refer,{"completed_quest":arrayUnion(quest_id)})
                deleteObject(ref(getStorage(),'/quest_summit/' + submiter + '-' + quest_id));
                const refer2 = doc(collection(db,'users'),submiter);
                //refer2.update({"summitting_quest":arrayRemove(arrayUnion(quest_id))})
                updateDoc(refer2,{"summitting_quest":arrayRemove(quest_id)});
                Nav.navigate("LongQuest");
            }}/>
            <Button title="REJECT" onPress={() => {
                deleteObject(ref(getStorage(),'/quest_summit/' + submiter + '-' + quest_id));
                const db = getFirestore();
                const refer2 = doc(collection(db,'users'),submiter);
                //refer2.update({"summitting_quest":arrayRemove(arrayUnion(quest_id))})
                updateDoc(refer2,{"summitting_quest":arrayRemove(quest_id)});
                Nav.navigate("LongQuest");
            }
            }/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
    },
    image: {
        resizeMode: 'contain',
        width: 500,
        height: 500,
    }
})