import React, { Component } from 'react'
import './Main.css'
import Notifications from './Components/Notifications/Notifications'
import NewWorks from './Components/NewWorks/NewWorks'
import { Typography } from '@material-ui/core';
import AddWork from './Components/SidePage'

interface Props{
    isCritic?: boolean,
    handleCritic() : void,
    changePage(event : React.MouseEvent<HTMLButtonElement>): void,
    role?: string
}

interface State{
    isCritic?: boolean,
    opened?: boolean
}

class Main extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isCritic : this.props.isCritic,
            opened : false
        }
    }

    private changeCriticStatus = () => {
        let newCriticStatus = !this.state.isCritic
        this.setState({isCritic : newCriticStatus})
        this.props.handleCritic()
    }

        
    private openSidePage = () => {
      this.setState({ opened: true });
      }
    
    private closeSidePage = () => {
    this.setState({ opened: false });
    }

    
    private renderMain(){
        return(
            <div>
                <Notifications isCritic={this.props.isCritic} changePage={this.props.changePage}/>
                <NewWorks/>
                {this.props.role === 'teacher'?
                    <div>
                        {this.state.opened?
                          <AddWork
                            closeSidePage={this.closeSidePage}
                          />
                        :null}
                        <button
                            className='mainButton'
                            onClick={this.openSidePage}
                        ><Typography variant='button'>Предложить тему курсовой работы</Typography></button>  
                    </div>  
                :null}
                
                {!this.state.isCritic?
                    <button
                        className='mainButton critic'
                        onClick = {this.changeCriticStatus}
                    ><Typography variant='button'>Стать рецензентом</Typography></button>
                : <button
                    className='criticButton noCritic'
                    onClick = {this.changeCriticStatus}
                ><Typography variant='button'>Перестать быть рецензентом</Typography></button>}
            </div>
        )
    }

    render(){
        return this.renderMain();
    }
}

export default Main