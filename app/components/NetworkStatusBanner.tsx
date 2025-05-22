// components/NetworkStatusBanner.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useNetworkStatus from '../hooks/useNetworkStatus';

const NetworkStatusBanner = () => {
    const isConnected = useNetworkStatus();

    if (isConnected) return null;

    return (
        <View style={styles.banner}>
            <Text style={styles.text}>You are offline</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    banner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ff4d4d',
        padding: 10,
        alignItems: 'center',
        zIndex: 999,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default NetworkStatusBanner;
