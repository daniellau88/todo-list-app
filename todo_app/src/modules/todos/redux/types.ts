import {TodoListEntity, TodoListMiniEntity} from '../../../typings/model';
import {EntityCollection, EntityStore} from '../../../typings/store';

export interface TodoListState {
  collectionTodoLists: EntityCollection;
  todoLists: EntityStore<TodoListMiniEntity, TodoListEntity>;
}
