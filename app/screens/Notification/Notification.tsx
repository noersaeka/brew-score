import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text,ScrollView,TouchableOpacity, LayoutAnimation, Image } from 'react-native'
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwipeBox from '../../components/SwipeBox';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';


const SwipeData = [
    {
        image: IMAGES.brand5,
        title: "New Arrivals Alert!",
        date: "15 July 2024"
    },
]

const Notification = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const navigation = useNavigation<any>();

    const [lists, setLists] = useState<any>(SwipeData);

    const deleteItem = (index:any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists];
        arr.splice(index, 1);
        setLists(arr);
    };

    return (
        <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='Notifications (1)'
                leftIcon='back'
                rightIcon1={'search'}
            />
            <ScrollView contentContainerStyle={{paddingBottom:50}}>
                <View style={[GlobalStyleSheet.container,{padding:0,paddingTop:15}]}>
                    <GestureHandlerRootView style={{paddingHorizontal:15}}>
                        {lists.map((data:any,index:any) => {
                            return(
                                <View
                                    style={{marginBottom:5,marginHorizontal:-15,paddingHorizontal:15}}
                                    key={index}
                                >
                                    <SwipeBox data={data} colors={colors} handleDelete={() => deleteItem(index)} />
                                </View>
                            )
                        })}
                    </GestureHandlerRootView>
                </View>
            </ScrollView>
        </View>
    )
}

export default Notification