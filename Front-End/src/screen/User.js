import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, Button, FlatList, Modal} from "react-native";
import axios from "axios";

const User = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [identification, setIdentification] = useState('')
    const [users, setUsers] = useState([])
    const [showEdit, setShowEdit] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {
        getUsers()
    }, [])

    const Item = ({item}) => {
        return (
            <View style={styles.itemContainer}>
                <View>
                    <Text style={styles.itemText}>{item.firstName}</Text>
                </View>
                <View>
                    <Text style={styles.itemText}>{item.lastName}</Text>
                </View>
                <View>
                    <Button title={'editar'} onPress={() => {
                        setSelectedUser(item)
                        setShowEdit(true)
                    }}/>
                </View>
                <View>
                    <Button title={'eliminar'} onPress={() => deleteUser(item)}/>
                </View>
            </View>
        )
    }

    const getUsers = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:6154/person/findAll');
            const jsonData = await response.json()
            setUsers(jsonData)
        } catch (e) {
            console.error('error', e)
        }

    }

    const deleteUser = async (item) => {
        try {
            const response = await axios.delete(`http://10.0.2.2:6154/person/deleteById/${item.id}`);
            if (response.status === 204) {
                setUsers(users.filter(i => i.id !== item.id));
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    const editUser = async () => {
        try {
            const response = await axios.put(`http://10.0.2.2:6154/person/update/${selectedUser.id}`, {
                nombres: selectedUser.firstName,
                apellidos: selectedUser.lastName,
                correo: 'correo@prueba.com',
                identificacion: '1234567890'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 204) {
                const index = users.findIndex(i => i.id === selectedUser.id);
                users[index] = {
                    id: selectedUser.id,
                    firstName: selectedUser.firstName,
                    lastName: selectedUser.lastName
                };
                setUsers([...users]); // Crear un nuevo array para actualizar el estado correctamente
                setShowEdit(false);
            }
        } catch (error) {
            console.error('Error al editar el usuario:', error);
        }
    };

    const createUser = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:6154/person/save', {
                id: Math.floor(Math.random() * (120 - 20 + 1)) + 20,
                firstName: firstName,
                lastName: lastName,
                correo: 'correo@prueba.com',
                identificacion: '1234567890'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setFirstName('');
                setLastName('');
                const responseJSON = response.data;
                setUsers([...users, responseJSON]);
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput value={firstName} onChangeText={setFirstName} placeholder="First Name" style={styles.input}/>
            <TextInput value={lastName} onChangeText={setLastName} placeholder="Last Name" style={styles.input}/>
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input}/>
            <TextInput value={identification} onChangeText={setIdentification} placeholder="Identification" style={styles.input}/>
            <Button title="Create" color="#D2B48C" onPress={createUser} style={styles.button}/>
            <View>
                {users.length > 0 && <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.itemTitle}>Nombre</Text>
                    </View>
                    <View>
                        <Text style={styles.itemTitle}>Apellido</Text>
                    </View>
                    <View>
                        <Text style={styles.itemTitle}>Correo</Text>
                    </View>
                    <View>
                        <Text style={styles.itemTitle}>Identificacion/Pasaporte</Text>
                    </View>
                    <View>
                        <Text style={styles.itemTitle}>Editar</Text>
                    </View>
                    <View>
                        <Text style={styles.itemTitle}>Eliminar</Text>
                    </View>
                </View>}
                <FlatList data={users}
                          keyExtractor={i => i.id.toString()}
                          renderItem={({item}) => <Item item={item}/>}/>
                <Modal transparent={true} animationType={'slide'}
                       visible={showEdit}
                >
                    <View style={styles.centerView}>
                        <View style={{
                            height: 300,
                            backgroundColor: 'white',
                            width: '100%',
                            borderRadius: 25,
                            padding: 20
                        }}>
                            <TextInput value={selectedUser.firstName} onChangeText={(value) => {
                                setSelectedUser({...selectedUser, firstName: value})
                            }} placeholder="First Name" style={styles.input}/>
                            <TextInput value={selectedUser.lastName} onChangeText={(value) => {
                                setSelectedUser({...selectedUser, lastName: value})
                            }} placeholder="Last Name" style={styles.input}/>
                            <TextInput value={selectedUser.email} onChangeText={(value) => {
                                setSelectedUser({...selectedUser, email: value})
                            }} placeholder="Email" style={styles.input}/>
                            <TextInput value={selectedUser.identification} onChangeText={(value) => {
                                setSelectedUser({...selectedUser, identification: value})
                            }} placeholder="Identification" style={styles.input}/>
                            <Button title={'Edit'} onPress={editUser}/>

                            <Button title={'Cancelar'} onPress={() => setShowEdit(false)}/>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            padding: 10,
            display: 'flex'
        },
        itemContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10
        },
        input: {
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            margin: 10
        },
        itemText: {
            fontSize: 20,
            fontWeight: 'normal'
        },
        itemTitle: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        centerView: {
            alignItems: 'center',
            justifyContent: 'center',
            margin: 30,
            flex: 1,
        },
        button: {
            borderWidth: 0, 
            borderRadius: 20, 
            paddingVertical: 8, 
            paddingHorizontal: 20, 
        }
    }
)
export default User