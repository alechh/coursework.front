import React, { Component } from 'react'
import './FreeWorkDetail.css'
import Spinner from '@skbkontur/react-ui/Spinner'
import Center from '@skbkontur/react-ui/Center'
import Description from './Components/Description'
import TextArea from '@skbkontur/react-ui/Textarea'
import Typograph from '@material-ui/core/Typography'
import Gapped from '@skbkontur/react-ui/Gapped'
import Toast from '@skbkontur/react-ui/Toast'

//student
import freeWorks from '../../../../../TestData/Student/freeWorksData'

//teacher
import teacherFreeWorks from '../../../../../TestData/Teacher/freeWorks'

interface Idata{
    title?: string,
    teacher?:string,
    teacherContacts?: string,
    scienceArea?: string,
    description?: string, 
    deadline?: string,
    id?: number
}

interface Props{
    role?: string,
    page?: string
}

interface State{
    isLoading?: boolean,
    aboutMe?: string,
    data : Idata
}

class FreeWorkDetail extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isLoading : false,
            aboutMe : '',
            data : {}
        }
    }

    private handleChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({aboutMe : event.target.value})
    }

    private submit(){
        Toast.push('Заявка отправлена')
    }

    private needCV(){
        if(this.props.role === 'student')
            return(
            <div style={{marginLeft:'30px'}}>
                <Typograph variant='h6'>Рассказать о себе</Typograph>
                <Gapped gap={5}>
                    <TextArea
                        autoResize={true}
                        width='40vw'
                        value={this.state.aboutMe}
                        onChange={this.handleChange}
                        placeholder='Резюме'
                    />
                    <button
                        id='submit'
                        onClick = {this.submit}
                    ><Typograph variant='button'>Подать заявку</Typograph></button>
                </Gapped>
            </div>)
    }

    componentDidMount(){
        this.setState({isLoading:true})
        // setTimeout(() => {
        //     this.setState({
        //         isLoading: false
        //     })
        // }, 1000)
        switch(this.props.role){
            case 'student':{
                const id = Number(this.props.page!.substr(5))
                let data : Idata = {} // eslint-disable-next-line
                freeWorks.map(item =>{
                    if(item.id === id) return (data = item)
                })
                this.setState({data : data, isLoading : false})
                break
            }
            case 'teacher':{
                const id = Number(this.props.page!.substr(8))
                let data : Idata = {} // eslint-disable-next-line
                teacherFreeWorks.map(item => {
                    if(item.id === id) data = item
                })
                this.setState({data : data, isLoading : false})
                break
            }
        }
    }
    private renderFreeWork(){
        return(
            <div>
                {!this.state.isLoading? 
                    <div>
                        <Description data={this.state.data}/>
                        <hr/>
                        {this.needCV()}
                    </div>
                : <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>}
            </div>
        )
    }

    render(){
        return this.renderFreeWork();
    }
}

export default FreeWorkDetail