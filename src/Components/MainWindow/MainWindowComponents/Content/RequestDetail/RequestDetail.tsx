import React, { Component } from 'react'
import { Typography } from '@material-ui/core';
import './RequestDetail.css'
import Description from './Components/Description'
import Toast from '@skbkontur/react-ui/Toast'
import Center from '@skbkontur/react-ui/Center'
import Spinner from '@skbkontur/react-ui/Spinner'
import Gapped from '@skbkontur/react-ui/Gapped'
import Button from '@skbkontur/react-ui/Button'

//student
import requestsData from '../../../../../TestData/Student/requestsData'

//teacher
import teacherRequest from '../../../../../TestData/Teacher/requestsData'

interface Idata{
    title?: string,
    student?: string,
    course?: number,
    group?: string,
    scienceArea?: string,
    description?: string,
    aboutMe?: string,
    id?: number,
    studentId?: number
}

interface Props{
    role?: string,
    page?:string
}

interface State{
    isLoading : boolean,
    data : Idata
}

class RequestDetail extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isLoading : false,
            data : {}
        }
    }

    cancelRequest(){
        Toast.push('Заявка отменена')
    }

    componentDidMount(){
        this.setState({isLoading:true})
        // setTimeout(() => {
        //     this.setState({
        //         isLoading: false
        //     })
        // }, 1000)
        switch(this.props.role){
            case 'student':{
                const id = Number(this.props.page!.substr(8))
                let data : Idata = {} // eslint-disable-next-line
                requestsData.map(item =>{
                    if(item.id === id) return(data = item)
                })
                this.setState({data : data, isLoading : false})
                break
            }
            case 'teacher':{
                let studentId = Number(this.props.page?.substr(2,(this.props.page.indexOf('request')-3)))
                let requestId = Number(this.props.page!.substr(this.props.page!.indexOf('request')+7))
                let data : Idata = {} // eslint-disable-next-line
                teacherRequest.map(item => {
                    if(item.id === requestId && item.studentId === studentId) data = item
                })
                this.setState({data : data, isLoading : false})
                break
            }
        }
    }

    private renderButton(){
        switch(this.props.role){
            case 'student':{
                return(
                    <button
                        className='cancel'
                        onClick={this.cancelRequest}
                    ><Typography variant='button'>Отменить заявку</Typography></button>)
            }
            case 'teacher':{
                    return(
                        <div className='ml30'><Gapped>
                            <Button
                                use='success'
                            ><Typography variant='button'>Принять заявку</Typography></Button>
                            <Button
                                use='danger'
                            ><Typography variant='button'>Отклонить заявку</Typography></Button>
                        </Gapped></div>
                    )
            }
        }
    }

    private renderRequestDetail(){
        return(
            <div>
                {!this.state.isLoading?
                    <div>
                        <div className='requestTitle'><Typography variant='h4'>{this.state.data.title}</Typography></div>
                        <Description data={this.state.data} role={this.props.role}/>

                        {this.props.role === 'teacher'? <div className='ml30'><Typography variant='h6'>Студент: {this.state.data.student}, {this.state.data.group} группа, {this.state.data.course} курс</Typography></div> : null}
                        <div className='aboutMeDiv'>
                            <div id='aboutMeTitle'><Typography variant='h6'>{this.props.role === 'student'? 'Мое резюме' : 'Резюме студента'}:</Typography></div>
                            <div className='aboutMe'><Typography>{this.state.data.aboutMe}</Typography></div>
                        </div>
                        <hr/>
                        {this.renderButton()}

                    </div>
                : <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>}
            </div>
            
        )
    }

    render(){
        return this.renderRequestDetail();
    }
}

export default RequestDetail