import React, { Component } from 'react'
import './CourseWork.css'
import Typography from '@material-ui/core/Typography'
import Gapped from '@skbkontur/react-ui/Gapped'

interface Idata{
    title?: string,
    teacher?: string,
    deadline ?: string,
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
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    data : Idata,
}

interface State{

}

class CourseWork extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={}
    }

    private isEmpty(obj : Idata) {
        return Object.keys(obj).length === 0;
    }

    private renderCourseWork(){
        return (
            !this.isEmpty(this.props.data)?
            <div className='courseWork'>
                <p className='courseWorkTitle'><b>{this.props.data.title}</b>  {', ' + this.props.data.teacher}</p>
                <p className='courseWorkDescription'>{this.props.data.description}</p>
                <Gapped>
                    <button 
                        value={Number(this.props.data.id) === 0? 'Моя курсовая детально' : this.props.data.id} 
                        onClick={this.props.changePage} 
                        className='courseWorkMore'
                    ><Typography variant='button'>Подробнее</Typography></button>
                    {this.props.data.deadline !== ''? <div style={{marginLeft:'30px'}}><Typography variant='overline'>Дедлайн: {this.props.data.deadline}</Typography></div> : null}
                </Gapped>
            </div>
            :             
            <div style={{textAlign:"center"}}>
                <Typography variant='h5'>Нет курсовой работы</Typography>
            </div>
        )
    }


    render(){
        return this.renderCourseWork();
    }
}

export default CourseWork