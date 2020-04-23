import React, { Component, RefObject } from 'react'
import './MyCourseWorkDetail.css'
import Gapped from '@skbkontur/react-ui/Gapped'
import Toast from '@skbkontur/react-ui/Toast'
import Spinner from '@skbkontur/react-ui/Spinner'
import Center from '@skbkontur/react-ui/Center'
import AttachedFiles from './Components/AttachedFiles'
import InputLink from './Components/InputLink'
import AttachFiles from './Components/AttachFiles'
import DeleteFiles from './Components/DeleteFiles'
import Description from './Components/Description'

import courseWorkData from '../../../../../TestData/Student/activeWorkData'

interface Props{
}

interface Idata{
    title?: string,
    teacher?: string,
    deadline?: string,
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
    status?: string
}

interface State{
    isLoading: boolean,
    data : Idata,
    newLink?: string,
    attachSelect : {target?:{value?:string}},
    deleteSelect : {target?: {value?: string}}
}

class MyCourseWork extends Component<Props,State>{
    private readonly inputOpenFileRef : RefObject<HTMLInputElement>

    constructor(props : Props){
        super(props);
        this.state={
            isLoading : false,
            data:{},
            newLink : '',
            attachSelect : {target : {value : 'Выбрать'}},
            deleteSelect : {target : {value : 'Выбрать'}}
        }
        this.inputOpenFileRef = React.createRef()
    }

    private handleNewLink = (event : React.ChangeEvent<HTMLInputElement>, value:string) => {
        this.setState({newLink: value})
    }

    private attachLink = () => {
        if(this.state.newLink === '')
            Toast.push('Введите ссылку')
        else{
        const arr = this.state.data;
        arr.link = this.state.newLink;
        this.setState({data:arr})
        Toast.push('Ссылка прикреплена');
        }
    }

    private deleteLink = () => {
        if(this.state.data.link === '')
            Toast.push('Ссылки нет')
        else{
        const arr = this.state.data;
        arr.link =''
        this.setState({data:arr})
        Toast.push("Ссылка удалена")
        }
    }

    private attachFile = (fileList: FileList) => {
        const file = fileList[0].name;
        const arr = this.state.data;
        const target = this.state.attachSelect.target!.value;
        if(file === this.state.data.reportFile || file === this.state.data.presentationFile || file === this.state.data.consultantReportFile) 
            Toast.push('Прикрепляйте разные файлы')
        switch(target){
            case 'Отчет': {
                arr.reportFile = file;
                break;
            }
            case 'Презентацию':{
                arr.presentationFile = file;
                break;
            }
            case 'Отзыв консультанта':{
                arr.consultantReportFile = file;
                break
            }
            default:{
                Toast.push('Выберите, что прикрепить')
                console.log('Nothing to attach');
            }
        }
        this.setState({data:arr})
    };

    private downloadFile = (event: React.MouseEvent<HTMLAnchorElement>) => {
        Toast.push('Скачивание файла: '+ event.currentTarget.textContent)
    }

    private deleteFile = () => {
        const arr =this.state.data;
        const target = this.state.deleteSelect.target!.value;
        switch(target){
            case 'Отчет':{
                if(arr.reportFile === '') Toast.push('Отчета нет')
                arr.reportFile ='';
                break;
            }
            case 'Презентацию':{
                if(arr.presentationFile === '') Toast.push('Презентации нет')
                arr.presentationFile= '';
                break;
            }
            case 'Отзыв консультанта':{
                if(arr.consultantReportFile === '') Toast.push('Отзыва консультанта нет')
                arr.consultantReportFile= '';
                break;
            }
            default:{
                Toast.push('Выберите, что удалить')
                console.log('Nothing to delete');
            }
        }
        this.setState({data:arr})
}

    private changeAttachSelect = (newAttachSelect : {}) => {
        this.setState({ attachSelect : newAttachSelect })
    }

    private changeDeleteSelect = (newDeleteSelect : {}) => {
        this.setState({ deleteSelect : newDeleteSelect})
    }

    componentDidMount(){
        this.setState({isLoading:true})
        // setTimeout(() => {
        //     this.setState({
        //         isLoading: false,
        //     })
        // }, 1500)
        this.setState({data : courseWorkData[0], isLoading : false})

    }

    private renderContentBar(){
       return(
            <div className='informationWindow'>
                {!this.state.isLoading? 
                    <div>
                        <Description data={this.state.data}/>
                        <AttachedFiles data = {this.state.data}/>
                        <div className='gapped'>
                            <Gapped gap={20}>

                                <AttachFiles
                                    attachFile = {this.attachFile}
                                    changeAttachSelect = {this.changeAttachSelect}
                                    attachSelect = {this.state.attachSelect}
                                />

                                <DeleteFiles
                                    changeDeleteSelect = {this.changeDeleteSelect}
                                    deleteFile = {this.deleteFile}
                                    deleteSelect = {this.state.deleteSelect}
                                />
                            </Gapped>
                        </div>
                        <InputLink 
                            handleNewLink = {this.handleNewLink} 
                            attachLink = {this.attachLink}
                            deleteLink = {this.deleteLink}
                        />
                        <hr/>
                    </div> 
                : <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>}
            </div>
        )
    }

    render(){
        return this.renderContentBar();
    }
}

export default MyCourseWork