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
import teacherRequireCritic from '../../../../TestData/Teacher/requireCriticData'
import teacherBidding from '../../../../TestData/Teacher/biddingData'

//curator
import curatorCurrentWorks from '../../../../TestData/Curator/currentWorks'
import curatorMyCurrentWorks from '../../../../TestData/Curator/myCurrentWorks'
import curatorMyFreeWorks from '../../../../TestData/Curator/myFreeWorks'

interface Idata{
    title?: string
}

interface Props{
    page? : string,
    role?: string
}

interface State{
    title?: string,
    isLoading?: boolean
}

class Title extends Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state = {
            title: '',
            isLoading : false
        }
    }

    componentDidMount(){
        this.setState({isLoading : true})
        this.whichTitle()
        this.setState({isLoading : false})
    }

    componentDidUpdate(prevProps : Props){
        if(this.props !== prevProps){
            this.componentDidMount()  
        }
    }


    private renderTitle(){
        return <p className='title-text'>{this.state.title}</p>
    }

    private whichTitle = () => {
        switch(this.props.role){
            case 'student':{
                if(this.props.page === 'Моя курсовая детально'){
                        //запрос заголовка по id курсовой
                        return this.setState({title : activeWorkData[0].title})
                }

                if(this.props.page!.indexOf('completed_') + 1){
                    const id = Number(this.props.page!.substr(10))
                    //запрос заголовка по id курсовой

                    //---------------------------------------------------------
                    let data :{title?: string} = {} // eslint-disable-next-line
                    completedWorks.map(item =>{
                        if(item.id === id) return (data = item)
                    })
                    //---------------------------------------------------------

                    return this.setState({title : data.title})
                }

                if(this.props.page!.indexOf('request') + 1){
                    return this.setState({title : 'Моя заявка'})
                }
                    

                if(this.props.page!.indexOf('free') + 1){
                    const id = Number(this.props.page!.substr(5))
                    //запрос заголовка по id курсовой

                    //-----------------------------------------------------------
                    let data : {title?: string} = {} // eslint-disable-next-line
                    freeWorks.map(item =>{
                        if(item.id === id) return (data = item)
                    })
                    //-----------------------------------------------------------

                    return  this.setState({title : data.title})
                }
                    

                if(this.props.page!.indexOf('bidding') + 1){
                    const id = Number(this.props.page!.substr(8))
                    //запрос заголовка по id курсовой

                    //-----------------------------------------------------------
                    let data : {title?: string} = {} // eslint-disable-next-line
                    biddingData.map(item => {
                        if(item.id === id) return (data = item)
                    })
                    //-----------------------------------------------------------

                    return this.setState({title : data.title})
                }

                if(this.props.page!.indexOf('requireCritic') + 1){
                    const id = Number(this.props.page!.substr(14))
                    //запрос заголовка по id курсовой

                    //----------------------------------------------------------
                    let data : {title?: string} = {} // eslint-disable-next-line
                    requireData.map(item => {
                        if(item.id === id) return (data = item)
                    })
                    //----------------------------------------------------------

                    return  this.setState({title : data.title})
                }
                
                return this.setState({title : this.props.page})   
            }
            case 'teacher':{
                switch(this.props.page){
                    case 'Занятые':
                        return this.setState({title : 'Студенты, у которых я научный руководитель'})

                    case 'Свободные':
                        return this.setState({title : 'Предложенные мной курсовые'})

                    case 'Заявки':
                        return this.setState({title : 'Текущие заявки'})

                    case 'Завершенные':
                        return this.setState({title : 'Завершенные работы'})

                    default:{
                        if(this.props.page!.indexOf('current') + 1){
                            const id = Number(this.props.page!.substr(8))
                            //запрос заголовка по id курсовой

                            //----------------------------------------------------------
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherCurrentWorks.map(item => {
                                if(item.id === id) return (data = item)
                            })
                            //----------------------------------------------------------

                            return this.setState({title : data.title})
                        }
                    

                        if(this.props.page!.indexOf('free') + 1){
                            const id = Number(this.props.page!.substr(5))
                            //запрос заголовка по id курсовой

                            //----------------------------------------------------------
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherMyFreeWorks.map(item => {
                                if(item.id === id) return (data = item)
                            })
                            //----------------------------------------------------------

                            return this.setState({title : data.title})
                        }

                        if(this.props.page!.indexOf('completed') + 1){
                            const id = Number(this.props.page!.substr(10))
                            //запрос заголовка по id курсовой

                            //----------------------------------------------------------
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherCompletedWorks.map(item => {
                                if (item.id === id) return (data = item)
                            })
                            //----------------------------------------------------------

                            return this.setState({title : data.title})
                        }

                        if(this.props.page!.indexOf('request') + 1)
                            return this.setState({title : 'Текущая заявка'})

                        if(this.props.page!.indexOf('st') === 0){
                            let studentId = Number(this.props.page?.substr(2,(this.props.page.indexOf('request')-3)))
                            let requestId = Number(this.props.page!.substr(this.props.page!.indexOf('request')+7))
                            //запрос заголовка по id заявки и id студента

                            //------------------------------------------------------------------------
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherRequest.map(item => {
                                if(item.id === requestId && item.studentId === studentId) data = item
                            })
                            //------------------------------------------------------------------------

                            return this.setState({title : data.title})
                        }

                        if(this.props.page!.indexOf('foreign') + 1){
                            const id = Number(this.props.page!.substr(8))
                            //запрос заголовка по id курсовой

                            //-----------------------------------------------------------
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherFreeWorks.map(item => {
                                if(item.id === id) data = item
                            })
                            //-----------------------------------------------------------

                            return this.setState({title : data.title})
                        }

                        if(this.props.page!.indexOf('requireCritic') + 1){
                            const id = Number(this.props.page!.substr(14))
                            //запрос заголовка по id курсовой

                            //-----------------------------------------------------------
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherRequireCritic.map(item => {
                                if(item.id === id) data = item
                            })
                            //-----------------------------------------------------------

                            return this.setState({title : data.title})
                        }

                        if(this.props.page!.indexOf('bidding') + 1){
                            const id = Number(this.props.page!.substr(8))
                            //запрос заголовка по id курсовой

                            //----------------------------------------------------------
                            let data : {title?: string} = {} // eslint-disable-next-line
                            teacherBidding.map(item => {
                                if(item.id === id) data = item
                            })
                            //----------------------------------------------------------

                            return this.setState({title : data.title})
                        }

                        return  this.setState({title : this.props.page})
                    }
                }
            }
            case 'curator':{
                if(this.props.page === 'Предложенные темы')
                    return this.setState({title : 'Предложенные мной темы'})

                if(this.props.page!.indexOf('current') + 1){
                    const id = Number(this.props.page!.substr(8))
                    //запрос заголовка по id курсовой

                    //----------------------------------------------------------
                    let data : {title?: string} = {}// eslint-disable-next-line
                   curatorCurrentWorks.map(item => {
                        if(item.id === id) data = item
                    })
                    //-----------------------------------------------------------

                    return this.setState({title : data.title})
                }

                if(this.props.page!.indexOf('curatorBusy') + 1){
                    const id = Number(this.props.page!.substr(12))
                    //запрос заголовка по id курсовой

                    //-----------------------------------------------------------
                    let data : {title?: string} = {} // eslint-disable-next-line
                    curatorMyCurrentWorks.map(item => {
                        if(item.id === id) return (data = item)
                    })
                    //-----------------------------------------------------------

                    return this.setState({title : data.title})
                }

                if(this.props.page!.indexOf('curatorFree') + 1){
                    const id = Number(this.props.page!.substr(12))
                    //запрос заголовка по id курсовой

                    //-----------------------------------------------------------
                    let data : {title?: string} = {} // eslint-disable-next-line
                    curatorMyFreeWorks.map(item => {
                        if(item.id === id) return (data = item)
                    })
                    //-----------------------------------------------------------

                    return this.setState({title : data.title})
                }

                if(this.props.page!.indexOf('curatorSt') + 1)
                    return this.setState({title : 'Текущая заявка'})

                if(this.props.page === 'Биддинг')
                    return this.setState({title : 'Результаты биддинга'})

                return this.setState({title : this.props.page})
            }
        }

    }


    render(){
    return(
        <div className='title'>
            {this.renderTitle()}
            <hr/>
        </div>
    )
    }
}

export default Title