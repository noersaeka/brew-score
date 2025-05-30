import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS } from '../../constants/theme'
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { useTheme } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/RootStackParamList'
import Input from '../../components/Input/Input'
import { IMAGES } from '../../constants/Images'
import Button from '../../components/Button/Button'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User
} from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';


const firebaseApp = getApp();
const auth = getAuth(firebaseApp);

type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: SignUpScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [isFocused, setisFocused] = useState(false);
    const [isFocused2, setisFocused2] = useState(false);
    const [isFocused3, setisFocused3] = useState(false);

    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);


    const handleSignup = async (): Promise<void> => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.reset({
                index: 0,
                routes: [{ name: 'WelCome' }],
            });
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card, }}>
            <View style={[GlobalStyleSheet.container, GlobalStyleSheet.flexcenter, { paddingVertical: 50 }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.5}
                    style={[styles.imagebackground, {
                        backgroundColor: '#F6F6F6',
                    }]}
                >
                    <FeatherIcon name='arrow-left' size={24} color={COLORS.title} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', marginLeft: -40 }}>
                    {/* <Image
                    style={{height:36}}
                    source={theme.dark ? IMAGES.appnamedark :IMAGES.appname}
                /> */}
                </View>
            </View>
            <ScrollView style={{ flexGrow: 1, }} showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container, { flexGrow: 1, paddingBottom: 0, paddingHorizontal: 30, paddingTop: 0 }]}>
                    <View style={{}}>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={[styles.title1, { color: colors.title }]}>Create an account</Text>
                            <Text style={[styles.title2, { color: colors.title }]}>Start your brew journey — save your scores, recipes, and favorite brews</Text>
                        </View>
                        <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
                            <Text style={[styles.title3, { color: '#8A8A8A' }]}>Name</Text>
                        </View>
                        <View style={{ marginBottom: 20, marginTop: 10 }}>
                            <Input
                                onFocus={() => setisFocused(true)}
                                onBlur={() => setisFocused(false)}
                                onChangeText={(value) => setName(value)}
                                isFocused={isFocused}
                                inputBorder
                                defaultValue=''
                                value={name}
                            />
                        </View>
                        <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
                            <Text style={[styles.title3, { color: '#8A8A8A' }]}>Email</Text>
                        </View>
                        <View style={{ marginBottom: 20, marginTop: 10 }}>
                            <Input
                                onFocus={() => setisFocused2(true)}
                                onBlur={() => setisFocused2(false)}
                                backround={colors.card}
                                onChangeText={(value) => setEmail(value)}
                                isFocused={isFocused2}
                                type={'email-address'}
                                inputBorder
                                defaultValue=''
                                value={email}
                            />
                        </View>
                        <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
                            <Text style={[styles.title3, { color: '#8A8A8A' }]}>Password</Text>
                        </View>
                        <View style={{ marginBottom: 10, marginTop: 10 }}>
                            <Input
                                onFocus={() => setisFocused3(true)}
                                onBlur={() => setisFocused3(false)}
                                backround={colors.card}
                                onChangeText={(value) => setPassword(value)}
                                isFocused={isFocused3}
                                type={'password'}
                                inputBorder
                                defaultValue=''
                                value={password}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Button
                            title={"Sign Up"}
                            color={'#606060'}
                            onPress={handleSignup}
                            style={{ borderRadius: 52 }}
                        />
                        <View style={{ marginTop: 10 }}>
                            <Text style={[styles.title2, { color: theme.dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', textAlign: 'center' }]}>By tapping “Sign Up” you accept our <Text style={[styles.title1, { fontSize: 14, color: COLORS.primary }]}>terms</Text> and <Text style={[styles.title1, { fontSize: 14, color: COLORS.primary }]}>condition</Text></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    },
    imagebackground: {
        height: 46,
        width: 46,
        borderRadius: 50,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default SignUp