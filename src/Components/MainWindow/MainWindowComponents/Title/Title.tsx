import React, { Component } from 'react'
import './Title.css'

//student
import  activeWorkData from '../../../../TestData/Student/activeWorkData'
import completedWorksData from '../../../../TestData/Student/completedWorksData'
import requestsData from '../../../../TestData/Student/requestsData'
import freeWorksData from '../../../../TestData/Student/freeWorksData'
import requireData from '../../../../TestData/Student/requireCriticData'
import biddingData from '../../../../TestData/Student/biddingData'

//teacher
import teacherCurrentWorks from '../../../../TestData/Teacher/currentWorks'
import teacherFreeWorks from '../../../../TestData/Teacher/freeWorks'

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
    id?: number
}

interface Props{
    page? : string,
    role?: string
}

interface State{
    completedWorksData : Idata[],
    activeWorkData : Idata,
    requestsData: Idata[]
}

class Title extends Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state = {
            completedWorksData : completedWorksData,
            activeWorkData : activeWorkData[0],
            requestsData : requestsData
        }
    }


    private renderTitle(title?: string){
        return <p className='title-text'>{title}</p>
    }

    private whichTitle(){
        switch(this.props.role){
            case 'student':{
                if(this.props.page === 'Моя курсовая детально')
                    return this.renderTitle(this.state.activeWorkData.title)

                if(this.props.page!.indexOf('completed_') + 1)
                    return this.renderTitle(completedWorksData[Number(this.props.page?.substr(10))-1].title)

                if(this.props.page!.indexOf('request') + 1)
                    return this.renderTitle('Моя заявка')

                if(this.props.page!.indexOf('free') + 1)
                    return  this.renderTitle(freeWorksData[Number(this.props.page!.substr(5))-1].title)

                if(this.props.page!.indexOf('bidding') + 1)
                    return  this.renderTitle(biddingData[Number(this.props.page!.substr(8))-1].title)

                if(this.props.page!.indexOf('requireCritic') + 1)
                    return  this.renderTitle(requireData[Number(this.props.page!.substr(14))-1].title)

                return  this.renderTitle(this.props.page)   
            }
            case 'teacher':{
                switch(this.props.page){
                    case 'Занятые':
                        return this.renderTitle('Студенты, у которых я научный руководитель')

                    case 'Свободные':
                        return this.renderTitle('Предложенные мной курсовые')

                    case 'Заявки':
                        return this.renderTitle('Текущие заявки')

                    case 'Завершенные':
                        return this.renderTitle('Завершенные работы')

                    default:{
                        if(this.props.page!.indexOf('current') + 1)
                            return this.renderTitle(teacherCurrentWorks[Number(this.props.page!.substr(8))-1].title)

                        if(this.props.page!.indexOf('free') + 1)
                            return this.renderTitle(teacherFreeWorks[Number(this.props.page!.substr(5))-1].title)
                        return  this.renderTitle(this.props.page)
                    }
                }
            }
        }

    }


    render(){
    return(
        <div className='title'>
            {this.whichTitle()}
            <hr/>
        </div>
    )
    }
}

export default Title