import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import './RequestsList.css'

interface Idata{
    title?: string,
    student?: string,
    course?: number,
    teacher?: string,
    group?: string,
    scienceArea?: string,
    description?: string,
    aboutMe?: string,
    id?: number,
    studentId?: number
}

interface Props{
    data: {}[],
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    role?:string
}

interface State{

}

class RequestsList extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={}
    }

    private renderTitle(item : Idata){
        switch(this.props.role){
            case 'student':
                return <div className='inline req_title'><Typography variant='h6'>{item.title}, {item.teacher}</Typography></div>
            case 'teacher':
                return <div className='inline req_title'><Typography variant='h6'>{item.title}, {item.student}, {item.course} курс</Typography></div>
        }
    }

    private buttonValue(item : Idata){
        switch(this.props.role){
            case 'student':
                return 'request_' + item.id?.toString()
            case 'teacher':
                return 'st' + item.studentId?.toString() + '_request' + item.id!.toString()
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
                {this.props.data.map(item => this.renderItem(item))}
                <hr/>
            </div>
        )
    }

    private renderEmptyList(){
        return(
            <div style={{textAlign:"center"}}>
                <Typography variant='h5'>Нет заявок</Typography>
            </div>
        )
    }

    private isEmpty(obj : any) {
        return Object.keys(obj).length === 0;
    }

    render(){
        return(
            !this.isEmpty(this.props.data[0])?
                this.renderRequestsList()
            : this.renderEmptyList()
        )
    }
}

export default RequestsList