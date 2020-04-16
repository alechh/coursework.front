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

import activeWork from '../../../../TestData/activeWorkData'
import completedWorks from '../../../../TestData/completedWorksData'
import requestsData from '../../../../TestData/requestsData'
import freeWorks from '../../../../TestData/freeWorksData'
import requireData from '../../../../TestData/requireCriticData'
import biddingData from '../../../../TestData/biddingData'

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
        if(this.props.page === 'Активные' || this.props.page === 'Завершенные' || this.props.page === 'Мои заявки')
            return true
        else return false
    }

    private whichContent(){
        if(this.props.page?.substr(0,1) === 'c') 
            return <CourseWorkDetail data={completedWorks[Number(this.props.page.substr(1))-1]}/>
        if(this.props.page?.substr(0,1) === 'r')
            return <RequestDetail data={requestsData[Number(this.props.page.substr(1))-1]}/>
        if(this.props.page?.substr(0,1) === 'f')
            return <FreeWorkDetail data={freeWorks[Number(this.props.page.substr(1))-1]}/>
        if(this.props.page?.substr(0,1) === 'e')
            return <RequireCriticDetail data={requireData[Number(this.props.page.substr(1))-1]}/>
        if(this.props.page?.substr(0,1) === 'b')
            return <BiddingDetail data={biddingData[Number(this.props.page.substr(1))-1]}/>     
        switch(this.props.page){
            case 'Главная' : return <Main
                                        role={this.props.role} 
                                        handleCritic={this.props.handleCritic} 
                                        isCritic = {this.props.isCritic} 
                                        changePage={this.props.changePage}
                                    />
            case 'Активные': return <CourseWork data={activeWork[0]} changePage={this.props.changePage}/>
            case 'Моя курсовая детально': return <MyCourseWorkDetail/>
            case 'Завершенные': return <WorksList data={completedWorks} changePage={this.props.changePage}/>
            case 'Мои заявки': return <RequestsList data={requestsData} changePage={this.props.changePage}/>
            case 'Свободные курсовые': return <WorksList data={freeWorks} changePage={this.props.changePage}/>
            case 'Требуют рецензии': return <RequireCriticList data={requireData} changePage={this.props.changePage}/>
        }
    }

    private renderContent(){
        return(
            <div className='content'>
                {this.needContentBar()? <ContentBar changePage={this.props.changePage} page={this.props.page}/> : null}
                {this.whichContent()}
            </div>
        )
    }
 
    render(){
        return this.renderContent();
    }
}

export default Content