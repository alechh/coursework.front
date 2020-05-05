import React, { Component } from 'react'
import Spinner from '@skbkontur/react-ui/Spinner'
import Center from '@skbkontur/react-ui/Center'
import Typography from '@material-ui/core/Typography'
import Description from './Components/Description'
import AttachedFiles from './Components/AttachedFiles'
import Link from '@skbkontur/react-ui/Link'
import Toast from '@skbkontur/react-ui/Toast'
import Gapped from '@skbkontur/react-ui/Gapped'
import axios from 'axios'

//student
import biddingData from '../../../../../TestData/Student/biddingData'

//teacher
import teacherBidding from '../../../../../TestData/Teacher/biddingData'

interface Idata{
    title?: string,
    teacher?: string,
    teacherContacts?: string,
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
    criticReview?:string,
    id?: number
}

interface Props{
    page?: string,
    role?: string
}

interface State{
    isLoading?: boolean,
    data : Idata
}

class BiddingDetailed extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isLoading : false,
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
            case 'student':{
                const id = Number(this.props.page!.substr(8))
                const axios = require('axios').default
                axios.get('../api/course_works/' + id.toString())
                .then((response : Idata) => {
                    this.setState({data : response})
                })
                break

                //------------------------------------------------
                // let data : Idata = {} // eslint-disable-next-line
                // biddingData.map(item => {
                //     if(item.id === id) return (data = item)
                // })
                //this.setState({data : data})
                //------------------------------------------------
            }
            case 'teacher':{
                const id = Number(this.props.page!.substr(8))
                const axios = require('axios').default
                axios.get('../api/course_works/' + id.toString())
                .then((response : Idata) => {
                    this.setState({data : response})
                })
                break

                //------------------------------------------------
                // let data : Idata = {} // eslint-disable-next-line
                // teacherBidding.map(item => {
                //     if(item.id === id) data = item
                // })
                // this.setState({data : data})
                //------------------------------------------------
            }
        }
    }

    private attachFile = (fileList: FileList) => {
        const axios = require('axios').default
        let f = new FormData();
        f.append("File",fileList[0])
        axios.post('url', f)
        //Прикрепление рецензии

        //---------------------------------------
        const newCriticReview = fileList[0].name;
        let newData = this.state.data
        newData.criticReview = newCriticReview
        this.setState({data : newData})
        //---------------------------------------

        Toast.push('Рецензия прикреплена')
    };

    private downloadFile(){
        //Скачивание рецензии

        //-------------------------
        Toast.push('Скачивание рецензии')
        //-------------------------
    }

    private deleteFile = () => {
        //Удаление рецензии

        //-----------------------------
        let newData = this.state.data
        newData.criticReview = ''
        this.setState({data : newData})
        //-----------------------------
        
        Toast.push('Рецензия удалена')
    }


    private renderBiddingDetailed(){
        return(
            <div>
                <div style={{marginLeft:'20px'}}><Typography variant='h4'>{this.state.data.student}, {this.state.data.course} курс</Typography></div>
                <Description data={this.state.data}/>
                <AttachedFiles data={this.state.data}/>
                <hr/>
                {this.state.data.criticReview !== ''?
                    <div style={{marginLeft:'20px', marginBottom:'10px'}}>
                        <Gapped>
                            <Typography variant='h5'>Рецензия: {<Link onClick={this.downloadFile} use='success'>{this.state.data.criticReview}</Link>}</Typography>
                            <Link use='grayed' onClick={this.deleteFile}>Удалить</Link>
                        </Gapped>
                    </div>    
                :null}
                <div style={{marginLeft:'20px'}}>
                    <Gapped>
                        <Typography variant='h5'>Прикрепить рецензию:</Typography>
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
        return (
            !this.state.isLoading?
                this.renderBiddingDetailed()
            :   <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
        )
    }
}

export default BiddingDetailed