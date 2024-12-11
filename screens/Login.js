import { Image, StyleSheet, TextInput, View, TouchableOpacity, Text, Alert } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = ({ navigation }) => {
  const handleLogin = async (values) => {
    const { userName, password } = values;
    try {
      const response = await fetch('https://doxero.acf.company/api/v1/Account/Signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, password: password }),
      });

      // const result = await response.json();

      if (response.ok) {
        Alert.alert('موفقیت', `خوش آمدید !`);
        navigation.navigate('Home');
        // Navigate to another screen or handle success logic
      } else {
        Alert.alert('ورودناموفق');
      }
    } catch (error) {
      Alert.alert( 'اتصال به سرور امکان‌پذیر نیست.');
    }
  };

  // Yup validation schema
  const LoginSchema = Yup.object().shape({
    userName: Yup.string()
      .required('لطفاً نام کاربری را وارد کنید.'),
    password: Yup.string()
      .required('لطفاً رمزعبور را وارد کنید.')
      .min(4, 'رمزعبور باید حداقل ۶ کاراکتر باشد.'),
  });

  return (
    <View style={styles.loginContainer}>
      <View style={styles.ImageContainer}>
        <Image
          source={require('../assets/lock.jpg')}
          style={styles.image}
        />
      </View>

      <Formik
        initialValues={{ userName: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, touched.userName && errors.userName ? styles.errorInput : null]}
              placeholder="نام کاربری"
              placeholderTextColor="#888"
              onChangeText={handleChange('userName')}
              onBlur={handleBlur('userName')}
              value={values.userName}
            />
            {touched.userName && errors.userName && (
              <Text style={styles.errorText}>{errors.userName}</Text>
            )}

            <TextInput
              style={[styles.input, touched.password && errors.password ? styles.errorInput : null]}
              placeholder="رمزعبور"
              placeholderTextColor="#888"
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>ورود</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageContainer: {
    paddingBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlign: 'right',
  },
  errorInput: {
    borderColor: '#f2661b',
  },
  button: {
    height: 50,
    backgroundColor: '#20055e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#f2661b',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'right',
  },
});
