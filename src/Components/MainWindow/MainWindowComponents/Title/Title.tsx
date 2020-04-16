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
import myBusyWorks from '../../../../TestData/Teacher/myBusyWorks'

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
    id?: string
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
        /**
         * r - request
         * f - freeWorks
         * c - completedWorkd
         * e - requireCritic
         * b - bidding
         */
        switch(this.props.role){
            case 'student':{
                if(this.props.page === 'Моя курсовая детально')
                    return this.renderTitle(this.state.activeWorkData.title)

                else if (Number(this.props.page))
                    return this.renderTitle(this.state.completedWorksData[Number(this.props.page?.substr(1))-1].title)

                else if(this.props.page?.substr(0,1) === 'r')
                    return this.renderTitle('Моя заявка')

                else if(this.props.page?.substr(0,1) === 'f')
                    return  this.renderTitle(freeWorksData[Number(this.props.page.substr(1))-1].title)

                else if(this.props.page?.substr(0,1) === 'c')
                    return  this.renderTitle(completedWorksData[Number(this.props.page.substr(1))-1].title)

                else if(this.props.page?.substr(0,1) === 'e')
                    return  this.renderTitle(requireData[Number(this.props.page.substr(1))-1].title)

                else if(this.props.page?.substr(0,1) === 'b')
                    return  this.renderTitle(biddingData[Number(this.props.page.substr(1))-1].title)

                return  this.renderTitle(this.props.page)
            }
            case 'teacher':{
                if(this.props.page === 'Занятые темы')
                    return this.renderTitle('Студенты, у которых я научный руководитель')
                if(this.props.page === 'Свободные темы')
                    return this.renderTitle('Предложенные мной курсовые')
                if(this.props.page === 'Заявки')
                    return this.renderTitle('Текущие заявки')
                if(this.props.page?.substr(0,1) === 'm')
                    return this.renderTitle(myBusyWorks[Number(this.props.page.substr(1))-1].title)
                return  this.renderTitle(this.props.page)

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