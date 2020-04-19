import React, { Component } from 'react'
import './Main.css'
import Notifications from './Components/Notifications/Notifications'
import NewWorks from './Components/NewWorks/NewWorks'
import AddWork from './Components/SidePage/SidePage'
import Button from '@skbkontur/react-ui/Button'
import Gapped from '@skbkontur/react-ui/Gapped'
import {Add, Briefcase, Delete} from '@skbkontur/react-icons'

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

    private needSidePage(){
        return this.props.role === 'teacher'?
            <div>
                {this.state.opened?
                <AddWork
                    closeSidePage={this.closeSidePage}
                />
                :null}
                <Button
                    onClick={this.openSidePage}
                    icon={<Add/>}
                >Предложить тему курсовой работы</Button>
            </div>
        : null
            
    }

    private criticButton(){
        return !this.state.isCritic?
            <Button
                icon={<Briefcase/>}
                onClick={this.changeCriticStatus}
                use='success'
            >Стать рецензентом</Button>
        : 
            <Button
                icon={<Delete/>}
                onClick={this.changeCriticStatus}
                use='danger'
            >Перестать быть рецензентом</Button>
    }
    
    private renderMain(){
        return(
            <div>
                <Notifications isCritic={this.props.isCritic} changePage={this.props.changePage}/>
                <NewWorks/>
                <div className='ml20'>
                    <Gapped>
                        {this.criticButton()}
                        {this.needSidePage()} 
                    </Gapped>
                </div>
            </div>
        )
    }

    render(){
        return this.renderMain();
    }
}

export default Main