import React, { Component } from 'react'
import Description from './Components/Description'
import AttachedFiles from './Components/AttachedFiles'
import Center from '@skbkontur/react-ui/Center'
import Spinner from '@skbkontur/react-ui/Spinner'

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
    data : Idata,
    role : string
}

interface State{
    isLoading?: boolean
}

class CourseWorkDetail extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isLoading:false
        }
    }

    componentDidMount(){
        this.setState({isLoading:true})
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000)
    }


    private renderCourseWorkDetail(){
        return(
            <div className='informationWindow'>
            {!this.state.isLoading?
                <div>
                    <Description data={this.props.data} role={this.props.role}/>
                    <AttachedFiles data={this.props.data} role={this.props.role}/>
                </div>
            : <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>}
            </div>

        )
    }

    render(){
        return this.renderCourseWorkDetail();
    }
}

export default CourseWorkDetail