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
    // token : string
}

interface Idata{
    title?: string,
    teacher?: string,
    teacherContacts?: string,
    deadline?: string,
    description?: string,
    reportFile?: string,
    presentationFile?: string,
    consultantReportFile?: string,
    link?: string,
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

    componentDidMount(){
        this.setState({isLoading:true})
        this.whichData()
        this.setState({isLoading : false})
    }

    private whichData = () => {
        const axios = require('axios').default;
        //-------------------------------
        //запрос данных курсовой по userId
        //-------------------------------
        
        
        //----------------
        return this.setState({data : courseWorkData[0]})
    }

    private handleNewLink = (event : React.ChangeEvent<HTMLInputElement>, value:string) => {
        this.setState({newLink: value})
    }

    private attachLink = () => {
        if(this.state.newLink === '')
            Toast.push('Введите ссылку')
        else{
            //------------------------------------------------------------------------
            //запрос на прикрепление ссылки на курсовую (передаю userId, id, newLink)
            //------------------------------------------------------------------------

            //----------------------------
            const arr = this.state.data;
            arr.link = this.state.newLink;
            this.setState({data:arr})
            //----------------------------
            Toast.push('Ссылка прикреплена');
            this.whichData()
        }
    }

    private deleteLink = () => {
        if(this.state.data.link === '')
            Toast.push('Ссылки нет')
        else{
            //----------------------------------------
            //запрос по userId и id на удаление ссылки
            //----------------------------------------

            //---------------------------
            const arr = this.state.data;
            arr.link =''
            this.setState({data:arr})
            //--------------------------
            Toast.push("Ссылка удалена")
            this.whichData()
        }
    }

    private attachFile = (fileList: FileList) => {
        const filename = fileList[0].name;
        console.log(fileList[0]);
        
        const arr = this.state.data;
        const target = this.state.attachSelect.target!.value;
        switch(target){
            case 'Отчет': {
                //------------------------------------
                const axios = require('axios').default
                let f = new FormData();
                f.append("File",fileList[0])
                axios.post('url', f)
                //-----------------------------------------
                // Передаю файл на сервер (по userId и id)
                //-----------------------------------------

                //---------------------
                arr.reportFile = filename;
                //---------------------
                Toast.push('Отчет прикреплен')
                break;
            }
            case 'Презентацию':{
                //-----------------------------------------
                // Передаю файл на сервер (по userId и id)
                //-----------------------------------------

                //--------------------------
                arr.presentationFile = filename;
                //--------------------------
                Toast.push('Презентация прикреплена')
                break;
            }
            case 'Отзыв консультанта':{
                //-----------------------------------------
                // Передаю файл на сервер (по userId и id)
                //-----------------------------------------

                //------------------------------
                arr.consultantReportFile = filename;
                //------------------------------
                Toast.push('Отзыв консультанта прикреплен')
                break
            }
            default:{
                Toast.push('Выберите, что прикрепить')
            }
        }
        //-----------------------
        this.setState({data:arr})
        //-----------------------
    };

    private deleteFile = () => {
        const arr =this.state.data;
        const target = this.state.deleteSelect.target!.value;
        switch(target){
            case 'Отчет':{
                if(arr.reportFile === '') 
                    Toast.push('Отчета нет')
                else{
                    //----------------------------------------
                    //запрос по userId и id на удаление отчета
                    //----------------------------------------

                    //------------------
                    arr.reportFile = '';
                    //------------------
                    Toast.push('Отчет удален')
                    this.whichData()
                }
                break;
            }
            case 'Презентацию':{
                if(arr.presentationFile === '') 
                    Toast.push('Презентации нет')
                else{
                    //---------------------------------------------
                    //Запрос на удаление презентации по id и userId
                    //---------------------------------------------

                    //------------------------
                    arr.presentationFile= '';
                    //------------------------
                    Toast.push('Презентация удалена')
                    this.whichData()
                }
                break;
            }
            case 'Отзыв консультанта':{
                if(arr.consultantReportFile === '') Toast.push('Отзыва консультанта нет')
                else{
                    //-----------------------------------------------------
                    //Запрос на удаление отзыва консультанта по id и userId
                    //-----------------------------------------------------

                    //----------------------------
                    arr.consultantReportFile= '';
                    //----------------------------
                    Toast.push('Отзыв консультанта удален')
                    this.whichData()
                }
                break;
            }
            default:{
                Toast.push('Выберите, что удалить')
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



    private renderContentBar(){
       return(
            <div className='informationWindow'>
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
        )
    }

    render(){
        return (
            !this.state.isLoading?
                this.renderContentBar()
            : <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
        )
    }
}

export default MyCourseWork