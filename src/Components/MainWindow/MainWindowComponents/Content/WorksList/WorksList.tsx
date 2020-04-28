import React, { Component } from 'react'
import CourseWork from '../CourseWork/CourseWork'
import Typography from '@material-ui/core/Typography'
import Spinner from '@skbkontur/react-ui/Spinner'
import Center from '@skbkontur/react-ui/Center'
import './WorksList.css'

//student
import completedWorks from '../../../../../TestData/Student/completedWorksData'
import freeWorks from '../../../../../TestData/Student/freeWorksData'

//teacher
import teacherCurrentWorks from '../../../../../TestData/Teacher/currentWorks'
import teacherMyFreeWorks from '../../../../../TestData/Teacher/myFreeWorks'
import teacherCompletedWorks from '../../../../../TestData/Teacher/completedWorks'
import teacherFreeWorks from '../../../../../TestData/Teacher/freeWorks'

//curator 
import curatorCurrentWorks from '../../../../../TestData/Curator/currentWorks'
import curatorMyFreeWorks from '../../../../../TestData/Curator/myFreeWorks'
import curatorMyCurrentWorks from '../../../../../TestData/Curator/myCurrentWorks'

type WorkType = 'current' | 'completed' | 'free' | 'request' | 'foreign'

interface Props{
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    role?: string,
    type?: WorkType,
    curatorSelect?: string,
    userId?: number
}

interface State{
    data : {}[],
    isLoading?: boolean,
    type?: WorkType
}

class WorksList extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            data : [{}],
            isLoading : false,
            type : this.props.type
        }
    }

    componentDidUpdate(prevProps : Props){
        if(this.props.type !== prevProps.type){
            this.whichData()  
        }
        if(this.props.curatorSelect !== prevProps.curatorSelect)
            this.whichData()
    }


    componentDidMount(){
        this.setState({isLoading : true})
        this.whichData()
        this.setState({isLoading : false})
    }
    
    private whichData = () => {
        switch(this.props.role){
            case 'student':{
                switch(this.props.type){
                    case 'completed':{
                        //--------------------------------
                        //запрос по userId данных курсовых
                        //--------------------------------

                        return (this.setState({data : completedWorks, type : 'current'}))
                    }
                    case 'free':{
                        //--------------------------------
                        //запрос по userId данных курсовых
                        //--------------------------------

                        return (this.setState({data : freeWorks, type : 'free'}))
                    }
                }
                break
            }
            case 'teacher':{
                switch(this.props.type){
                    case 'current':{
                        //--------------------------------
                        //запрос по userId данных курсовых
                        //--------------------------------

                        return (this.setState({data : teacherCurrentWorks, type : 'current'}))
                    }
                    case 'free':{
                        //--------------------------------
                        //запрос по userId данных курсовых
                        //--------------------------------

                        return (this.setState({data : teacherMyFreeWorks, type : 'free'}))
                    }
                    case 'completed':{
                        //--------------------------------
                        //запрос по userId данных курсовых
                        //--------------------------------

                        return (this.setState({data : teacherCompletedWorks, type : 'completed'}))
                    }
                    case 'foreign':{
                        //--------------------------------
                        //запрос по userId данных курсовых
                        //--------------------------------

                        return (this.setState({data : teacherFreeWorks, type : 'foreign'}))
                    }
                }
                break
            }
            case 'curator':{
                if(this.props.curatorSelect === 'Занятые темы'){
                    //--------------------------------
                    //запрос по userId данных курсовых
                    //--------------------------------

                    return (this.setState({data : curatorMyCurrentWorks, type : 'current'}))
                }
                else if (this.props.curatorSelect === 'Свободные темы'){
                    //--------------------------------
                    //запрос по userId данных курсовых
                    //--------------------------------

                    return (this.setState({data : curatorMyFreeWorks, type : 'free'}))
                }
                else if(this.props.type === 'current'){
                    //--------------------------------
                    //запрос по userId данных курсовых
                    //--------------------------------

                    this.setState({data : curatorCurrentWorks, type : 'current'})
                }
            }
        }
    }
    
    private renderCourseWork(work : {}){
        return (
            <div className='workItem'>
                <CourseWork 
                    data={work} 
                    changePage={this.props.changePage} 
                    role={this.props.role}
                    type={this.props.type}
                    curatorSelect = {(this.props.curatorSelect === 'Занятые темы' || this.props.curatorSelect === 'Свободные темы')? this.props.curatorSelect : ''}/>
            </div>
        )
    }

    private renderList(){
        return(
            <div className={this.needMarginTop()}>
                {this.state.data.map(work => this.renderCourseWork(work))}
            </div>
        )
    }

    private renderEmptyList(){
        return(
            <div style={{textAlign:"center"}}>
                <Typography variant='h5'>Нет курсовых работ</Typography>
            </div>
        )
    }

    private isEmpty(obj : {}) {
        return Object.keys(obj).length === 0;
    }

    
    private needMarginTop(){
        return(
            this.props.type === 'foreign'?
            'mt' : ''
        )
    }

    render(){
        return (
            !this.state.isLoading?
                !this.isEmpty(this.state.data[0])?
                    this.renderList()
                : this.renderEmptyList()
            :   <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
        )
    }
}

export default WorksList