import React, { Component } from 'react'
import './Title.css'

//student
import  activeWorkData from '../../../../TestData/Student/activeWorkData'
import completedWorks from '../../../../TestData/Student/completedWorksData'
import freeWorks from '../../../../TestData/Student/freeWorksData'
import requireData from '../../../../TestData/Student/requireCriticData'
import biddingData from '../../../../TestData/Student/biddingData'

//teacher
import teacherCurrentWorks from '../../../../TestData/Teacher/currentWorks'
import teacherMyFreeWorks from '../../../../TestData/Teacher/myFreeWorks'
import teacherCompletedWorks from '../../../../TestData/Teacher/completedWorks'
import teacherRequest from '../../../../TestData/Teacher/requestsData'
import teacherFreeWorks from '../../../../TestData/Teacher/freeWorks'

interface Idata{
    title?: string
}

interface Props{
    page? : string,
    role?: string
}

interface State{

}

class Title extends Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state = {

        }
    }


    private renderTitle(title?: string){
        return <p className='title-text'>{title}</p>
    }

    private whichTitle(){
        switch(this.props.role){
            case 'student':{
                if(this.props.page === 'Моя курсовая детально')
                    return this.renderTitle(activeWorkData[0].title)

                if(this.props.page!.indexOf('completed_') + 1){
                    const id = Number(this.props.page!.substr(10))
                    let data :{title?: string} = {} // eslint-disable-next-line
                    completedWorks.map(item =>{
                        if(item.id === id) return (data = item)
                    })
                    return this.renderTitle(data.title)
                }

                if(this.props.page!.indexOf('request') + 1)
                    return this.renderTitle('Моя заявка')

                if(this.props.page!.indexOf('free') + 1){
                    const id = Number(this.props.page!.substr(5))
                    let data : {title?: string} = {} // eslint-disable-next-line
                    freeWorks.map(item =>{
                        if(item.id === id) return (data = item)
                    })
                    return  this.renderTitle(data.title)
                }
                    

                if(this.props.page!.indexOf('bidding') + 1){
                    const id = Number(this.props.page!.substr(8))
                    let data : {title?: string} = {} // eslint-disable-next-line
                    biddingData.map(item => {
                        if(item.id === id) return (data = item)
                    })
                    return this.renderTitle(data.title)
                }

                if(this.props.page!.indexOf('requireCritic') + 1){
                    const id = Number(this.props.page!.substr(14))
                    let data : {title?: string} = {} // eslint-disable-next-line
                    requireData.map(item => {
                        if(item.id === id) return (data = item)
                    })
                    return  this.renderTitle(data.title)
                }
                
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
                        if(this.props.page!.indexOf('current') + 1){
                            const id = Number(this.props.page!.substr(8))
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherCurrentWorks.map(item => {
                                if(item.id === id) return (data = item)
                            })
                            return this.renderTitle(data.title)
                        }
                    

                        if(this.props.page!.indexOf('free') + 1){
                            const id = Number(this.props.page!.substr(5))
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherMyFreeWorks.map(item => {
                                if(item.id === id) return (data = item)
                            })
                            return this.renderTitle(data.title)
                        }

                        if(this.props.page!.indexOf('completed') + 1){
                            const id = Number(this.props.page!.substr(10))
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherCompletedWorks.map(item => {
                                if (item.id === id) return (data = item)
                            })
                            return this.renderTitle(data.title)
                        }

                        if(this.props.page!.indexOf('st') === 0){
                            let studentId = Number(this.props.page?.substr(2,(this.props.page.indexOf('request')-3)))
                            let requestId = Number(this.props.page!.substr(this.props.page!.indexOf('request')+7))
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherRequest.map(item => {
                                if(item.id === requestId && item.studentId === studentId) return (data = item)
                            })
                            return this.renderTitle(data.title)
                        }

                        if(this.props.page!.indexOf('foreign') + 1){
                            const id = Number(this.props.page!.substr(8))
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherFreeWorks.map(item => {
                                if(item.id === id) data = item
                            })
                            return this.renderTitle(data.title)
                        }

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