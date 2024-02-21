import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Modal, Button } from "react-native";
import Task from "./Task";
import Profile from "./Profile";
import axios from "axios";

const ListComponent = () => {
    const [taskItems, setTaskItems] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchData();
        }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.unsplash.com/photos/', {
                params: {
                    client_id: 'tmXX2qlmRsZbsX7eXhvWsY1wfSpKeQj6fU9EQN0fkAw'
                }
            });
            const jsonData = response.data;
            setTaskItems(jsonData);
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const Item = ({ task }) => (
        <TouchableOpacity style={styles.perItem} onPress={() => getProfile(task)}>
            <Task task={task}/>
        </TouchableOpacity>
        );

    const getProfile = (task) => {
        setSelectedTask(task);
        setShowProfile(true);
    };

    const closeProfile = () => {
        setShowProfile(false);
        setSelectedTask(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>Datos recuperados: </Text>
                <FlatList
                    data={taskItems}
                    renderItem={({ item }) => <Item task={item} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <Modal
                transparent={true}
                animationType={'slide'}
                visible={showProfile}
                onRequestClose={() => setShowProfile(false)}
                >
                <View style={styles.centerView}>
                    <View style={styles.modalView}>
                        {selectedTask && (
                            <>
                            <Profile task={selectedTask} />
                            <Button title="Cerrar" onPress={closeProfile} />
                            </>
                            )}
                    </View>
                </View>
            </Modal>
        </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        marginTop: StatusBar.currentHeight || 0
    },
    taskWrapper: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    perItem: {
        marginBottom: 40
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        width: '80%',
        maxHeight: '80%',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export default ListComponent;
