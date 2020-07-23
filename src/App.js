import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';

const Profile = () => <div className='page'>You're on the Profile Tab</div>;
const Comments = () => <div className='page'>You're on the Comments Tab</div>;
const Contact = () => <div className='page'>You're on the Contact Tab</div>;

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

function App(props) {
  const { path } = props.match;
  const [items, setItems] = useState(getItems(6));
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  return (
    <div>
      <h1>Hey welcome home!</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable' direction='horizontal'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {/* {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))} */}
              <Draggable key='1' draggableId='1' index={1}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <Link to={`${path}`} className='link'>
                      Profile
                    </Link>
                  </div>
                )}
              </Draggable>
              <Draggable key='2' draggableId='2' index={2}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <Link to={`${path}/comments`} className='link'>
                      Comments
                    </Link>
                  </div>
                )}
              </Draggable>
              <Draggable key='3' draggableId='3' index={3}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <Link to={`${path}/contact`} className='link'>
                      Contact
                    </Link>
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className='links'>
        <Link to={`${path}`} className='link'>
          Profile
        </Link>
        <Link to={`${path}/comments`} className='link'>
          Comments
        </Link>
        <Link to={`${path}/contact`} className='link'>
          Contact
        </Link>
      </div>
      <div className='tabs'>
        <Switch>
          <Route path={`${path}`} exact component={Profile} />
          <Route path={`${path}/comments`} component={Comments} />
          <Route path={`${path}/contact`} component={Contact} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
