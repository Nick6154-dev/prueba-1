import React from "react";
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import kwaiIcon from "../../../assets/kwai.png";
import avatar from "../../../assets/perfil.png";
import coverPhoto from "../../../assets/wallpaper.jpg";

const ProfileCard = () => {
    const user = {
        name: "Pablo Nikolas Balseca Montufar"
    };

    const handleLinkPress = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Image source={coverPhoto} style={styles.coverPhoto} onError={(e) => console.log("Error de carga de imagen")}/>
            <View style={styles.avatarContainer}>
                <Image source={avatar} style={styles.avatar} onError={(e) => console.log("Error de carga de imagen")} />
                <Text style={styles.name}>{user.name}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleLinkPress('https://www.kwai.com/es')}>
                    <Image source={kwaiIcon} style={{width: 30, height: 30}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLinkPress('https://www.twitch.tv/nick6154')}>
                    <Icon name={'twitch'} size={30} color={'purple'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLinkPress('https://www.youtube.com/channel/UCI7JxMDyNLb_8hoi0gegySQ')}>
                    <Icon name={'youtube'} size={30} color={'red'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLinkPress('https://open.spotify.com/playlist/5cpDxhFJusnEHQj86aeQVQ?si=bad585fe77504585')}>
                    <Icon name={'spotify'} size={30} color={'green'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLinkPress('https://www.oracle.com/java/technologies/downloads/')}>
                    <Icon name={'language-java'} size={30} color={'black'}/>
                </TouchableOpacity>
            </View>
        </View>
        );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    coverPhoto: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -75
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 5,
        borderColor: 'white'
    },
    name: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '60%',
        justifyContent: 'space-between'
    }
});

export default ProfileCard;
