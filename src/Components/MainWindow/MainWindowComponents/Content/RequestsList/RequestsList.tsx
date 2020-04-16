import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import './RequestsList.css'

interface Idata{
    title?: string,
    teacher?: string,
    teacherContacts?: string,
    scienceArea?: string,
    description?: string,
    aboutMe?: string,
    id?: number
}

interface Props{
    data: {}[],
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
}

interface State{

}

class RequestsList extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={}
    }

    private renderItem(item : Idata){
        return(
            <div className='requestItem'>
                <div className='inline req_title'><Typography variant='h6'>{item.title}, {item.teacher}</Typography></div>
                <button
                    className='more inline'
                    value={'r' + item.id!.toString()} 
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