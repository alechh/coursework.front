import React, { Component } from 'react'
import './FreeWorkDetail.css'
import Spinner from '@skbkontur/react-ui/Spinner'
import Center from '@skbkontur/react-ui/Center'
import Description from './Components/Description'
import TextArea from '@skbkontur/react-ui/Textarea'
import Typograph from '@material-ui/core/Typography'
import Gapped from '@skbkontur/react-ui/Gapped'
import Toast from '@skbkontur/react-ui/Toast'

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
    data : Idata
}

interface State{
    isLoading?: boolean,
    aboutMe?: string
}

class FreeWorkDetail extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isLoading : false,
            aboutMe : ''

        }
    }

    private handleChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({aboutMe : event.target.value})
    }

    private submit(){
        Toast.push('Заявка отправлена')
    }

    componentDidMount(){
        this.setState({isLoading:true})
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000)
    }
    private renderFreeWork(){
        return(
            <div>
                {!this.state.isLoading? 
                    <div>
                        <Description data={this.props.data}/>
                        <hr/>
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
                        </div>
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