import React, { Component } from 'react'
import './RequireCriticList.css'
import RequireCriticItem from './RequireCriticItem'

//student
import requireData from '../../../../../TestData/Student/requireCriticData'

//teacher
import teacherRequireCritic from '../../../../../TestData/Teacher/requireCriticData'

interface Idata{
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
    id?: number
}

interface Props{
    role?: string,
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
}

interface State{
    data?: Idata[],
    isLoading?: boolean
}

class RequireCriticList extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            data : [{}],
            isLoading : false
        }
    }

    componentDidMount(){
        this.setState({isLoading : true})
        this.whichData()
        this.setState({isLoading : false})
    }

    private whichData = () =>{
        switch(this.props.role){
            case 'student':{
                return (this.setState({data : requireData}))
            }
            case 'teacher':{
                return (this.setState({data : teacherRequireCritic}))
            }
        }
    }

    private renderRequireCriticList(){
        return(
            <div>
                {this.state.data?.map(item => {
                    return <RequireCriticItem 
                        data={item} 
                        changePage={this.props.changePage}
                    />})}
                <hr/>
            </div>
        )
    }
    render(){
        return this.renderRequireCriticList();
    }
}

export default RequireCriticList