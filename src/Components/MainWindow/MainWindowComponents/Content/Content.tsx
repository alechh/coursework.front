import React, { Component } from 'react'
import './Content.css'
import ContentBar from './ContentBar/ContentBar'
import CourseWork from './CourseWork/CourseWork'
import MyCourseWorkDetail from './MyCourseWorkDetail/MyCourseWorkDetail'
import WorksList from './WorksList/WorksList'
import CourseWorkDetail from './CourseWorkDetail/CourseWorkDetail'
import RequestsList from './RequestsList/RequestsList'
import RequestDetail from './RequestDetail/RequestDetail'
import FreeWorkDetail from './FreeWorkDetail/FreeWorkDetail'
import Main from './Main/Main'
import RequireCriticList from './RequireCriticList/RequireCriticList'
import RequireCriticDetail from './RequireCriticDetail/RequireCriticDetail'
import BiddingDetail from './BiddingDetail/BiddingDetail'
import TeachersCurrentWork from './TeachersCurrentWork/TeachersCurrentWork'
import TeacherFreeWorksDetail from './TeacherFreeWorkDetail/TeacherFreeWorkDetail'

//student
import activeWork from '../../../../TestData/Student/activeWorkData'
import completedWorks from '../../../../TestData/Student/completedWorksData'
import requestsData from '../../../../TestData/Student/requestsData'
import freeWorks from '../../../../TestData/Student/freeWorksData'
import requireData from '../../../../TestData/Student/requireCriticData'
import biddingData from '../../../../TestData/Student/biddingData'

//teacher
import teacherCurrentWorks from '../../../../TestData/Teacher/currentWorks'
import teacherMyFreeWorks from '../../../../TestData/Teacher/myFreeWorks'
import teacherRequest from '../../../../TestData/Teacher/requestsData'
import teacherCompletedWorks from '../../../../TestData/Teacher/completedWorks'
import teacherFreeWorks from '../../../../TestData/Teacher/freeWorks'
 

interface IRequestsData{
    title?: string,
    teacher?: string,
    scienceArea?: string,
    description?: string,
    teacherContacts?: string,
    aboutMe?: string,
    id?: number
}

interface ICompletedData{
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
    criticReview?: string,
    id?: number
}

interface IFreeData{
    title?: string,
    teacher?:string,
    teacherContacts?: string,
    scienceArea?: string,
    description?: string, 
    deadline?: string,
    id?: number
}

interface IRequireCriticData{
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

interface IBiddingData{
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


interface ITeacherFreeWork{
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

interface ITeacherRequest{
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

interface ITeacherCurrentWork{
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
    review?: string
    criticReview?:string,
    id?: number
}

interface ITeacherCompletedWork{
    title?: string,
    teacher?: string,
    teacherContacts?: string,
    deadline?: string,
    scienceArea?: string,
    description?: string, 
    reportFile?: string,
    presentationFile?: string,
    consultantReportFile?: string,
    link?: string,
    consultant?: string,
    consultantContacts?: string,
    critic?: string,
    criticReview?: string,
    teacherReview?: string,
    status?: string,
    student?: string,
    course?: number,
    id?: number
}



interface Props{
    page?: string,
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    handleCritic() : void,
    isCritic?: boolean,
    role?: string
}

interface State{

}

class Content extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state ={
        }
    }

    needContentBar(){
        switch(this.props.role){
            case 'student':{  
                if(this.props.page === 'Активные' || this.props.page === 'Завершенные' || this.props.page === 'Мои заявки')
                    return true
                break
            }
            case 'teacher':{
                if(this.props.page === 'Занятые' || this.props.page === 'Свободные' || this.props.page === 'Завершенные' || this.props.page === 'Заявки')
                    return true
                break
            }
        }
        return false
    }

 
    private whichComponent(){
        switch(this.props.role){
            case 'student':{
                if(this.props.page!.indexOf('completed') + 1){
                    const id = Number(this.props.page!.substr(10))
                    let data : ICompletedData = {} // eslint-disable-next-line
                    completedWorks.map(item =>{
                        if(item.id === id) return (data = item)
                    })
                    return <CourseWorkDetail data={data} role={this.props.role}/>
                }
                if(this.props.page!.indexOf('request') + 1){
                    const id = Number(this.props.page!.substr(8))
                    let data : IRequestsData = {} // eslint-disable-next-line
                    requestsData.map(item =>{
                        if(item.id === id) return (data = item)
                    })
                    return <RequestDetail data={data} role={this.props.role}/>
                }

                if(this.props.page!.indexOf('free') + 1){
                    const id = Number(this.props.page!.substr(5))
                    let data : IFreeData = {} // eslint-disable-next-line
                    freeWorks.map(item =>{
                        if(item.id === id) return (data = item)
                    })
                    return <FreeWorkDetail data={data} role={this.props.role}/>
                }

                if(this.props.page!.indexOf('requireCritic') + 1){
                    const id = Number(this.props.page!.substr(14))
                    let data : IRequireCriticData= {} // eslint-disable-next-line
                    requireData.map(item => {
                        if(item.id === id) return (data = item)
                    })
                    return <RequireCriticDetail data={data}/>
                }

                if(this.props.page!.indexOf('bidding') + 1){
                    const id = Number(this.props.page!.substr(8))
                    let data : IBiddingData = {} // eslint-disable-next-line
                    biddingData.map(item => {
                        if(item.id === id) return (data = item)
                    })
                    return <BiddingDetail data={data}/>
                }
                break
            }
            case 'teacher':{
                if(this.props.page!.indexOf('st') === 0){
                    let studentId = Number(this.props.page?.substr(2,(this.props.page.indexOf('request')-3)))
                    let requestId = Number(this.props.page!.substr(this.props.page!.indexOf('request')+7))
                    let data : ITeacherRequest = {} // eslint-disable-next-line
                    teacherRequest.map(item => {
                        if(item.id === requestId && item.studentId === studentId) return (data = item)
                    })
                    return <RequestDetail data={data} role={this.props.role} />
                }

                if(this.props.page!.indexOf('current') + 1){
                    const id = Number(this.props.page!.substr(8))
                    let data : ITeacherCurrentWork = {} // eslint-disable-next-line
                    teacherCurrentWorks.map(item => {
                        if(item.id === id) return (data = item)
                    })
                    return <TeachersCurrentWork data={data}/>
                }

                if(this.props.page!.indexOf('free') + 1){
                    const id = Number(this.props.page!.substr(5))
                    let validRequests : ITeacherRequest[]
                    validRequests = [] // eslint-disable-next-line
                    teacherRequest.map(item =>{
                        if(item.id === id)
                            validRequests.push(item)
                    })
                    let data : ITeacherFreeWork = {} // eslint-disable-next-line
                    teacherMyFreeWorks.map(item => {
                        if(item.id === id) return (data = item)
                    })
                    return <TeacherFreeWorksDetail 
                                data={data} 
                                requests = {validRequests}
                                changePage={this.props.changePage}/>
                }

                if(this.props.page!.indexOf('completed') + 1){
                    const id = Number(this.props.page!.substr(10))
                    let data : ITeacherCompletedWork = {} // eslint-disable-next-line
                    teacherCompletedWorks.map(item => {
                        if (item.id === id) return (data = item)
                    })
                    return <CourseWorkDetail
                        data = {data}
                        role={this.props.role}/>

                }

                if(this.props.page!.indexOf('foreign') + 1){
                    const id = Number(this.props.page!.substr(8))
                    let data : IFreeData = {} // eslint-disable-next-line
                    teacherFreeWorks.map(item => {
                        if(item.id === id) data = item
                    })
                    return <FreeWorkDetail data={data} role={this.props.role}/>
                }
                //requireCritic
                //bidding
                break
            }
            default: return null
        }

    }

    private whichContent(){
        
        switch(this.props.role){
            case 'student':{
                switch(this.props.page){
                    case 'Главная': 
                        return <Main
                                    role={this.props.role} 
                                    handleCritic={this.props.handleCritic} 
                                    isCritic = {this.props.isCritic} 
                                    changePage={this.props.changePage}/>

                    case 'Активные': 
                        return <CourseWork 
                                    data={activeWork[0]} 
                                    changePage={this.props.changePage} 
                                    role={this.props.role}
                                    type='current'/>

                    case 'Моя курсовая детально': return <MyCourseWorkDetail/>

                    case 'Завершенные': 
                        return <WorksList 
                                    data={completedWorks} 
                                    changePage={this.props.changePage} 
                                    role={this.props.role}
                                    type='completed'/>

                    case 'Мои заявки': 
                        return <RequestsList 
                                    data={requestsData} 
                                    changePage={this.props.changePage} 
                                    role={this.props.role}/>

                    case 'Свободные курсовые': 
                        return <WorksList 
                                    data={freeWorks} 
                                    changePage={this.props.changePage} 
                                    role={this.props.role}
                                    type='free'/>

                    case 'Требуют рецензии': 
                        return <RequireCriticList
                                    data={requireData} 
                                    changePage={this.props.changePage}/>

                    default:
                        return this.whichComponent()
                }
            }
            case 'teacher':{
                switch(this.props.page){
                    case 'Главная': 
                        return <Main
                                    role={this.props.role} 
                                    handleCritic={this.props.handleCritic} 
                                    isCritic = {this.props.isCritic} 
                                    changePage={this.props.changePage}/>

                    case 'Занятые': 
                        return <WorksList 
                                    data={teacherCurrentWorks} 
                                    changePage={this.props.changePage}
                                    role={this.props.role}
                                    type='current'
                                    />
                                                    
                    case 'Свободные': 
                        return <WorksList
                                    data={teacherMyFreeWorks}
                                    changePage={this.props.changePage}
                                    role={this.props.role}
                                    type='free'/>
                    case 'Завершенные':
                        return <WorksList
                                    data={teacherCompletedWorks}
                                    changePage={this.props.changePage}
                                    role={this.props.role}
                                    type='completed'/>
                    case 'Заявки': 
                        return <RequestsList
                                    data = {teacherRequest}
                                    changePage = {this.props.changePage}
                                    role={this.props.role}/>
                    case 'Свободные курсовые':
                        return <WorksList
                                    data={teacherFreeWorks}
                                    changePage={this.props.changePage}
                                    role={this.props.role}
                                    type='foreign'/>
                    default:
                        return this.whichComponent()
                }
            }
        }
    }

    private renderContent(){
        return(
            <div className='content'>
                {this.needContentBar()? <ContentBar changePage={this.props.changePage} page={this.props.page} role={this.props.role}/> : null}
                {this.whichContent()}
            </div>
        )
    }
 
    render(){
        return this.renderContent();
    }
}

export default Content