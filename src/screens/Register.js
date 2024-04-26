
import React, { useState } from 'react'
import { Alert, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const [showPasswordConfirm, setShowPasswordConfirm] = useState('');

    const handleRegisterAccount = () => {
        auth().createUserWithEmailAndPassword(email, password)
        .then(() => Alert.alert("Đăng ký thành công"))
        .catch(e => {
            const errorMessage = e.message.split('] ')[1];
            console.log(errorMessage);
          })
    }

    const hasErrorPassword = () => password.length > 0 && password.length < 6 
    const hasErrorPasswordConfirm = () => passwordConfirm != password
    //const hasErrorEmail = () => 

  return (
    <View>
      <TextInput label={"Email"} value={email} onChangeText={setEmail}/>
      <TextInput label={"Password"} value={password} secureTextEntry={!showPassword} onChangeText={setPassword} right={<TextInput.Icon icon={"eye"} onPress={() => setShowPassword(!showPassword)}/>}/>
      <HelperText type='error' visible={hasErrorPassword}>
        Password phải ít nhất 6 kí tự
      </HelperText>
      <TextInput label={"PasswordConfirm"} value={passwordConfirm} secureTextEntry={!showPasswordConfirm} onChangeText={setPasswordConfirm} right={<TextInput.Icon icon={"eye"} onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}/>}/>
      <HelperText type='error' visible={hasErrorPasswordConfirm}>
        PasswordConfirm không khớp với Password
      </HelperText>
      <Button mode='contained' onPress={handleRegisterAccount}>Register</Button>
    </View>
  )
}

export default Register