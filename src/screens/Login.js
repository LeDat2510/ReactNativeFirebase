import React, { useState } from 'react'
import { Alert, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import { GoogleSigninButton, GoogleSignin } from '@react-native-google-signin/google-signin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginAccount = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then(() => Alert.alert("Đăng Nhập thành công"))
            .catch(e => console.log(e.message))
    }

    GoogleSignin.configure({
        webClientId: '70117553697-mntm7sms6pmhgg3kev608iag1fhdu543.apps.googleusercontent.com',
    })

    const handleGoogleLogin = async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        auth().signInWithCredential(googleCredential)
        .then((data) => console.log(data))
        .catch(e => console.log(e))
    }

    return (
        <View>
            <TextInput label={"Email"} value={email} onChangeText={setEmail} />
            <TextInput label={"Password"} value={password} onChangeText={setPassword} />
            <Button mode='contained' onPress={handleLoginAccount}>Login</Button>
            <View style={{ flexDirection: "row" }}>
                <GoogleSigninButton onPress={handleGoogleLogin}></GoogleSigninButton>
            </View>
        </View>
    )
}

export default Login