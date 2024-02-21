import axios from "axios";
import React, {useState} from "react";
import * as FileSystem from 'expo-file-system';
import * as ExpoDocumentPicker from "expo-document-picker";
import {Text, View, StyleSheet, Button, TextInput} from "react-native";

const Pdf = () => {
    const [pdfDocs, setPdfDocs] = useState()
    const [question, setQuestion] = useState('')
    const [result, setResult] = useState('')
    const handleFilePicker = async () => {
        try {
            let result = await ExpoDocumentPicker.getDocumentAsync({multiple: true, copyToCacheDirectory: true});
            console.log(result);
            let pdfDocs = [];
            for (const file of result.docs) {
                let pdfURI = file.uri;
                let fileContent = await FileSystem.readAsStringAsync(pdfURI, { encoding: FileSystem.EncodingType.Base64 });
                pdfDocs.push({uri: 'data:application/pdf;base64,' + fileContent, name: file.name});
            }
            setPdfDocs(pdfDocs);
            console.log(pdfDocs);
        } catch (error) {
            console.error('Error al manejar la selección de archivos:', error);
        }
    }

    const handleUpload = async () => {
        try {
            if (!pdfDocs || pdfDocs.length === 0) {
                console.error('Debe seleccionar un archivo');
                return;
            }
            const data = new FormData();
            data.append('question', question);
            pdfDocs.forEach((pdfDoc, index) => {
                data.append('file' + index, {
                    uri: pdfDoc.uri,
                    type: 'application/pdf',
                    name: pdfDoc.name,
                });
            });
            const response = await axios.post('http://localhost:3000/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.status === 200) {
                setQuestion('');
                setResult(response.data.text);
            }
        } catch (error) {
            console.error('Error al manejar la carga:', error);
        }
    };

    return (
        <View>
            <Button title={'Selecciona el documento PDF'} color={'#D2B48C'} onPress={handleFilePicker}/>
            <TextInput style={styles.input} value={question} onChangeText={setQuestion}
                       placeholder={'Ingresa tu pregunta'}/>
            <Button title={'Enviar'} color={'#D2B48C'} onPress={handleUpload}/>
            <Text>{result}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10
    }
})
export default Pdf