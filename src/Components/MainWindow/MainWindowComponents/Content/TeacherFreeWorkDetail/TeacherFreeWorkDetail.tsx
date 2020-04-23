import React, { Component } from 'react'
import Description from './Components/Description'
import RequestsList from './Components/RequestsList'
import Typography from '@material-ui/core/Typography'
import Button from '@skbkontur/react-ui/Button'
import Toast from '@skbkontur/react-ui/Toast'

import teacherRequest from '../../../../../TestData/Teacher/requestsData'
import teacherMyFreeWorks from '../../../../../TestData/Teacher/myFreeWorks'

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
    page?:string,
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void
}

interface State{
    isDelete?: boolean
    data : Idata,
    requests?: Irequest[],
    isLoading?: boolean
}

class FreeWorkDetail extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isDelete: false,
            data : {},
            requests : [{}],
            isLoading : false
        }
    }

    componentDidMount(){
        this.setState({isLoading : true})

        const id = Number(this.props.page!.substr(5))
        let validRequests : Irequest[]
        validRequests = [] // eslint-disable-next-line
        teacherRequest.map(item =>{
            if(item.id === id)
                validRequests.push(item)
        })
        let data : Idata = {} // eslint-disable-next-line
        teacherMyFreeWorks.map(item => {
            if(item.id === id) return (data = item)
        })
        this.setState({data : data, requests : validRequests, isLoading : false})
    }

    private deleteWork = () => {
        const newStatus = !this.state.isDelete
        this.setState({isDelete : newStatus})
        !this.state.isDelete?
            Toast.push('Курсовая работа (id=' + this.state.data.id?.toString() + ') удалена')
        : Toast.push('Удаление работы отменено')
    }

    private renderFreeWorkDetail(){
        return(
            <div>
                <Description data={this.state.data}/>
                <RequestsList data={this.state.requests} changePage={this.props.changePage}/>
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
