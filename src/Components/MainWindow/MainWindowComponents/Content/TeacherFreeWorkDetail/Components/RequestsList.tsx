import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Gapped from '@skbkontur/react-ui/Gapped'

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
    data?: Idata[],
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    role?:string,
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
            <div style={{marginBottom:'10px'}}>
               <Gapped>
                    <div style={{width:'auto', minWidth:'20vw', textDecoration:'underline'}}><Typography>{item.student}, {item.course} курс, {item.group} группа</Typography></div>
                    <button
                        onClick={this.props.changePage}
                        value={'st' + item.studentId?.toString() + '_request' + item.id!.toString()}
                    ><Typography >Подробнее</Typography></button>
                </Gapped>
            </div>
            
            )
    }

    private renderRequestsList(){
        return(
            <div>
                <div className='ml20'><Typography variant='h5'>Заявки на эту тему:</Typography></div>
                <div className='ml30'>{this.props.data!.map(item => this.renderItem(item))}</div>
            </div>
        )
    }

    private renderEmptyList(){
        return(
            <div className='ml30'>
                <Typography variant='h6'>Нет заявок на эту курсовую</Typography>
            </div>
        )
    }

    private isEmpty(obj : any) {
        try{
            return Object.keys(obj).length === 0
        }catch{
            return true
        }
    }

    render(){
        return(
            !this.isEmpty(this.props.data![0])?
                this.renderRequestsList()
            : this.renderEmptyList()
        )
    }
}

export default RequestsList