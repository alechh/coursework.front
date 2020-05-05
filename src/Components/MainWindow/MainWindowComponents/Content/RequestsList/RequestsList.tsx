import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Center from '@skbkontur/react-ui/Center'
import Spinner from '@skbkontur/react-ui/Spinner'
import './RequestsList.css'

//student
import requestsData from '../../../../../TestData/Student/requestsData'

//teacher 
import teacherRequests from '../../../../../TestData/Teacher/requestsData'

//curator 
import curatorRequests from '../../../../../TestData/Curator/requestsData'

interface Idata{
    title?: string,
    student?: string,
    course?: number,
    teacher?: string,
    description?: string,
    id?: number,
    studentId?: number
}

interface Props{
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    role?:string,
    userId?: number
}

interface State{
    data : {}[],
    isLoading?: boolean
}

class RequestsList extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            data : [{}],
            isLoading : false
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
                //--------------------------------------------
                // Запрос на список заявок студента по userId
                //--------------------------------------------

                return (this.setState({data : requestsData}))
            }
            case 'teacher':{
                //----------------------------------------------------
                // Запрос на список заявок для проподавателя по userId
                //----------------------------------------------------

                return (this.setState({data : teacherRequests}))
            }
            case 'curator':{
                //-------------------------------------------
                // Запрос на список заявок куратора по userId
                //-------------------------------------------

                return (this.setState({data : curatorRequests}))
            }
        }
    }


    private renderTitle(item : Idata){
        switch(this.props.role){
            case 'student':
                return <div className='inline req_title'><Typography variant='h6'>{item.title}, {item.teacher}</Typography></div>
            case 'teacher':
                return <div className='inline req_title'><Typography variant='h6'>{item.title}, {item.student}, {item.course} курс</Typography></div>
            case 'curator':
                return <div className='inline req_title'><Typography variant='h6'>{item.title}, {item.student}, {item.course} курс</Typography></div>
        }
    }

    private buttonValue(item : Idata){
        switch(this.props.role){
            case 'student':
                return 'request_' + item.id?.toString()
            case 'teacher':
                return 'st' + item.studentId?.toString() + '_request' + item.id!.toString()
            case 'curator':
                return 'curatorSt' + item.studentId?.toString() + '_request' + item.id!.toString()
        }
    }

    private renderItem(item : Idata){
        return(
            <div className='requestItem'>
                {this.renderTitle(item)}
                <button
                    className='buttonMore inline'
                    value={this.buttonValue(item)} 
                    onClick={this.props.changePage} 
                ><Typography variant='button'>Подробнее</Typography>
                </button>
            </div>
            )
    }

    private renderRequestsList(){
        return(
            <div>
                {this.state.data.map(item => this.renderItem(item))}
            </div>
        )
    }

    private renderEmptyList(){
        return(
            <div style={{textAlign:"center", marginTop:'10vh'}}>
                <Typography variant='h5'>Нет заявок</Typography>
            </div>
        )
    }

    private isEmpty(obj : Idata[]) {
        return Object.keys(obj[0]).length === 0;
    }

    render(){
        return(
            !this.state.isLoading?
                !this.isEmpty(this.state.data)?
                    this.renderRequestsList()
                : this.renderEmptyList()
            :   <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
        )
    }
}

export default RequestsList