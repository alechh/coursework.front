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
import TeachersCurrentWorkDetail from './TeachersCurrentWorkDetail/TeachersCurrentWorkDetail'
import TeacherFreeWorksDetail from './TeacherFreeWorkDetail/TeacherFreeWorkDetail'
import CriticSwitcher from './CriticSwitcher/CriticSwitcher'
import NewCriticList from './NewCriticsList/NewCriticList'
import CuratorCurrentWorkDetail from './CuratorCurrentWorkDetail/CuratorCurrentWorkDetail'
import CuratorSuggestedTopics from './CuratorSuggestedTopics/CuratorSuggestedTopics'
import BiddingList from './BiddingList/BiddingList'

//student
import activeWork from '../../../../TestData/Student/activeWorkData'

interface Props{
    page?: string,
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    handleCritic() : void,
    isCritic?: boolean,
    role?: string,
    userId?: number
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
            case 'curator':{
                if(this.props.page === 'Занятые темы' || this.props.page === 'Предложенные темы' || this.props.page === 'Заявки')
                    return true
                break
            }
        }
        return false
    }

    needSwitcher(){
        if(this.props.role === 'curator' && (this.props.page === 'Новые рецензенты' || this.props.page === 'Выбранные рецензенты'))
            return true
        return false
    }

    private whichComponent(){
        switch(this.props.role){
            case 'student':{
                if(this.props.page!.indexOf('completed') + 1)
                    return <CourseWorkDetail role={this.props.role} page = {this.props.page}/>
                
                if(this.props.page!.indexOf('request') + 1)
                    return <RequestDetail userId={this.props.userId} page={this.props.page} role={this.props.role}/>
                

                if(this.props.page!.indexOf('free') + 1)
                    return <FreeWorkDetail userId= {this.props.userId} page={this.props.page} role={this.props.role}/>
                

                if(this.props.page!.indexOf('requireCritic') + 1)
                    return <RequireCriticDetail userId={this.props.userId} role={this.props.role} page={this.props.page}/>
                

                if(this.props.page!.indexOf('bidding') + 1)
                    return <BiddingDetail role={this.props.role} page={this.props.page}/>

                break
            }
            case 'teacher':{
                if(this.props.page!.indexOf('st') === 0){
                    return <RequestDetail userId={this.props.userId} page={this.props.page} role={this.props.role} />
                }

                if(this.props.page!.indexOf('current') + 1)
                    return <TeachersCurrentWorkDetail 
                                page={this.props.page} 
                                role={this.props.role}
                                userId={this.props.userId}/>
                
                if(this.props.page!.indexOf('free') + 1)
                    return <TeacherFreeWorksDetail 
                                userId = {this.props.userId}
                                page={this.props.page} 
                                changePage={this.props.changePage}
                                role={this.props.role}/>
                
                if(this.props.page!.indexOf('completed') + 1)
                    return <CourseWorkDetail role={this.props.role} page={this.props.page}/>
                
                if(this.props.page!.indexOf('foreign') + 1)
                    return <FreeWorkDetail userId={this.props.userId} page={this.props.page} role={this.props.role}/>
                
                if(this.props.page!.indexOf('requireCritic') + 1)
                    return <RequireCriticDetail userId={this.props.userId} role={this.props.role} page={this.props.page}/>
                
                if(this.props.page!.indexOf('bidding') + 1)
                    return <BiddingDetail role={this.props.role} page={this.props.page}/>
                break
            }
            case 'curator':{
                if(this.props.page!.indexOf('current') + 1)
                    return <CuratorCurrentWorkDetail page={this.props.page} role={this.props.role}/>

                if(this.props.page!.indexOf('curatorBusy') + 1)
                    return <TeachersCurrentWorkDetail 
                                page={this.props.page} 
                                role={this.props.role}
                                userId={this.props.userId}/>

                if(this.props.page!.indexOf('curatorFree') + 1)
                    return <TeacherFreeWorksDetail 
                                userId={this.props.userId}
                                page={this.props.page} 
                                role={this.props.role}
                                changePage={this.props.changePage}/>

                if(this.props.page!.indexOf('curatorSt') + 1){
                    return <RequestDetail userId={this.props.userId} page={this.props.page} role={this.props.role} />
                }
            }
        }

    }

    private whichContent(){
        
        switch(this.props.role){
            case 'student':{
                switch(this.props.page){
                    case 'Главная': 
                        return <Main
                                    userId = {this.props.userId}
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

                    case 'Моя курсовая детально': 
                        return <MyCourseWorkDetail userId = {this.props.userId}/>

                    case 'Завершенные': 
                        return <WorksList 
                                    userId={this.props.userId}
                                    changePage={this.props.changePage} 
                                    role={this.props.role}
                                    type='completed'/>

                    case 'Мои заявки': 
                        return <RequestsList userId={this.props.userId} changePage={this.props.changePage} role={this.props.role}/>

                    case 'Свободные курсовые': 
                        return <WorksList 
                                    userId={this.props.userId}
                                    changePage={this.props.changePage} 
                                    role={this.props.role}
                                    type='free'/>

                    case 'Требуют рецензии': 
                        return <RequireCriticList userId={this.props.userId} role={this.props.role} changePage={this.props.changePage}/>

                    default:
                        return this.whichComponent()
                }
            }
            case 'teacher':{
                switch(this.props.page){
                    case 'Главная': 
                        return <Main
                                    userId = {this.props.userId}
                                    role={this.props.role} 
                                    handleCritic={this.props.handleCritic} 
                                    isCritic = {this.props.isCritic} 
                                    changePage={this.props.changePage}/>

                    case 'Занятые': 
                        return <WorksList
                                    userId={this.props.userId} 
                                    changePage={this.props.changePage}
                                    role={this.props.role}
                                    type='current'/>
                                                    
                    case 'Свободные': 
                        return <WorksList
                                    changePage={this.props.changePage}
                                    role={this.props.role}
                                    type='free'/>

                    case 'Завершенные':
                        return <WorksList
                                    userId={this.props.userId}
                                    changePage={this.props.changePage}
                                    role={this.props.role}
                                    type='completed'/>

                    case 'Заявки': 
                        return <RequestsList
                                    userId={this.props.userId}
                                    changePage = {this.props.changePage}
                                    role={this.props.role}/>

                    case 'Свободные курсовые':
                        return <WorksList
                                    userId={this.props.userId}
                                    changePage={this.props.changePage}
                                    role={this.props.role}
                                    type='foreign'/>

                    case 'Требуют рецензии':
                        return <RequireCriticList
                                    userId={this.props.userId}
                                    role={this.props.role}
                                    changePage={this.props.changePage}/>
                    default:
                        return this.whichComponent()
                }
            }
            case 'curator':{
                switch(this.props.page){
                    case 'Главная':
                        return <Main
                                    userId = {this.props.userId}
                                    role={this.props.role} 
                                    handleCritic={this.props.handleCritic} 
                                    isCritic = {this.props.isCritic} 
                                    changePage={this.props.changePage}/>

                    case 'Новые рецензенты':
                        return <NewCriticList userId={this.props.userId} type='not-selected'/>
                    
                    case 'Выбранные рецензенты':
                        return <NewCriticList userId={this.props.userId} type='selected'/>
                    
                    case 'Занятые темы':
                        return <WorksList
                                    userId={this.props.userId}
                                    changePage={this.props.changePage}
                                    role={this.props.role}
                                    type='current'/>

                    case 'Предложенные темы':
                        return <CuratorSuggestedTopics
                                    userId={this.props.userId}
                                    changePage={this.props.changePage}/>

                    case 'Заявки': 
                        return <RequestsList
                                    userId={this.props.userId}
                                    changePage = {this.props.changePage}
                                    role={this.props.role}/>

                    case 'Биддинг':
                        return <BiddingList userId={this.props.userId}/>
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
                {this.needSwitcher()? <CriticSwitcher changePage={this.props.changePage} page={this.props.page}/> : null}
                {this.whichContent()}
            </div>
        )
    }
 
    render(){
        return this.renderContent();
    }
}

export default Content