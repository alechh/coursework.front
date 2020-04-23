import React, { Component } from 'react'
import CourseWork from '../CourseWork/CourseWork'
import Typography from '@material-ui/core/Typography'
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

type WorkType = 'current' | 'completed' | 'free' | 'request' | 'foreign'

interface Props{
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    role?: string,
    type?: WorkType
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
                        return (this.setState({data : completedWorks, type : 'current'}))
                    }
                    case 'free':{
                        return (this.setState({data : freeWorks, type : 'free'}))
                    }
                }
                break
            }
            case 'teacher':{
                switch(this.props.type){
                    case 'current':{
                        return (this.setState({data : teacherCurrentWorks, type : 'current'}))
                    }
                    case 'free':{
                        return (this.setState({data : teacherMyFreeWorks, type : 'free'}))
                    }
                    case 'completed':{
                        return (this.setState({data : teacherCompletedWorks, type : 'completed'}))
                    }
                    case 'foreign':{
                        return (this.setState({data : teacherFreeWorks, type : 'foreign'}))
                    }
                }
                break
            }
            case 'curator':{
                switch(this.props.type){
                    case 'current':{
                        this.setState({data : curatorCurrentWorks, type : 'current'})
                    }
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
                    type={this.props.type}/>
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
        !this.isEmpty(this.state.data[0])?
            this.renderList()
        : this.renderEmptyList())

    }
}

export default WorksList