import React from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

interface Props {
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  value?: string;
}

const FlatTextInput = (props: Props): JSX.Element => {
  const {onBlur, onChangeText, placeholder, value} = props;

  return (
    <TextInput
      onBlur={onBlur}
      onChangeText={onChangeText}
      underlineColor="transparent"
      mode="flat"
      style={styles.input}
      placeholder={placeholder}
      value={value}
      multiline={true}
      blurOnSubmit={true}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
  },
});

export default FlatTextInput;
