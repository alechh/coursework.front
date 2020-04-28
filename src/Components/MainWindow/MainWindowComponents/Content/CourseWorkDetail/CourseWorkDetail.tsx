import React, { Component } from 'react'
import Description from './Components/Description'
import AttachedFiles from './Components/AttachedFiles'
import Center from '@skbkontur/react-ui/Center'
import Spinner from '@skbkontur/react-ui/Spinner'

//student
import completedWorks from '../../../../../TestData/Student/completedWorksData'

//teacher
import teacherCompletedWorks from '../../../../../TestData/Teacher/completedWorks'

interface Idata{
    title?: string,
    teacher?: string,
    deadline?: string,
    scienceArea?: string,
    description?: string,
    reportFile?: string,
    presentationFile?: string,
    consultantReportFile?: string,
    link?: string,
    teacherContacts?: string,
    consultant?: string,
    consultantContacts?: string,
    critic?: string,
    status?: string,
    teacherReview?: string,
    student?:string,
    course?: number,
    id?: number
}

interface Props{
    role : string,
    page?: string
}

interface State{
    isLoading?: boolean,
    data : Idata
}

class CourseWorkDetail extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state = {
            data : {}, 
            isLoading : false
        }
       
    }

    componentDidMount(){
        this.setState({isLoading:true})

        switch(this.props.role){
            case 'student':{
                if(this.props.page!.indexOf('completed') + 1){
                    const id = Number(this.props.page!.substr(10))// eslint-disable-next-line
                    //запрос по id данных о курсовой

                    //----------------------------------------------------------
                    completedWorks.map(item => {
                        if(item.id === id) return(this.setState({data : item}))
                    })
                    //----------------------------------------------------------

                    //return(this.setState({data : data}))
                }
                break
            }
            case 'teacher':{
                if(this.props.page!.indexOf('completed') + 1){
                    const id = Number(this.props.page!.substr(10)) // eslint-disable-next-line
                    //запрос по id данных о курсовой

                    //----------------------------------------------------------
                    teacherCompletedWorks.map(item => {
                        if (item.id === id) return(this.setState({data : item}))
                    })
                    //----------------------------------------------------------

                    //return(this.setState({data : data}))
                }
                break
            }
        }

        this.setState({isLoading:false})
    }


    private renderCourseWorkDetail(){
        return(
            <div className='informationWindow'>
                <Description data={this.state.data} role={this.props.role}/>
                <AttachedFiles data={this.state.data} role={this.props.role}/>
            </div>
        )
    }

    render(){
        return (
            !this.state.isLoading?
                this.renderCourseWorkDetail()
            :   <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
        )
    }
}

export default CourseWorkDetail