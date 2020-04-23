import React, { Component } from 'react'
import Spinner from '@skbkontur/react-ui/Spinner'
import Center from '@skbkontur/react-ui/Center'
import Typography from '@material-ui/core/Typography'
import Description from './Components/Description'
import AttachedFiles from './Components/AttachedFiles'
import Gapped from '@skbkontur/react-ui/Gapped'
import Button from '@skbkontur/react-ui/Button'
import Modal from '@skbkontur/react-ui/Modal'
import DatePicker from '@skbkontur/react-ui/DatePicker'
import Toast from '@skbkontur/react-ui/Toast'


//curator
import currentWorks from '../../../../../TestData/Curator/currentWorks'

interface Idata{
    title?: string,
    teacher?: string,
    teacherContacts?: string,
    scienceArea?: string,
    description?: string, 
    reportFile?: string,
    presentationFile?: string,
    consultantReportFile?: string,
    link?: string,
    consultant?: string,
    consultantContacts?: string,
    status?: string,
    switcher?: string,
    student?: string,
    course?: number,
    criticReview?:string,
    id?: number
}

interface Props{
    page?: string,
    role?: string
}

interface State{
    isLoading?: boolean,
    criticReview?: string,
    data : Idata,
    modalOpened?: boolean,
    deadline?: string
}

class BiddingDetailed extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isLoading : false,
            criticReview: '',
            data : {},
            modalOpened : false,
            deadline: ''
        }
    }

    componentDidMount(){
        this.setState({isLoading:true})

        const id = Number(this.props.page!.substr(8))
        let data : Idata = {} // eslint-disable-next-line
        currentWorks.map(item => {
            if(item.id === id) data = item
        })
        this.setState({data : data, isLoading : false})
    }

    private modalClose = () => {
        this.setState({modalOpened : false})
    }

    private modalOpen = () => {
        this.setState({modalOpened : true})
    }

    
    private handleDeadline = (e : {target : {value : string}}) => {
        return (this.setState({deadline : e.target.value}))
    }

    private setDeadline = () => {
        if(this.state.deadline === '')
            Toast.push('Выберите дату')
        else{
            Toast.push('Дедлайн назначен')
            return (this.setState({modalOpened : false}))
        }
    }

    private renderModal(){
        const day = new Date().getDate()
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        let curMonth : string
        month<10? curMonth = '0' + month : curMonth = String(month)

        return(
            <Modal onClose={this.modalClose}>
                <Modal.Header>Выберите дату</Modal.Header>

                <Modal.Body>
                    <div style={{marginTop:'5px', marginLeft:'5px'}}>
                        <DatePicker 
                            value={this.state.deadline} 
                            minDate={day+'.'+curMonth+'.'+year} 
                            maxDate='30.12.2050'
                            onChange={this.handleDeadline}/>
                    </div>
                </Modal.Body>


                <Modal.Footer>
                    <Button use='success' onClick={this.setDeadline}>Выбрать</Button>
                    <Button onClick={this.modalClose}>Отмена</Button>
                </Modal.Footer>
          </Modal>


        )
    }

    private renderBiddingDetailed(){
        return(
            <div>
                {!this.state.isLoading?
                    <div>
                        <div style={{marginLeft:'20px'}}><Typography variant='h4'>{this.state.data.student}, {this.state.data.course} курс</Typography></div>
                        <Description data={this.state.data}/>
                        <AttachedFiles data={this.state.data}/>
                        <hr/>
                {this.state.modalOpened && this.renderModal()}
                <div style={{marginLeft:'30px'}}>
                    <Gapped>
                        <Button use='primary' onClick={this.modalOpen}>Назначить дедлайн</Button>
                        <Button use='success'>Подтвердить защиту</Button>
                    </Gapped>
                </div>
                    </div>
                : <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
                }

            </div>
        )
    }

    render(){
        return this.renderBiddingDetailed();
    }
}

export default BiddingDetailed