import React, { Component } from 'react'
import './RequireCriticList.css'
import RequireCriticItem from './RequireCriticItem'

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
    id?: string
}

interface Props{
    data?: {}[],
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
}

interface State{
    data?: Idata[]
}

class RequireCriticList extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            data : this.props.data
        }
    }

    private renderRequireCriticList(){
        return(
            <div>
                {this.props.data?.map(item => 
                    <RequireCriticItem 
                        data={item} 
                        changePage={this.props.changePage}/>)}
                <hr/>
            </div>
        )
    }

    render(){
        return this.renderRequireCriticList();
    }
}

export default RequireCriticList