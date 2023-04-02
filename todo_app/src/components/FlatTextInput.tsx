import React from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

interface Props {
  onBlur?: (text: string) => void;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  value?: string;
}

const FlatTextInput = (props: Props): JSX.Element => {
  const {onBlur, onChangeText, placeholder, value} = props;

  const [textInput, setTextInput] = React.useState('');

  React.useEffect(() => {
    if (value !== undefined && value !== textInput) {
      setTextInput(value);
    }
  }, [value]);

  const handleOnChangeText = (text: string) => {
    setTextInput(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleOnBlur = () => {
    if (onBlur) {
      onBlur(textInput);
    }
  };

  return (
    <TextInput
      onBlur={handleOnBlur}
      onChangeText={handleOnChangeText}
      underlineColor="transparent"
      mode="flat"
      style={styles.input}
      placeholder={placeholder}
      value={textInput}
      multiline={true}
      blurOnSubmit={true}
      dense={true}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
  },
});

export default FlatTextInput;
