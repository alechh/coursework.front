import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import './RequireCriticList.css'
import Switcher from '@skbkontur/react-ui/Switcher'
import Gapped from '@skbkontur/react-ui/Gapped'

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
    data: Idata,
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
}

interface State{
    data: Idata
}

class RequireCriticItem extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            data: this.props.data
        }
    }

    private handleSwtcher = (event : {target : {value:string}}) => {
        let newData = this.state.data
        newData.switcher = event.target.value
        this.setState({data : newData})
    }

    render(){
        return(
            <div className='requireItem'>
                <div className='requireTitle'><Typography variant='h6'>{this.state.data.title}, {this.state.data.teacher}</Typography></div>
                <Gapped gap={20}>
                    <button
                        className='more'
                        value={'requireCritic_' + this.state.data.id?.toString()}
                        onClick={this.props.changePage}
                    ><Typography variant='button'>Подробнее</Typography></button>
                    <Switcher
                        items={['Да','Мб','Нет']}
                        value={this.state.data.switcher}
                        onChange={this.handleSwtcher}
                        key={this.state.data.id}
                        />
                </Gapped>
            </div>
        )
    }
}

export default RequireCriticItem