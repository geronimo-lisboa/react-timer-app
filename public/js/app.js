////O dashboard dos timers.
class TimersDashboard extends React.Component{
    render(){
        return(
            <div className='ui theme column centered grid'>
                <div className='column'>
                    <EditableTimerList/>
                    <ToggleableTimerForm
                        isOpen={true}
                    />
                </div>
            </div>
        );
    }
}

class EditableTimerList extends React.Component{
    render(){
        return(
            <div>
                Editable Timer List
            </div>
        );
    }
}

class ToggleableTimerForm extends React.Component{
    render(){
        return(
            <div>
                Toggleable timer form
            </div>
        );
    }
}

ReactDOM.render(
  <TimersDashboard />,
  document.getElementById('content')
);
