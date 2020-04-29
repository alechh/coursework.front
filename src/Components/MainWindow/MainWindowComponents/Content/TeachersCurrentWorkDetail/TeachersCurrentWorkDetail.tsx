import React, { Component } from 'react'
import Spinner from '@skbkontur/react-ui/Spinner'
import Center from '@skbkontur/react-ui/Center'
import Typography from '@material-ui/core/Typography'
import Description from './Components/Description'
import AttachedFiles from './Components/AttachedFiles'
import Link from '@skbkontur/react-ui/Link'
import Toast from '@skbkontur/react-ui/Toast'
import Gapped from '@skbkontur/react-ui/Gapped'

//teacher
import teacherCurrentWorks from '../../../../../TestData/Teacher/currentWorks'

//curator
import curatorCurrentWorks from '../../../../../TestData/Curator/myCurrentWorks'

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
    student?: string,
    course?: number,
    review?: string
    criticReview?:string,
    id?: number
}

interface Props{
    page?: string,
    role?: string,
    userId?: number
}

interface State{
    isLoading?: boolean,
    review?: string,
    data : Idata
}

class BiddingDetailed extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isLoading : false,
            review: '',
            data : {}
        }
    }

    componentDidMount(){
        this.setState({isLoading:true})
        this.whichData()
        this.setState({isLoading : false})
    }

    private whichData = () => {
        switch(this.props.role){
            case 'teacher':{
                const id = Number(this.props.page!.substr(8))
                //--------------------------------------------
                // Запрос по userId и id на данные по курсовой
                //--------------------------------------------

                //-------------------------------------------------
                let data : Idata = {} // eslint-disable-next-line
                teacherCurrentWorks.map(item => {
                    if(item.id === id) return (data = item)
                })
                //--------------------------------------------------

                this.setState({data : data, review : data.review})
                break
            }
            case 'curator':{
                const id = Number(this.props.page!.substr(12))
                //--------------------------------------------
                // Запрос по userId и id на данные по курсовой
                //--------------------------------------------

                //-------------------------------------------------
                let data : Idata = {} // eslint-disable-next-line
                curatorCurrentWorks.map(item => {
                    if(item.id === id) return (data = item)
                })
                //-------------------------------------------------

                this.setState({data : data, review : data.review})
            }
        }
    }

    private attachFile = (fileList: FileList) => {
        //------------------------------------------
        // Передача файла на сервер по userId и id
        //------------------------------------------

        //----------------------------------
        const newReview = fileList[0].name;
        this.setState({review : newReview})
        //----------------------------------

        Toast.push('Отзыв прикреплен')
    };

    private downloadFile(){
        //------------------------------------------------------------
        // Запрос по id на скачивание отзыва научника по userId? и id
        //------------------------------------------------------------

        Toast.push('Скачивание...')
    }

    private deleteFile = () => {
        //----------------------------------------------------
        //  Запрос на удаление отзыва научника по userId? и id
        //----------------------------------------------------
        
        //--------------------------
        this.setState({review : ''})
        //--------------------------

        Toast.push('Отзыв удален')
    }


    private renderCurrentWorkDetail(){
        return(
            <div>
                <div style={{marginLeft:'20px'}}><Typography variant='h4'>{this.state.data.student}, {this.state.data.course} курс</Typography></div>
                <Description data={this.state.data}/>
                <AttachedFiles userId={this.props.userId} data={this.state.data}/>
                <hr/>
                {this.state.review !== ''?
                    <div style={{marginLeft:'20px', marginBottom:'10px'}}>
                        <Gapped>
                            <Typography variant='h5'>Отзыв: {<Link onClick={this.downloadFile} use='success'>{this.state.review}</Link>}</Typography>
                            <Link use='grayed' onClick={this.deleteFile}>Удалить</Link>
                        </Gapped>
                    </div>    
                :null}
                <div style={{marginLeft:'20px'}}>
                    <Gapped>
                        <Typography variant='h5'>Прикрепить отзыв:</Typography>
                        <input 
                            className='inputAttach'  
                            type="file" 
                            onChange={(e) => this.attachFile(e.target.files!)}
                        /> 
                    </Gapped>
                </div>
            </div>
        )
    }

    render(){
        return(
            !this.state.isLoading?
                this.renderCurrentWorkDetail()
            :   <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
        )
    }
}

export default BiddingDetailed