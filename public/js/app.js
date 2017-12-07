////O dashboard que contém tudo
class TimersDashboard extends React.Component{
  render(){
    return (
      <div className = 'ui three column centered grid'>
        <div className='column'>
          <EditableTimerList />
          <ToggleableTimerForm
            isOpen={true}
          />
        </div>
      </div>
    );
  }
}
//A lista dos timers - no momento tá hardcoded.
class EditableTimerList extends React.Component{
    render(){
      return (
        <div id='timers'>
          <EditableTimer
            title='Foo'
            project='Web'
            elapsed='8986300'
            runningSince={null}
            editFormOpen={false}
          />
          <EditableTimer
            title='Bar'
            project='Fnord'
            elapsed='3890985'
            runningSince={null}
            editFormOpen={true}
          />
        </div>
      );
    }
}
//O timer individual
class EditableTimer extends React.Component{
  render(){
    if(this.props.editFormOpen){
      return (
        <TimerForm
          title={this.props.title}
          project={this.props.project}
        />
      );
    }else{
      return(
        <Timer
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      );
    }
  }
}
//O form do timer
class TimerForm extends React.Component{
  render(){
    //Se tem título é update, se não tem é create
    const submitText = this.props.title?'Update':'Create';
    return(
      <div className = 'ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text' defaultValue={this.props.title} />
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text' defaultValue={this.props.project} />
            </div>
            <div className='ui two bottom attached buttons'>
              <button className='ui basic blue button'>
                {submitText}
              </button>
              <button className='ui basic red button'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ToggleableTimerForm extends React.Component{
  render(){
    if(this.props.isOpen){
      return (
        <TimerForm />
      );
    }else{
      return(
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon'>
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}

class Timer extends React.Component{
  render(){
    const elapsedString = helpers.renderElapsedString(this.props.elapsed);
    return(
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
        </div>
        <div className='center aligned description'>
          <h2>
            {elapsedString}
          </h2>
        </div>
        <div className='extra content'>
          <span className='right floated edit icon'>
            <i className='edit icon' />
          </span>
          <span className='right floated trash icon'>
            <i className='trash icon' />
          </span>
        </div>
        <div className='ui bottom attached blue basic button'>
          Start
        </div>
      </div>
    );
  }
}

//Responsável pela renderização do dashboard na div de id = content
ReactDOM.render(
  <TimersDashboard />,
  document.getElementById('content')
);
