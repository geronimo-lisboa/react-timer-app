////O dashboard que contém tudo
class TimersDashboard extends React.Component{
  //O estado do TimersDashboard são as listas dos atributos dos timers.
  state = {
    timers: [
      {
        title:'Practice squat',
        project:'Gym Chores',
        id: uuid.v4(),
        elapsed:5456099,
        runningSince:Date.now(),
        enabled:false,
      },
      {
        title:'Bake squash',
        project:'Kitchen Chores',
        id: uuid.v4(),
        elapsed:1273998,
        runningSince:null,
        enabled:false,
      },
    ],
  };

  handleCreateFormSubmit = (timer)=>{
    this.createTimer(timer);
  };

  handleEditFormSubmit = (attrs)=>{
    this.updateTimer(attrs);
  };

  handleDeleteTimer = (timer)=>{
    this.deleteTimer(timer);
  }

  deleteTimer = (timerToDelete)=>{
    const modList = this.state.timers.filter((element)=>{
      return (element.id !== timerToDelete.id);
    });

    this.setState({
        timers:modList,
    });
  }

  updateTimer = (attrs)=>{
    this.setState({
      timers:this.state.timers.map((timer) => {
          if(timer.id === attrs.id){
            return Object.assign({}, timer, {
              title : attrs.title,
              project : attrs.project,
            });
          }else{
            return timer;
          }
      }),
    });
  }

  createTimer = (timer)=>{
    const t = helpers.newTimer(timer);
    this.setState({
        timers : this.state.timers.concat(t),
    });
  };

  //O método de renderização do dashboard. Passa a lista de timers que é estado do
  //dashboar para os componentes do dashboard.
  render(){
    return (
      <div className = 'ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTimerDelete={this.handleDeleteTimer}
            />
          <ToggleableTimerForm
            onFormSubmit = {this.handleCreateFormSubmit}
          />
        </div>
      </div>
    );
  }
}
//A lista dos timers - no momento tá hardcoded.
class EditableTimerList extends React.Component{
    render(){
        const timers = this.props.timers.map((timer) =>(
          <EditableTimer
            key={timer.id}
            id={timer.id}
            title={timer.title}
            project={timer.project}
            elapsed={timer.elapsed}
            runningSince={timer.runningSince}
            onFormSubmit={this.props.onFormSubmit}
            onTimerDelete={this.props.onTimerDelete}
            timerEnabled={this.props.enabled}
          />
        ));
        return (
          <div id='timers'>
            {timers}
          </div>
        );
    }
}
//O timer individual - O timer pode estar com o editor aberto ou não
class EditableTimer extends React.Component{
  state = {
    editFormOpen : false,
  };

  handleEditClick = () => {
    this.openForm();
  }

  handleFormClose = ()=>{
    this.closeForm();
  }

  handleSubmit = (timer)=>{
    this.props.onFormSubmit(timer);
    this.closeForm();
  }

  handleDeleteClick = (timer)=>{
    this.props.onTimerDelete(timer);
  }

  closeForm = ()=>{
    this.setState({editFormOpen:false});
  }

  openForm = ()=>{
    this.setState({editFormOpen:true});
  }

  render(){
    if(this.state.editFormOpen){
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    }else{
      return(
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onEditClick={this.handleEditClick}
          onDeleteClick={this.handleDeleteClick}
          timerEnabled={this.props.timerEnabled}
        />
      );
    }
  }
}
//-----------------------------------------------------------------------------
//O form do timer
class TimerForm extends React.Component{
  state = {
      title : this.props.title || '',
      project : this.props.project || '',
  };
  //O onChande do React envia o objeto 'e'. Esse objeto é um objeto de evento
  //com o valor atualizado do campo em target.value.
  handleTitleChange = (e) => {
    this.setState({title:e.target.value});
  };

  handleProjectChange = (e) =>{
    this.setState({project:e.target.value});
  };

  handleSubmit = () => {
      this.props.onFormSubmit({
          id : this.props.id,
          title : this.state.title,
          project : this.state.project,
      });
  };

  render(){
    //Se tem título é update, se não tem é create
    const submitText = this.props.id? 'Update':'Create';
    return(
      <div className = 'ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text' value={this.state.title} onChange={this.handleTitleChange} />
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text' value={this.state.project} onChange={this.handleProjectChange}/>
            </div>
            <div className='ui two bottom attached buttons'>
              <button className='ui basic blue button'
                      onClick={this.handleSubmit}
                      >
                {submitText}
              </button>
              <button className='ui basic red button'
                      onClick={this.props.onFormClose}
                      >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//-----------------------------------------------------------------------------
class ToggleableTimerForm extends React.Component{
  state = {
    isOpen : false,
  }
  handleFormOpen = () => {
      this.setState({isOpen:true});
  };

  handleFormClose = ()=>{
    this.setState({isOpen:false});
  };

  handleFormSubmit = (timer)=>{
    this.props.onFormSubmit(timer);//Chama o submit
    this.setState({isOpen:false});//Fecha a tela
  };

  render(){
    if(this.state.isOpen){
      return (
        <TimerForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    }else{
      return(
        <div className='ui basic content center aligned segment'>
          <button
            className='ui basic button icon'
            onClick={this.handleFormOpen}
          >
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}
//------------------------------------------------------------------------------
//Se o timer dono desse botão estiver parado ele deve exibir "Start" e, quando clicado,
//começar o timer. Se o timer dono desse botão estiver ativado, ele deve exibir "Stop"
//e parar o timer.
class TimerActionButton extends React.Component{
  render(){
      if(this.props.timerActive===true){
        return(
          <div className='ui bottom attached red basic button'>
            Stop
          </div>
          );
      }else{
        return(
          <div className='ui bottom attached blue basic button'>
            Start
          </div>
         );
      }
  }
}
//------------------------------------------------------------------------------
class Timer extends React.Component{
  componentDidMount(){
    //a cada 50ms ativa a fn forceUpdate, da react, que força a atualização do componente
    this.forceUpdateInterval = setInterval(()=>this.forceUpdate(), 50);
  }

  compnentWillUnmount(){
    //Serve para remover o forceUpdate que está agendado no forceUpdateInterval
    clearInterval(this.forceUpdateInterval);
  }

  onDeleteButtonClick = ()=>{
      this.props.onDeleteClick(this.props);
      //console.log(this.props);
  };

  render(){
    const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince);
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
          <span
            className='right floated edit icon'
            onClick={this.props.onEditClick}
          >
              <i className='edit icon' />
          </span>
          <span className='right floated trash icon'
                onClick={this.onDeleteButtonClick}>
            <i className='trash icon' />
          </span>
        </div>
        <TimerActionButton 
            timerEnabled ={this.props.timerEnabled}
        />
      </div>
    );
  }
}

//Responsável pela renderização do dashboard na div de id = content
ReactDOM.render(
  <TimersDashboard />,
  document.getElementById('content')
);
