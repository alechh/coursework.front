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
import axios from 'axios'

import './AddNewTopic.css'


interface Props{
    closeSidePage() : void,
    token : string
}

interface State{
  title: string,
  description: string,
  course: number,
  isSending: boolean,
  requirements : string,
  teacherName: string,
  teacherContacts : string,
  consultantName : string,
  consultantContacts : string
}

interface CreateCourseWorkViewMode{
  title : string,
  overview : string,
  description : string,
  type : string,
  requirements : string,
  consultantName : string,
  consultantContact : string,
  supervisorName : string,
  supervisorContact : string,
}

class AddWork extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
          title:'',
          description: '',
          course: 0,
          isSending: false,
          requirements : '',
          teacherName : '',
          teacherContacts : '',
          consultantName : '',
          consultantContacts : ''
        }
    }

private setCourse = (newAttachSelect : {target:{value:{}}}) => {
  this.setState({ course : Number(newAttachSelect.target.value)})
}

private clickButton = () => {
  if(this.state.title === ''){
    alert('Введите название темы')
    return
  }
  if(this.state.description === ''){
    alert('Введите описание темы')
    return
  }
  if(this.state.course === 0){
    alert('Выберите курс')
    return
  }
  this.setState({isSending:true})

  const axios = require('axios').default
  let body : CreateCourseWorkViewMode = {
    title : this.state.title,
    description : this.state.description,
    overview : this.state.description,
    type : '',
    requirements : this.state.requirements,
    consultantName : this.state.consultantName,
    consultantContact : this.state.consultantContacts,
    supervisorName : this.state.teacherName,
    supervisorContact : this.state.teacherContacts
  }
  axios.post('../api/lecturer/course_works/add', this.props.token, body)

  Toast.push('Тема добавлена');
  this.props.closeSidePage()

  this.setState({isSending: false})
}


private renderSidePage() {
  let items = ['1', '2', '3', '4', '5','6'];
  let radioItems = ['Нет', 'Да'];
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

              <div className='topicDescription'>
                <Typography variant='h6'>Описание работы</Typography>
              </div>
              <TextArea
                    autoResize={true}
                    width='35vw'
                    value={this.state.description}
                    onChange={item => this.setState({description : item.currentTarget.value})}
                />
              <br/>

              <div className='topicDescription'><Typography variant='h6'>Требования к работе</Typography></div>
              <TextArea
                autoResize={true}
                width='20vw'
                value={this.state.requirements}
                onChange={item => this.setState({requirements : item.currentTarget.value})}
              />

              <div style={{marginTop:'2vh'}}>
                <Gapped>
                  <Typography variant='h6'>Имя</Typography>
                  <Input
                    width='15vw'
                    value={this.state.teacherName}
                    onChange={item => this.setState({teacherName : item.currentTarget.value})}
                  />
                </Gapped>
              </div>
              <div style={{marginTop:'2vh'}}>
                <Gapped>
                  <Typography variant='h6'>Контакты</Typography>
                  <Input
                    width='15vw'
                    value={this.state.teacherContacts}
                    onChange={item => this.setState({teacherContacts : item.currentTarget.value})}
                  />
                </Gapped>
              </div>


              <div style={{marginBottom:'1vh', marginTop:'8vh'}}>
                <hr/>
                <div >
                  <Typography variant='h6'>Консультант (если есть)</Typography>
                </div>
                <Gapped>
                  <div className='minW10'><Typography variant='body1'>Имя консультанта</Typography></div>
                  <Input
                    value={this.state.consultantName}
                    onChange={item => this.setState({consultantName : item.currentTarget.value})}
                  />
                </Gapped>
                <br/>

                <Gapped>
                  <div className='minW10'><Typography variant='body1'>Контакты консультанта</Typography></div>
                  <Input
                    value={this.state.consultantContacts}
                    onChange={item => this.setState({consultantContacts : item.currentTarget.value})}
                  />
                </Gapped>
                <hr/>
              </div>

              
              <br/>
              

              </SidePage.Container>

          </SidePage.Body>
          <SidePage.Footer panel>
            <Gapped>
              <div className='course'>
                <Gapped>
                    <Typography variant='body1'>Курс: </Typography>
                    <Select
                      items={items}
                      onChange={this.setCourse}
                    />
                </Gapped>
              </div>
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

