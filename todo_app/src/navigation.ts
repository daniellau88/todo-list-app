import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum ScreenName {
  TodoList = 'TodoList',
  TodoListTodos = 'TodoListTodos',
}

type RootStackParamList = {
  [ScreenName.TodoList]: undefined;
  [ScreenName.TodoListTodos]: {todoListId?: number; isCreate: boolean};
};

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;
type NavigationProp = Props['navigation'];
type SpecificProps<T extends ScreenName> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
type RouteProp<T extends ScreenName> = SpecificProps<T>['route'];

export const useAppNavigation = useNavigation<NavigationProp>;
export const useAppRoute = <T extends ScreenName>() => {
  return useRoute<RouteProp<T>>();
};
