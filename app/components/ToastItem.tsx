import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  toast: {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
  };
  onDismiss: () => void;
};

const ToastItem: React.FC<Props> = ({ toast, onDismiss }) => {
  const iconMap = {
    success: 'check-circle',
    error: 'x-circle',
    info: 'info',
  };

  const colorMap = {
    success: '#4CAF50',
    error: '#F44336',
    info: '#2196F3',
  };

  return (
    <View style={[styles.toast, { backgroundColor: colorMap[toast.type] }]}>
      <Feather name={iconMap[toast.type]} size={20} color="#fff" style={styles.icon} />
      <Text style={styles.text}>{toast.message}</Text>
      <TouchableOpacity onPress={onDismiss}>
        <Feather name="x" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    elevation: 6,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#fff',
    flex: 1,
    fontWeight: '500',
  },
});

export default ToastItem;
