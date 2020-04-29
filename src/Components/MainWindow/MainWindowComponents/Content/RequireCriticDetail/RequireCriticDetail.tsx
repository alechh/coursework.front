import React, { Component } from 'react'
import Spinner from '@skbkontur/react-ui/Spinner'
import Center from '@skbkontur/react-ui/Center'
import Typography from '@material-ui/core/Typography'
import Description from './Components/Description'
import AttachedFiles from './Components/AttachedFiles'
import Buttons from './Components/Buttons'

//student
import requireData from '../../../../../TestData/Student/requireCriticData'

//teacher
import teacherRequireCritic from '../../../../../TestData/Teacher/requireCriticData'

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
    id?: number
}

interface Props{
    page?: string,
    role?: string,
    userId?: number
}

interface State{
    isLoading?: boolean,
    data : Idata
}

class RequireCriticDetail extends Component<Props,State>{
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
                const id = Number(this.props.page!.substr(14))
                //---------------------------------------------------------
                // Запрос данных о работе требующей рецензирования по id
                //---------------------------------------------------------

                //-------------------------------------------------
                let data : Idata = {} // eslint-disable-next-line
                requireData.map(item => {
                    if(item.id === id) data = item
                })
                //-------------------------------------------------

                this.setState({data : data})
                break
            }
            case 'teacher':{
                const id = Number(this.props.page!.substr(14))
                //-------------------------------------------------------
                // Запрос данных о работе требующей рецензирования по id
                //-------------------------------------------------------

                //-------------------------------------------------
                let data : Idata = {} // eslint-disable-next-line
                teacherRequireCritic.map(item => {
                    if(item.id === id) data = item
                })
                //-------------------------------------------------

                this.setState({data : data})
                break
            }
        }
    }


    private renderRequireCriticDetail(){
        return(
            <div>
                <div style={{marginLeft:'20px'}}><Typography variant='h4'>{this.state.data.student}, {this.state.data.course} курс</Typography></div>
                <Description data={this.state.data}/>
                <AttachedFiles data={this.state.data}/>
                <hr/>
                <Buttons userId={this.props.userId} id={this.state.data.id}/>
            </div>
        )
    }

    render(){
        return (
            !this.state.isLoading?
                this.renderRequireCriticDetail()
            :   <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
        )
    }
}

export default RequireCriticDetail