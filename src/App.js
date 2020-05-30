import React, { Component } from 'react';
import './App.css';

import Controls from './components/Controls';
import Board from './components/Board';

const NUM_STAGES = 4;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
          { name: 'task 0', stage: 0 },
          { name: 'task 1', stage: 0 },
          { name: 'task 2', stage: 0 },
          { name: 'task 3', stage: 0 },
          { name: 'task 4', stage: 1 },
          { name: 'task 5', stage: 1 },
          { name: 'task 6', stage: 1 },
          { name: 'task 7', stage: 2 },
          { name: 'task 8', stage: 2 },
          { name: 'task 9', stage: 3 },
      ],
      selectedTask: { name: '', stage: -1 }
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  addTaskToStage = (name, stage) => {
    const tasks = this.state.tasks;
    tasks.push({ name, stage });
    this.setState({ tasks });
  };

  deleteTaskFromStage = () => {
    const { selectedTask, tasks } = this.state;
    const filteredTasks = tasks.filter((task) => {
      return !(task.name === selectedTask.name && task.stage === selectedTask.stage);
    });
    this.setState({ tasks: filteredTasks, selectedTask: { name: '', stage: -1 } });
  };

  moveTask = (back) => {
    const { name, stage } = this.state.selectedTask;

    const tasks = this.state.tasks.filter((task) => {
      return !(task.name === name && task.stage === stage);
    });

    tasks.push({ name, stage: back? stage - 1: stage + 1 });

    this.setState({ 
      tasks,
      selectedTask: {
        name,
        stage: back? stage - 1: stage + 1
      }
    });
  };

  setSelectedTask = (name, stage) => {
    this.setState({ selectedTask: {name, stage}});
    console.log(this.state);
  };

  enableMoveBack = () => this.state.selectedTask.stage > 0 && this.state.selectedTask.stage <= 3;

  enableMoveForward = () => this.state.selectedTask.stage >= 0 && this.state.selectedTask.stage < 3;

  render() {
    const { tasks, selectedTask } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < NUM_STAGES; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }
    
    return (
      <div className="App">
        <Controls 
          addTaskToStage={this.addTaskToStage}
          selectedTask={selectedTask}
          enableMoveBack={this.enableMoveBack()}
          enableMoveForward={this.enableMoveForward()}
          moveTask={this.moveTask}
          deleteTaskFromStage={this.deleteTaskFromStage}
        />
        <Board
          stagesTasks={stagesTasks}
          stagesNames={this.stagesNames}
          setSelectedTask={this.setSelectedTask}
        />
      </div>
    );
  }
}

export default App;
