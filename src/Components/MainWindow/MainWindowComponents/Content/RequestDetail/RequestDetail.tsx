import React, { Component } from 'react'
import { Typography } from '@material-ui/core';
import './RequestDetail.css'
import Description from './Components/Description'
import Toast from '@skbkontur/react-ui/Toast'
import Center from '@skbkontur/react-ui/Center'
import Spinner from '@skbkontur/react-ui/Spinner'
import Gapped from '@skbkontur/react-ui/Gapped'
import Button from '@skbkontur/react-ui/Button'

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
    data : Idata,
    role?: string
}

interface State{
    isLoading : boolean
}

class RequestDetail extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isLoading : false
        }
    }

    cancelRequest(){
        Toast.push('Заявка отменена')
    }

    componentDidMount(){
        this.setState({isLoading:true})
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000)
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
                        <div className='requestTitle'><Typography variant='h4'>{this.props.data.title}</Typography></div>
                        <Description data={this.props.data} role={this.props.role}/>

                        {this.props.role === 'teacher'? <div className='ml30'><Typography variant='h6'>Студент: {this.props.data.student}, {this.props.data.group} группа, {this.props.data.course} курс</Typography></div> : null}
                        <div className='aboutMeDiv'>
                            <div id='aboutMeTitle'><Typography variant='h6'>{this.props.role === 'student'? 'Мое резюме' : 'Резюме студента'}:</Typography></div>
                            <div className='aboutMe'><Typography>{this.props.data.aboutMe}</Typography></div>
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