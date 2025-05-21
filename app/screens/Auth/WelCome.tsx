import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import SocialBtn from '../../components/Socials/SocialBtn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { googleSignInWithWeb } from './SocialSignIn/GoogleSignInWeb';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

// import { GoogleSignin } from '@react-native-google-signin/google-signin'; // Optional if using for WebClientId config only
// import auth from '@react-native-firebase/auth';


type WelComeScreenProps = StackScreenProps<RootStackParamList, 'WelCome'>;

const WelCome = ({ navigation }: WelComeScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const handleGoogleSignIn = async () => {
        try {
            await googleSignInWithWeb();
            console.log('Google sign-in successful!');
        } catch (err) {
            console.error('Google sign-in failed:', err);
        }
    };

    const handleAppleSignIn = async () => {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            // Note: it appears putting FULL_NAME first is important, see issue #293
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated
        }
    }

    useEffect(() => {
        // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
        // return appleAuth.onCredentialRevoked(async () => {
        //     console.warn('If this function executes, User Credentials have been Revoked');
        // });
    }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.



    return (
        <View style={{ flex: 1, backgroundColor: colors.card, }}>
            <Image
                style={styles.welcomeimage}
                source={IMAGES.welcome}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[GlobalStyleSheet.container, { padding: 0, marginTop: 60, flex: 1 }]}>
                    {/* <Image
                        style={{ height: undefined, width: '100%', aspectRatio: 1 / 1, zIndex: 99 }}
                        source={IMAGES.welcome2}
                    /> */}
                </View>
                <LinearGradient colors={['rgba(4,118,78,0)', 'rgba(4,118,78,.5)']}>
                    <View style={[GlobalStyleSheet.container, { paddingHorizontal: 35, paddingBottom: 50 }]}>
                        <Text style={[styles.title, { color: colors.title }]}>Your personal guide to better brewing</Text>
                        <View style={{ marginBottom: 10 }}>
                            <SocialBtn
                                text='Login with email'
                                color={COLORS.primary}
                                textcolor={COLORS.card}
                                rounded
                                icon={<FontAwesome name='envelope' size={22} color={COLORS.card} />}
                                border={COLORS.primary}
                                onpress={() => navigation.navigate('SingIn')}
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <SocialBtn
                                text='Continue with Apple'
                                color={COLORS.card}
                                textcolor={COLORS.title}
                                rounded
                                icon={<Ionicons name='logo-apple' size={22} />}
                                onpress={handleAppleSignIn}
                            // border={'#376AED'}
                            />

                            {/* <AppleButton onPress={onAppleButtonPress} /> */}
                            {/* <AppleButton
                                buttonStyle={AppleButton.Style.WHITE}
                                buttonType={AppleButton.Type.SIGN_IN}
                                style={{
                                    width: 160,
                                    height: 45,
                                }}
                                onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
                            /> */}
                        </View>
                        <View>
                            <SocialBtn
                                text='Continue with Google'
                                color={COLORS.card}
                                textcolor={COLORS.title}
                                rounded
                                icon={<Image source={IMAGES.google2} style={{ resizeMode: 'contain', height: 22, width: 22 }} />}
                                onpress={handleGoogleSignIn}
                            />
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeimage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    title: {
        ...FONTS.fontSemiBold,
        fontSize: 24,
        color: COLORS.title,
        textAlign: 'center',
        paddingHorizontal: 30,
        paddingBottom: 20
    }
})

export default WelCome