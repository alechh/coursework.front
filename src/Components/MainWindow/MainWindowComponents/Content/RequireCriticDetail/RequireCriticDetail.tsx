import React, { Component } from 'react'
import Spinner from '@skbkontur/react-ui/Spinner'
import Center from '@skbkontur/react-ui/Center'
import Typography from '@material-ui/core/Typography'
import Description from './Components/Description'
import AttachedFiles from './Components/AttachedFiles'
import Buttons from './Components/Buttons'

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
    student?: string,
    course?: number,
    id?: string
}

interface Props{
    data : Idata
}

interface State{
    isLoading?: boolean
}

class RequireCriticDetail extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isLoading : false
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


    private renderRequireCriticDetail(){
        return(
            <div>
                {!this.state.isLoading?
                    <div>
                        <div style={{marginLeft:'20px'}}><Typography variant='h4'>{this.props.data.student}, {this.props.data.course} курс</Typography></div>
                        <Description data={this.props.data}/>
                        <AttachedFiles data={this.props.data}/>
                        <hr/>
                        <Buttons/>
                    </div>
                : <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
                }

            </div>
        )
    }

    render(){
        return this.renderRequireCriticDetail();
    }
}

export default RequireCriticDetail