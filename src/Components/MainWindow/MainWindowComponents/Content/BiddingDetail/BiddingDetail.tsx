import React, { Component } from 'react'
import Spinner from '@skbkontur/react-ui/Spinner'
import Center from '@skbkontur/react-ui/Center'
import Typography from '@material-ui/core/Typography'
import Description from './Components/Description'
import AttachedFiles from './Components/AttachedFiles'
import Link from '@skbkontur/react-ui/Link'
import Toast from '@skbkontur/react-ui/Toast'
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
    student?: string,
    course?: number,
    criticReview?:string,
    id?: string
}

interface Props{
    data : Idata
}

interface State{
    isLoading?: boolean,
    criticReview?: string
}

class BiddingDetailed extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={
            isLoading : false,
            criticReview : this.props.data.criticReview
        }
    }

    componentDidMount(){
        this.setState({isLoading:true})
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000)
    }

    private attachFile = (fileList: FileList) => {
        const newCriticReview = fileList[0].name;
        this.setState({criticReview : newCriticReview})
        Toast.push('Рецензия прикреплена')
    };

    private downloadFile(){
        Toast.push('Скачивание...')
    }

    private deleteFile = () => {
        this.setState({criticReview : ''})
        Toast.push('Рецензия удалена')
    }


    private renderBiddingDetailed(){
        return(
            <div>
                {!this.state.isLoading?
                    <div>
                        <div style={{marginLeft:'20px'}}><Typography variant='h4'>{this.props.data.student}, {this.props.data.course} курс</Typography></div>
                        <Description data={this.props.data}/>
                        <AttachedFiles data={this.props.data}/>
                        <hr/>
                        {this.state.criticReview !== ''?
                            <div style={{marginLeft:'20px', marginBottom:'10px'}}>
                                <Gapped>
                                    <Typography variant='h5'>Рецензия: {<Link onClick={this.downloadFile} use='success'>{this.state.criticReview}</Link>}</Typography>
                                    <Link use='grayed' onClick={this.deleteFile}>Удалить</Link>
                                </Gapped>
                            </div>    
                    :null}
                <div style={{marginLeft:'20px'}}>
                    <div style={{marginBottom:'10px'}}><Typography variant='h5'>Прикрепить рецензию:</Typography></div>
                    <input 
                        className='inputAttach'  
                        type="file" 
                        onChange={(e) => this.attachFile(e.target.files!)}
                    />
                </div>
                    </div>
                : <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
                }

            </div>
        )
    }

    render(){
        return this.renderBiddingDetailed();
    }
}

export default BiddingDetailed