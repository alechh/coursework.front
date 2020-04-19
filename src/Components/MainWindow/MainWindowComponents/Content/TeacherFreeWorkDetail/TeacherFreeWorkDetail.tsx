import React, { Component } from 'react'
import Description from './Components/Description'
import RequestsList from './Components/RequestsList'
import Typography from '@material-ui/core/Typography'
import Button from '@skbkontur/react-ui/Button'
import Toast from '@skbkontur/react-ui/Toast'

interface Idata{
    title?: string,
    teacher?: string,
    teacherContacts?: string,
    scienceArea?: string,
    description?: string, 
    status?: string,
    course?: number,
    id?: number,
    studentId?: number
}

interface Irequest{
    title?: string,
    student?: string,
    course?: number,
    group?: string,
    scienceArea?: string,
    description?: string,
    aboutMe?: string,
    id?: number
}

interface Props{
    data : Idata,
    requests?: Irequest[],
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
}

interface State{
     isDelete?: boolean
}

class FreeWorkDetail extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isDelete: false
        }
    }

    private deleteWork = () => {
        const newStatus = !this.state.isDelete
        this.setState({isDelete : newStatus})
        !this.state.isDelete?
            Toast.push('Курсовая работа (id=' + this.props.data.id?.toString() + ') удалена')
        : Toast.push('Удаление работы отменено')
    }

    private renderFreeWorkDetail(){
        return(
            <div>
                <Description data={this.props.data}/>
                <RequestsList data={this.props.requests} changePage={this.props.changePage}/>
                <hr/>
                <div className='ml30'>
                    <Button
                        use={!this.state.isDelete? 'danger' : 'success'}
                        onClick={this.deleteWork}
                    ><Typography variant='button'>{!this.state.isDelete? 'Удалить курсовую' : 'Отменить удаление'}</Typography></Button>
                </div>
            </div>
        )
    }

    render(){
        return this.renderFreeWorkDetail();
    }
}

export default FreeWorkDetail
