import {TodoEntity, TodoListEntity} from '../../../typings/model';
import {
  EntityCollection,
  EntityCollectionSet,
  EntityStore,
} from '../../../typings/store';

export interface TodoListState {
  collectionTodoLists: EntityCollection;
  todoLists: EntityStore<TodoListEntity, TodoListEntity>;

  collectionSetTodoListTodos: EntityCollectionSet;
  todos: EntityStore<TodoEntity, TodoEntity>;
}
