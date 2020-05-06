import React, { Component } from 'react'
import { Typography } from '@material-ui/core';
import './RequestDetail.css'
import Description from './Components/Description'
import Toast from '@skbkontur/react-ui/Toast'
import Center from '@skbkontur/react-ui/Center'
import Spinner from '@skbkontur/react-ui/Spinner'
import Gapped from '@skbkontur/react-ui/Gapped'
import Button from '@skbkontur/react-ui/Button'
import Ok from '@skbkontur/react-icons/Ok'
import Delete from '@skbkontur/react-icons/Delete'

//student
import requestsData from '../../../../../TestData/Student/requestsData'

//teacher
import teacherRequest from '../../../../../TestData/Teacher/requestsData'

//curator
import curatorRequest from '../../../../../TestData/Curator/requestsData'

interface Idata{
    title?: string,
    student?: string,
    teacher?: string,
    //course?: number,
    group?: string,
    description?: string,
    aboutMe?: string,
    id?: number,
    //studentId?: number
}

interface Props{
    role?: string,
    page?: string,
    userId?: number
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

    componentDidMount(){
        this.setState({isLoading:true})
        this.whichData()
        this.setState({isLoading : false})
    }

    private whichData = () => {
        switch(this.props.role){
            case 'student':{
                const id = Number(this.props.page!.substr(8))
                //---------------------------
                // Запрос по id данных заявки
                //---------------------------

                //-----------------------------------------------
                let data : Idata = {} // eslint-disable-next-line
                requestsData.map(item =>{
                    if(item.id === id) return(data = item)
                })
                //-----------------------------------------------

                this.setState({data : data})
                break
            }
            case 'teacher':{
                let requestId = Number(this.props.page!.substr(7))
                console.log(requestId)
                
                //---------------------------
                // Запрос по id данных заявки
                //---------------------------

                //--------------------------------------------------------------------------
                // let data : Idata = {} // eslint-disable-next-line
                // teacherRequest.map(item => {
                //     if(item.id === requestId && item.studentId === studentId) data = item
                // })
                //this.setState({data : data})
                //--------------------------------------------------------------------------


                break
            }
            case 'curator':{
                let requestId = Number(this.props.page!.substr(7))
                //---------------------------
                // Запрос по id данных заявки
                //---------------------------

                //--------------------------------------------------------------------------
                // let data : Idata = {} // eslint-disable-next-line
                // curatorRequest.map(item => {
                //     if(item.id === requestId && item.studentId === studentId) data = item
                // })
                // this.setState({data : data})
                //--------------------------------------------------------------------------


                break
            }
        }
    }

    private cancelRequest = () => {
        switch(this.props.role){
            case 'student':{
                //----------------------------------------------------
                // Запрос на отмену заявки для студента по userId и id (id заявки)    
                //----------------------------------------------------
                Toast.push('Заявка отменена')
                break
            }
            case 'teacher':{
                //---------------------------------------------------------
                // Запрос на отмену заявки для преподавателя по userId и id (id заявки)      
                //---------------------------------------------------------
                Toast.push('Заявка отклонена')
                break
            }
            case 'curator':{
                //----------------------------------------------------
                // Запрос на отмену заявки для куратора по userId и id (id заявки)    
                //----------------------------------------------------
                Toast.push('Заявка отклонена')
            }
        }

    }

    private acceptRequest = () => {
        switch(this.props.role){
            case 'teacher':{
                //------------------------------------------------------------
                // Запрос на принятие заявки для преподавателя по userId и id
                //------------------------------------------------------------
                Toast.push('Заявка принята')
                break
            }
            case 'curator':{
                //------------------------------------------------------
                // Запрос на принятие заявки для куратора по userId и id
                //------------------------------------------------------
                Toast.push('Заявка принята')
                break
            }
        }
    }
    
    private renderButton(){
        switch(this.props.role){
            case 'student':{
                return(
                    <div className='ml30'>
                        <Button
                            icon={<Delete/>}
                            use='danger'
                            onClick={this.cancelRequest}
                        ><Typography variant='button'>Отменить заявку</Typography></Button>
                    </div>)
            }
            case 'teacher':{
                return(
                    <div className='ml30'><Gapped>
                        <Button
                            icon={<Ok/>}
                            onClick={this.acceptRequest}
                            use='success'
                        ><Typography variant='button'>Принять заявку</Typography></Button>
                        <Button
                            icon={<Delete/>}
                            onClick={this.cancelRequest}
                            use='danger'
                        ><Typography variant='button'>Отклонить заявку</Typography></Button>
                    </Gapped></div>
                )
            }
            case 'curator':{
                return(
                    <div className='ml30'><Gapped>
                        <Button
                            icon={<Ok/>}
                            onClick={this.acceptRequest}
                            use='success'
                        ><Typography variant='button'>Принять заявку</Typography></Button>
                        <Button
                            icon={<Delete/>}
                            onClick={this.cancelRequest}
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
                <div className='requestTitle'><Typography variant='h4'>{this.state.data.title}</Typography></div>
                <Description data={this.state.data} role={this.props.role}/>

                {(this.props.role === 'teacher' || this.props.role === 'curator')? <div className='ml30'><Typography variant='h6'>Студент: {this.state.data.student}, {this.state.data.group} группа</Typography></div> : null}
                <div className='aboutMeDiv'>
                    <div id='aboutMeTitle'><Typography variant='h6'>{this.props.role === 'student'? 'Мое резюме' : 'Резюме студента'}:</Typography></div>
                    <div className='aboutMe'><Typography>{this.state.data.aboutMe}</Typography></div>
                </div>
                <hr/>
                {this.renderButton()}
            </div>
        )
    }

    render(){
        return (
            !this.state.isLoading?
                this.renderRequestDetail()
            : <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
        )
    }
}

export default RequestDetail