import React, { useState } from 'react'
import {  useTheme } from '@react-navigation/native';
import { View ,ScrollView, Text} from 'react-native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/reducer/cartReducer';
import { removeFromwishList } from '../../redux/reducer/wishListReducer';
import Cardstyle2 from '../../components/Card/Cardstyle2';

type FlightScreenProps = StackScreenProps<RootStackParamList, 'Flight'>;

const Flight = ({navigation} : FlightScreenProps) => {

    const wishList = useSelector((state:any) => state.wishList.wishList);
    const dispatch = useDispatch();

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const addItemToCart = (data: any) => {
        dispatch(addToCart(data));
    }

    const removeItemFromWishList = (data: any) => {
        dispatch(removeFromwishList(data));
    }

  return (
     <View style={{backgroundColor:colors.background,flex:1}}>
        <Header
          title='Flight'
          leftIcon={'back'}
          rightIcon1={'search'}
          //titleLeft
        />
        <ScrollView contentContainerStyle={{flexGrow:1,}}>
            <View style={[GlobalStyleSheet.container,{padding:15,alignItems:'center'}]}>
                  <View>
                      {wishList.map((data:any, index:any) => {
                          return (
                            <View key={index} style={{marginBottom:15}}>
                                <Cardstyle2
                                    id={data.id}
                                    brand={data.brand}
                                    image={data.image}
                                    price={data.price}
                                    countnumber={data.countnumber} 
                                    title={data.title}
                                    onPress={() => navigation.navigate('ProductsDetails')}                                        
                                    // onPress2={() => addItemToWishList(data)}                                
                                />
                            </View>
                          )
                      })}
                    {wishList.length === 0 && 
                        <View
                            style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <View
                                style={{
                                    height:60,
                                    width:60,
                                    borderRadius:60,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    backgroundColor:COLORS.primaryLight,
                                    marginBottom:20,
                                }}
                            >
                                <FeatherIcon color={COLORS.primary} size={24} name='heart'/>
                            </View>
                            <Text style={{...FONTS.h5,color:colors.title,marginBottom:8}}>Your Flight is Empty!</Text>    
                            <Text
                                style={{
                                    ...FONTS.fontSm,
                                    color:colors.text,
                                    textAlign:'center',
                                    paddingHorizontal:40,
                                    marginBottom:30,
                                }}
                            >Add Flight to your favourite and brew now.</Text>
                        </View>
                    }
                  </View>
              </View>
        </ScrollView>
     </View>
  )
}

export default Flight