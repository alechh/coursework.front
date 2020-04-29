import React, { Component } from 'react'
import Description from './Components/Description'
import RequestsList from './Components/RequestsList'
import Typography from '@material-ui/core/Typography'
import Button from '@skbkontur/react-ui/Button'
import Toast from '@skbkontur/react-ui/Toast'
import Center from '@skbkontur/react-ui/Center'
import Spinner from '@skbkontur/react-ui/Spinner'

//teacher
import teacherRequest from '../../../../../TestData/Teacher/requestsData'
import teacherMyFreeWorks from '../../../../../TestData/Teacher/myFreeWorks'

//curator
import curatorRequest from '../../../../../TestData/Curator/requestsData'
import curatorMyFreeWorks from '../../../../../TestData/Curator/myFreeWorks'

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
    role?: string,
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    userId?: number
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
        this.whichData()
        this.setState({isLoading : false})
    }

    private whichData = () => {
        switch(this.props.role){
            case 'teacher':{
                const id = Number(this.props.page!.substr(5))
                //---------------------------------------------------------------------------------
                // Запрос по userId и id на данные о курсовой и на данные и заявках на эту курсовую
                //---------------------------------------------------------------------------------

                //---------------------------------------------
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
                //---------------------------------------------

                this.setState({data : data, requests : validRequests})
                break
            }
            case 'curator':{
                const id = Number(this.props.page!.substr(12))
                //---------------------------------------------------------------------------------
                // Запрос по userId и id на данные о курсовой и на данные и заявках на эту курсовую
                //---------------------------------------------------------------------------------

                //-------------------------------------------------
                let validRequests : Irequest[]
                validRequests = [] // eslint-disable-next-line
                curatorRequest.map(item => {
                    if(item.id === id)
                        validRequests.push(item)
                })
                let data : Idata = {} // eslint-disable-next-line
                curatorMyFreeWorks.map(item => {
                    if(item.id === id) return (data = item)
                })
                //-------------------------------------------------

                this.setState({data : data, requests : validRequests})
                break
            }
        }
    }

    private deleteWork = () => {
        const newStatus = !this.state.isDelete
        this.setState({isDelete : newStatus})
        if(!this.state.isDelete){
            //-----------------------------------------------------------
            // Запрос по userId и id на удаление своей добавленной работы
            //-----------------------------------------------------------

            Toast.push('Курсовая работа удалена')
        }else{
            //-------------------------------------------------
            // Запрос на отмену удаления работы по userId и id
            //-------------------------------------------------

            Toast.push('Удаление работы отменено')
        }
    }

    private renderFreeWorkDetail(){
        return(
            <div>
                <Description data={this.state.data}/>
                <RequestsList 
                    data={this.state.requests} 
                    changePage={this.props.changePage}
                    role={this.props.role}/>
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
        return (
            !this.state.isLoading?
                this.renderFreeWorkDetail()
            :   <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
        )
    }
}

export default FreeWorkDetail
