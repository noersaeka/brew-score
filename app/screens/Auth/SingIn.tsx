import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import React, { use, useState } from 'react';
import { COLORS, FONTS } from '../../constants/theme'
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { useTheme } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/RootStackParamList'
import Input from '../../components/Input/Input'
import { IMAGES } from '../../constants/Images'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button/Button'
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from '../../context/ToastContext';

type SingInScreenProps = StackScreenProps<RootStackParamList, 'SingIn'>;

const SingIn = ({ navigation }: SingInScreenProps) => {

    const theme = useTheme();
    const toast = useToast();
    const { colors }: { colors: any } = theme;

    const [isFocused, setisFocused] = useState(false);
    const [isFocused2, setisFocused2] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        signInWithEmailAndPassword(getAuth(), email, password)
            .then(async () => {
                console.log('User account created & signed in!');
                const idToken = await getAuth().currentUser.getIdToken(true);
                await AsyncStorage.setItem('userToken', idToken);
                navigation.navigate('DrawerNavigation', { screen: 'Home' })
            })
            .catch(error => {
                console.log('error', error.code)
                if (error.code === 'auth/user-not-found') {
                    toast.show("User not found!", 'error')
                }
                if (error.code === 'auth/wrong-password') {
                    toast.show("Wrong Password!", 'error')
                }
                if (error.code === 'auth/invalid-email') {
                    toast.show("Invalid Email!", 'error')
                }
                if (error.code === 'auth/user-disabled') {
                    toast.show("Used disabled!", 'error')
                }
                if (error.code === 'auth/invalid-credential') {
                    toast.show("Invalid Credential!", 'error')
                }
            });

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card, }}>
            <View style={[GlobalStyleSheet.container, { justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }]}>
                {/* <Image
                    style={{ resizeMode: 'contain', height: 36 }}
                    source={theme.dark ? IMAGES.appnamedark : IMAGES.appname}
                /> */}
            </View>
            <ScrollView style={{ flexGrow: 1, }} showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container, { flexGrow: 1, paddingBottom: 0, paddingHorizontal: 30, paddingTop: 0 }]}>
                    <View style={{}}>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={[styles.title1, { color: colors.title }]}>Get Start!</Text>
                            <Text style={[styles.title2, { color: colors.title }]}>Log your brews, improve consistency, and discover what makes your perfect cup</Text>
                        </View>
                        <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
                            <Text style={[styles.title3, { color: '#8A8A8A' }]}>Email</Text>
                        </View>
                        <View style={{ marginBottom: 20, marginTop: 10 }}>
                            <Input
                                onFocus={() => setisFocused(true)}
                                onBlur={() => setisFocused(false)}
                                onChangeText={(value) => setEmail(value)}
                                value={email}
                                isFocused={isFocused}
                                inputBorder
                                defaultValue=''
                                placeholder='Enter your email'
                            />
                        </View>
                        <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
                            <Text style={[styles.title3, { color: '#8A8A8A' }]}>Password</Text>
                        </View>
                        <View style={{ marginBottom: 10, marginTop: 10 }}>
                            <Input
                                onFocus={() => setisFocused2(true)}
                                onBlur={() => setisFocused2(false)}
                                backround={colors.card}
                                onChangeText={(value) => setPassword(value)}
                                value={password}
                                isFocused={isFocused2}
                                type={'password'}
                                inputBorder
                                defaultValue=''
                                placeholder='Enter your password'
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Button
                            title={"LOGIN"}
                            // onPress={() => navigation.navigate('DrawerNavigation', { screen: 'Home' })}
                            onPress={handleSignIn}
                            style={{ borderRadius: 52 }}
                        />
                        <View
                            style={[GlobalStyleSheet.flex, {
                                marginBottom: 20,
                                marginTop: 10,
                                paddingHorizontal: 10,
                                justifyContent: 'flex-start',
                                gap: 5
                            }]}
                        >
                            <Text style={[styles.text, { color: colors.title }]}>Forgot Password?</Text>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => navigation.navigate('ForgotPassword')}
                            >
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: COLORS.primary }}>Reset here</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={[styles.title2, { color: colors.title, textAlign: 'center', opacity: .5 }]}>Don’t have an account?</Text>
                        </View>
                        <Button
                            title={"Create an account"}
                            onPress={() => navigation.navigate('SignUp')}
                            text={COLORS.title}
                            color={COLORS.secondary}
                            style={{ borderRadius: 52 }}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container, { justifyContent: 'center', alignItems: 'center', paddingVertical: 0, paddingBottom: 10 }]}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                >
                    <FeatherIcon name='arrow-left' size={14} color={COLORS.title} />
                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, marginLeft: 10, color: COLORS.primary }}>More login option</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        ...FONTS.fontRegular,
        fontSize: 14,
        color: COLORS.title,
    },
    title1: {
        ...FONTS.fontSemiBold,
        fontSize: 24,
        color: COLORS.title,
        marginBottom: 5
    },
    title2: {
        ...FONTS.fontRegular,
        fontSize: 14,
        color: COLORS.title,
    },
    title3: {
        ...FONTS.fontMedium,
        fontSize: 14,
        color: '#8A8A8A'
    }
})

export default SingIn