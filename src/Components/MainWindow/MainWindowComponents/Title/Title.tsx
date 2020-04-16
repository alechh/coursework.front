import React, { Component } from 'react'
import './Title.css'

import  activeWorkData from '../../../../TestData/activeWorkData'
import completedWorksData from '../../../../TestData/completedWorksData'
import requestsData from '../../../../TestData/requestsData'
import freeWorksData from '../../../../TestData/freeWorksData'
import requireData from '../../../../TestData/requireCriticData'
import biddingData from '../../../../TestData/biddingData'

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
    page? : string
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

    private whichTitle(){
        if(this.props.page === 'Моя курсовая детально'){
            return <p className='title-text'>{this.state.activeWorkData.title}</p>
        }
        else if (Number(this.props.page)){
            return <p className='title-text'>{this.state.completedWorksData[Number(this.props.page?.substr(1))-1].title}</p>
        }
        else if(this.props.page?.substr(0,1) === 'r') {
            return <p className='title-text'>Моя заявка</p>
        }
        else if(this.props.page?.substr(0,1) === 'f')
            return <p className='title-text'>{freeWorksData[Number(this.props.page.substr(1))-1].title}</p>
        else if(this.props.page?.substr(0,1) === 'c')
            return <p className='title-text'>{completedWorksData[Number(this.props.page.substr(1))-1].title}</p>
        else if(this.props.page?.substr(0,1) === 'e')
            return <p className='title-text'>{requireData[Number(this.props.page.substr(1))-1].title}</p>
        else if(this.props.page?.substr(0,1) === 'b')
            return <p className='title-text'>{biddingData[Number(this.props.page.substr(1))-1].title}</p>
            return <p className='title-text'>{this.props.page}</p>
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