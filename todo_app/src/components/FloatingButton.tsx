import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  onPress?: () => void;
}

const FloatingButton = (props: Props) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Button icon="plus" children={undefined} onPress={props.onPress} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

export default FloatingButton;
