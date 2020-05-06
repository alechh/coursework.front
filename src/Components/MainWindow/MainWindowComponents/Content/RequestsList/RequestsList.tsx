import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Center from '@skbkontur/react-ui/Center'
import Spinner from '@skbkontur/react-ui/Spinner'
import './RequestsList.css'
import axios from 'axios'

//student
import requestsData from '../../../../../TestData/Student/requestsData'

//teacher 
import teacherRequests from '../../../../../TestData/Teacher/requestsData'

//curator 
import curatorRequests from '../../../../../TestData/Curator/requestsData'

interface Idata{
    courseWorkTitle?: string,
    //student?: string,
    //course?: number,
    //teacher?: string,
    //description?: string,
    id?: number,
    //studentId?: number
    date?: string,
    courseWorkId?: number
}

interface Props{
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    role?:string,
    token : string
}

interface State{
    data : Idata[],
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
                const axios = require('axios').default
                axios.get('../api/course_works/applications/active', this.props.token)
                .then((response : Idata[]) => {
                    this.setState({data : response})
                })
                break

                //return (this.setState({data : requestsData}))
            }
            case 'teacher':{
                const axios = require('axios').default
                axios.get('../api/course_works/applications/active', this.props.token)
                .then((response : Idata[]) => {
                    this.setState({data : response})
                })
                break
                
                //return (this.setState({data : teacherRequests}))
            }
            case 'curator':{
                const axios = require('axios').default
                axios.get('../api/course_works/applications/active', this.props.token)
                .then((response : Idata[]) => {
                    this.setState({data : response})
                })
                break

                //return (this.setState({data : curatorRequests}))
            }
        }
    }


    private renderTitle(item : Idata){
        switch(this.props.role){
            case 'student':
                return <div className='inline req_title'><Typography variant='h6'>{item.courseWorkTitle}</Typography></div>
            case 'teacher':{
                //return <div className='inline req_title'><Typography variant='h6'>{item.title}, {item.student}, {item.course} курс</Typography></div>
                return <div className='inline req_title'><Typography variant='h6'>{item.courseWorkTitle}</Typography></div>
            }
                
            case 'curator':{
                //return <div className='inline req_title'><Typography variant='h6'>{item.title}, {item.student}, {item.course} курс</Typography></div>
                return <div className='inline req_title'><Typography variant='h6'>{item.courseWorkTitle}</Typography></div>
            }
        }
    }

    private buttonValue(item : Idata){
        switch(this.props.role){
            case 'student':
                return 'request_' + item.id?.toString()
            case 'teacher':{
                //return 'st' + item.studentId?.toString() + '_request' + item.id!.toString()
                return 'request' + item.id!.toString()
            }
            case 'curator':
                return 'request' + item.id!.toString()
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