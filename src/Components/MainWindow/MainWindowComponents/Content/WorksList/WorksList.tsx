import React, { Component } from 'react'
import CourseWork from '../CourseWork/CourseWork'
import Typography from '@material-ui/core/Typography'
import './WorksList.css'

type WorkType = 'current' | 'completed' | 'free' | 'request' | 'foreign'


interface Props{
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    data :{}[],
    role?: string,
    type?: WorkType
}

interface State{

}

class WorksList extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={}
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
                {this.props.data.map( work => this.renderCourseWork(work))}
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
        !this.isEmpty(this.props.data[0])?
            this.renderList()
        : this.renderEmptyList())

    }
}

export default WorksList