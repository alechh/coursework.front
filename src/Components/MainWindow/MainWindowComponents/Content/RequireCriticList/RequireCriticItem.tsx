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
    userId?: number
}

interface State{
}

class RequireCriticItem extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={}
    }

    private handleSwitcher = (event : {target : {value:string}}) => {
        //----------------------------------------------------------------------------------------------------
        // Запрос по userId, id и this.target.value на изменение состояние (могу рецензировать, хочу, не могу)
        //----------------------------------------------------------------------------------------------------

        //----------------------------------------------
        let newData = this.props.data
        newData.switcher = event.target.value
        this.setState({data : newData})
        //----------------------------------------------
    }

    render(){
        return(
            <div className='requireItem'>
                <div className='requireTitle'><Typography variant='h6'>{this.props.data.title}, преподаватель {this.props.data.teacher}</Typography></div>
                <Gapped gap={50}>
                    <button
                        className='buttonMore'
                        value={'requireCritic_' + this.props.data.id?.toString()}
                        onClick={this.props.changePage}
                    ><Typography variant='button'>Подробнее</Typography></button>
                    <Switcher
                        items={['Да','Мб','Нет']}
                        value={this.props.data.switcher}
                        onChange={this.handleSwitcher}
                        key={this.props.data.id}
                        />
                </Gapped>
            </div>
        )
    }
}

export default RequireCriticItem