import React, { Component } from 'react'
import { Typography } from '@material-ui/core';
import './RequestDetail.css'
import Description from './Components/Description'
import Toast from '@skbkontur/react-ui/Toast'
import Center from '@skbkontur/react-ui/Center'
import Spinner from '@skbkontur/react-ui/Spinner'


interface Idata{
    title?: string,
    teacher?: string,
    scienceArea?: string,
    description?: string,
    teacherContacts?: string,
    aboutMe?: string,
    id?: string
}

interface Props{
    data : Idata
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


    private renderRequestDetail(){
        return(
            <div>
                {!this.state.isLoading?
                    <div>
                        <div className='requestTitle'><Typography variant='h4'>{this.props.data.title}</Typography></div>
                        <Description data={this.props.data}/>
                        <div className='aboutMeDiv'>
                            <div id='aboutMeTitle'><Typography variant='h6'>Мое резюме:</Typography></div>
                            <div className='aboutMe'><Typography>{this.props.data.aboutMe}</Typography></div>
                        </div>
                        <hr/>
                        <div>
                            <button
                                className='cancel'
                                onClick={this.cancelRequest}
                            ><Typography variant='button'>Отменить заявку</Typography></button>
                        </div>
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