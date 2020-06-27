import React from 'react';
import { AddNewItem } from './AddNewItem';
import { AppStateProvider } from './AppStateContext';
import { Card } from './Card';
import { Column } from './Column';
import { AppContainer } from './styles';

function App() {
  return (
    <AppStateProvider>
      <AppContainer>
        <Column text="To Do">
          <Card text="Generate app scaffold" />
        </Column>
        <Column text="In Progress">
          <Card text="Practice Prototyping" />
        </Column>
        <Column text="Done">
          <Card text="Set up TS to work with React" />
        </Column>
        <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
      </AppContainer>
    </AppStateProvider>
  );
}

export default App;
