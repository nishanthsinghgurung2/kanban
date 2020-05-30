import React, { Component } from 'react';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: ""
    };
  }

  handleChange = (e) => {
    this.setState({ newTask: e.target.value });
  };
  render() {
    return (
      <div style={{ padding: '1rem', background: '#D6F3FF' }}>
        <h1>Controls</h1>
        <div style={{ display: 'flex' }}>
          <input
            placeholder="New task name"
            style={{ fontSize: '1rem' }}
            data-testid="new-task-name-input"
            onChange={this.handleChange}
            value={this.state.newTask}
          />
          <button
            style={{ marginLeft: '1rem' }}
            disabled={!this.state.newTask}
            data-testid="create-task-btn"
            onClick={() => this.props.addTaskToStage(this.state.newTask, 0)}
          >
            Create
          </button>
        </div>
        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <input
            readOnly
            placeholder="Selected task name"
            style={{ fontSize: '1rem' }}
            data-testid="selected-task-field"
            value={this.props.selectedTask.name}
          />
          <button
            style={{ marginLeft: '1rem' }}
            disabled={!this.props.enableMoveBack}
            onClick={() => this.props.moveTask(true)}
            data-testid="move-back-btn"
          >
            Move back
          </button>
          <button
            style={{ marginLeft: '1rem' }}
            disabled={!this.props.enableMoveForward}
            onClick={() => this.props.moveTask()}
            data-testid="move-forward-btn"
          >
            Move forward
          </button>
          <button
            style={{ marginLeft: '1rem' }}
            disabled={!this.props.selectedTask.name}
            data-testid="delete-btn"
            onClick={() => this.props.deleteTaskFromStage()}
          >
            Delete
          </button>
        </div>
      </div>
    )
  }
}

export default Controls;
