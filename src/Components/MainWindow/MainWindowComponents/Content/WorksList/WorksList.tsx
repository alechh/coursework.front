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
        this.whichData()
    }
    
    private whichData = () => {
        this.setState({isLoading : true})
        
        switch(this.props.role){
            case 'student':{
                switch(this.props.type){
                    case 'current':{
                        return (this.setState({data : completedWorks, isLoading : false, type : 'current'}))
                    }
                    case 'free':{
                        return (this.setState({data : freeWorks, isLoading : false, type : 'free'}))
                    }
                }
                break
            }
            case 'teacher':{
                switch(this.props.type){
                    case 'current':{
                        return (this.setState({data : teacherCurrentWorks, isLoading : false, type : 'current'}))
                    }
                    case 'free':{
                        return (this.setState({data : teacherMyFreeWorks, isLoading : false, type : 'free'}))
                    }
                    case 'completed':{
                        return (this.setState({data : teacherCompletedWorks, isLoading : false, type : 'completed'}))
                    }
                    case 'foreign':{
                        return (this.setState({data : teacherFreeWorks, isLoading : false, type : 'foreign'}))
                    }
                }
                break
            }
            default: return (this.setState({data : [{}], isLoading : false}))
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
                <Typography variant='h5'>Нет завершенных курсовых работ</Typography>
            </div>
        )
    }

    private isEmpty(obj : any) {
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