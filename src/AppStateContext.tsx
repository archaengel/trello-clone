import React, { createContext, useContext, useReducer } from 'react';
import { nanoid } from 'nanoid';
import { DragItem } from './DragItem';
import { findItemIndexById } from './utils/findItemIndexById';
import { moveItem } from './utils/moveItem';

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

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Practice prototyping' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Use TS with React' }],
    },
  ],
  draggedItem: undefined,
};

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
      type: 'SET_DRAGGED_ITEM';
      payload: DragItem | undefined;
    };

const appStateReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'SET_DRAGGED_ITEM': {
      console.log('set dispatched', action.payload);
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
    default:
      return state;
  }
};

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
