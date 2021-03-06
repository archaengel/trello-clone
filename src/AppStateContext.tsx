import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { DragItem } from './DragItem';
import { findItemIndexById } from './utils/findItemIndexById';
import { moveItem } from './utils/moveItem';
import { save } from './api';
import { withData } from './withData';

interface Task {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppState {
  lists: List[];
  draggedItem: DragItem | undefined;
}

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

type Action =
  | {
      type: 'ADD_LIST';
      payload: string;
    }
  | {
      type: 'ADD_TASK';
      payload: { text: string; listId: string };
    }
  | {
      type: 'MOVE_LIST';
      payload: {
        hoverIndex: number;
        dragIndex: number;
      };
    }
  | {
      type: 'MOVE_TASK';
      payload: {
        dragIndex: number;
        hoverIndex: number;
        sourceColumn: string;
        targetColumn: string;
      };
    }
  | {
      type: 'SET_DRAGGED_ITEM';
      payload: DragItem | undefined;
    };

const appStateReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'SET_DRAGGED_ITEM': {
      return {
        ...state,
        draggedItem: action.payload,
      };
    }
    case 'ADD_LIST': {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: nanoid(), text: action.payload, tasks: [] },
        ],
      };
    }
    case 'ADD_TASK': {
      const targetListIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      );
      state.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text: action.payload.text,
      });
      return {
        ...state,
      };
    }
    case 'MOVE_LIST': {
      const { hoverIndex, dragIndex } = action.payload;
      return {
        ...state,
        lists: moveItem(state.lists, dragIndex, hoverIndex),
      };
    }
    case 'MOVE_TASK': {
      const {
        dragIndex,
        hoverIndex,
        sourceColumn,
        targetColumn,
      } = action.payload;
      const sourceListIndex = findItemIndexById(state.lists, sourceColumn);
      const targetListIndex = findItemIndexById(state.lists, targetColumn);
      const item = state.lists[sourceListIndex].tasks.splice(dragIndex, 1)[0];
      state.lists[targetListIndex].tasks.splice(hoverIndex, 0, item);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateProvider = withData(
  ({
    children,
    initialState,
  }: React.PropsWithChildren<{ initialState: AppState }>) => {
    const [state, dispatch] = useReducer(appStateReducer, initialState);

    useEffect(() => {
      save(state);
    }, [state]);

    return (
      <AppStateContext.Provider value={{ state, dispatch }}>
        {children}
      </AppStateContext.Provider>
    );
  }
);
