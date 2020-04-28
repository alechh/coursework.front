import React, { Component } from 'react'
import './Main.css'
import Notifications from './Components/Notifications/Notifications'
import AddWork from './Components/SidePage/SidePage'
import Button from '@skbkontur/react-ui/Button'
import Gapped from '@skbkontur/react-ui/Gapped'
import {Add, Briefcase, Delete} from '@skbkontur/react-icons'


//student
import biddingData from '../../../../../TestData/Student/biddingData'

//teacher
import teacherBiddingData from '../../../../../TestData/Teacher/biddingData'

interface Props{
    userId?: number,
    isCritic?: boolean,
    handleCritic() : void,
    changePage(event : React.MouseEvent<HTMLButtonElement>): void,
    role?: string
}

interface State{
    opened?: boolean
}

class Main extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            opened : false
        }
    }

    private whichData(){
        switch(this.props.role){
            case 'student':{
                //---------------------------------
                //запрос по userId (если рецензент)
                //---------------------------------

                return biddingData
            }
            case 'teacher':{
                //---------------------------------
                //запрос по userId (если рецензент)
                //---------------------------------

                return teacherBiddingData
            }
        }
    }

    private changeCriticStatus = () => {
        this.props.handleCritic()
    }

        
    private openSidePage = () => {
      this.setState({ opened: true });
      }
    
    private closeSidePage = () => {
    this.setState({ opened: false });
    }

    private needSidePage(){
        return (this.props.role === 'teacher' || this.props.role === 'curator')?
            <div>
                {this.state.opened?
                <AddWork
                    userId={this.props.userId}
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
        return !this.props.isCritic?
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
                {this.props.isCritic? <Notifications changePage={this.props.changePage} role={this.props.role} data={this.whichData()!}/> : null}
                <div className='ml20'>
                    <Gapped>
                        {this.props.role !== 'curator'? this.criticButton() : null}
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