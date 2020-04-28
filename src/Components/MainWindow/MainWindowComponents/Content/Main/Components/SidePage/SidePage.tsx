import React, { Component } from 'react'
import SidePage from '@skbkontur/react-ui/SidePage'
import Button from '@skbkontur/react-ui/Button'
import Typography from '@material-ui/core/Typography'
import Gapped from '@skbkontur/react-ui/Gapped'
import Input from '@skbkontur/react-ui/Input'
import TextArea from '@skbkontur/react-ui/Textarea'
import Select from '@skbkontur/react-ui/Select'
import Toast from '@skbkontur/react-ui/Toast'
import Spinner from '@skbkontur/react-ui/Spinner'
import {Ok, Delete} from '@skbkontur/react-icons'

import './SidePage.css'


interface Props{
    closeSidePage() : void,
    userId ?: number
}

interface State{
  title: string,
  description: string,
  course: number,
  isSending: boolean
}

class AddWork extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
          title:'',
          description: '',
          course: 0,
          isSending: false
        }
    }

private setCourse = (newAttachSelect : {target:{value:{}}}) => {
  this.setState({ course : Number(newAttachSelect.target.value)})
}

private clickButton = () => {
  if(this.state.title === ''){
    Toast.push('Введите название темы')
    return
  }
  if(this.state.description === ''){
    Toast.push('Введите описание темы')
    return
  }
  if(this.state.course === 0){
    Toast.push('Выберите курс')
    return
  }
  this.setState({isSending:true})

  //let newTopicVM = {title : this.state.title, description : this.state.description, course : this.state.course}
  //отправить запрос на добавление темы (передаю this.props.userId и newTopicVM)

  Toast.push('Тема добавлена');
  this.props.closeSidePage()

  this.setState({isSending: false})

}

    private renderSidePage() {
      let items = ['1', '2', '3', '4', '5','6'];
        return (
            <SidePage onClose={this.props.closeSidePage} blockBackground>
            <div className='sideTitle'><SidePage.Header>Предложить тему курсовой работы</SidePage.Header></div>
            <SidePage.Body>
                <SidePage.Container>
                  <Gapped gap={20}>
                    <div className='topicTitle'><Typography variant='h5'>Название темы</Typography></div>
                    <Input
                      value={this.state.title}
                      onChange={item => this.setState({title: item.currentTarget.value})}
                      />
                  </Gapped>
                  <br/>
                  <div className='topicDescription'><Typography variant='h5'>Описание</Typography></div>
                  <div className='textArea'>
                    <TextArea
                      autoResize={true}
                      width='35vw'
                      value={this.state.description}
                      onChange={item => this.setState({description : item.currentTarget.value})}
                    />
                  </div>
                  <br/>
                  <div className='course'>
                    <Gapped>
                        <Typography variant='body1'>Курс: </Typography>
                        <Select
                          items={items}
                          onChange={this.setCourse}
                        />
                    </Gapped>
                  </div>

                </SidePage.Container>

            </SidePage.Body>
            <SidePage.Footer panel>
              <Gapped>
                <Button
                  icon={<Ok/>} 
                  use='success' 
                  size='large'
                  onClick={this.clickButton}
                >Отправить</Button>
                <Button
                  icon={<Delete/>} 
                  onClick={this.props.closeSidePage} 
                  size='large'
                >Отмена</Button>
                {this.state.isSending && <Spinner type='mini'/>}
              </Gapped>
            </SidePage.Footer>
          </SidePage>
        );

      }

    
    render(){
        return this.renderSidePage();
    }
}

export default AddWork

