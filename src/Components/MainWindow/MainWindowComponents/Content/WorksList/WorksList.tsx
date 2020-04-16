import React, { Component } from 'react'
import CourseWork from '../CourseWork/CourseWork'
import Typography from '@material-ui/core/Typography'


interface Props{
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    data :{}[]
}

interface State{

}

class WorksList extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={}
    }

    styles = {
        marginBottom:'30px', 
        webkitBoxShadow: '10px 10px 5px -7px rgba(0,0,0,0.75)',
        mozBoxShadow: ' 10px 10px 5px -7px rgba(0,0,0,0.75)',
        boxShadow: '10px 10px 5px -7px rgba(0,0,0,0.75)',
        background : '#e6e6e6',
        borderRadius : '10px',
        marginLeft: '15px',
        marginRight: '15px',
        border: 'rgb(199, 180, 180) 1px solid'
    }
    

    private renderCourseWork(work : {}){
        return (
            <div style={this.styles}>
                <CourseWork data={work} changePage={this.props.changePage}/>
            </div>
        )
    }

    private renderList(){
        return(
            this.props.data.map( work => this.renderCourseWork(work))
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

    render(){
        return (
        !this.isEmpty(this.props.data[0])?
            this.renderList()
        : this.renderEmptyList())

    }
}

export default WorksList