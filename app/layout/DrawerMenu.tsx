import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { IMAGES } from '../constants/Images';
import { COLORS, FONTS } from '../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ThemeBtn from '../components/ThemeBtn';
import { useDispatch } from 'react-redux';
import { closeDrawer } from '../redux/actions/drawerAction';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const DrawerMenu = ({ navigation }: any) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const { colors }: { colors: any } = theme;
    const MenuItems = [
        {
            id: "0",
            icon: IMAGES.logout,
            name: "Logout",
            navigate: 'SingIn',
            onPress: async () => {
                await auth().signOut();
                await AsyncStorage.removeItem('userToken');
                // navigation.navigate('SingIn');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'WelCome' }],
                });

            }
        },
    ]

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
                style={{
                    flex: 1,
                    // backgroundColor:colors.background,
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                }}
            >
                <View
                    style={{
                        alignItems: 'flex-end',
                        paddingVertical: 30,
                        paddingRight: 10
                    }}
                >
                    {/* <Image
                        style={{height:35,alignItems:'flex-end'}}
                        source={theme.dark ? IMAGES.appnamedark :IMAGES.appname}
                    /> */}
                </View>
                <View
                    style={[GlobalStyleSheet.flex, {
                        paddingHorizontal: 15,
                        paddingBottom: 20
                    }]}
                >
                    <Text style={{ ...FONTS.fontSemiBold, fontSize: 20, color: colors.title }}>Menu</Text>
                    <TouchableOpacity
                        onPress={() => navigation.closeDrawer()}
                        activeOpacity={0.5}
                    >
                        <FeatherIcon size={24} color={colors.title} name='x' />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingBottom: 10 }}>
                    {MenuItems.map((data: any, index: any) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={data.onPress}
                                key={index}
                                style={[GlobalStyleSheet.flex, {
                                    paddingVertical: 5,
                                    marginBottom: 0,
                                }]}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                    <View style={{ height: 45, width: 45, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            source={data.icon}
                                            style={{
                                                height: 24,
                                                width: 24,
                                                tintColor: data.id == '9' ? '#FF8484' : data.id === '0' ? COLORS.primary : '#BDBDBD',
                                                //marginRight:14,
                                                resizeMode: 'contain'
                                            }}
                                        />
                                    </View>
                                    <Text style={[FONTS.fontRegular, { color: colors.title, fontSize: 16, opacity: .6 }, data.id === '0' && { ...FONTS.fontSemiBold, fontSize: 16, color: COLORS.primary }]}>{data.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <ThemeBtn />
                </View>
                <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
                    <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: '#868686' }}>{DeviceInfo.getApplicationName()}</Text>
                    <Text style={{ ...FONTS.fontMedium, fontSize: 12, color: '#B1B1C3' }}>App Version {DeviceInfo.getVersion()}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default DrawerMenu