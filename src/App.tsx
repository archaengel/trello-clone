import React from 'react';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { Column } from './Column';
import { AppContainer } from './styles';

function App() {
  return (
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
  );
}

export default App;
