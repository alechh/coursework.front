import React from 'react'
import Link from '@skbkontur/react-ui/Link'
import Toast from '@skbkontur/react-ui/Toast'
import 'typeface-roboto';

interface Props{
    data : {
        title?: string,
        teacher?: string,
        deadline?: string,
        scienceArea?: string,
        description?: string,
        reportFile?: string,
        presentationFile?: string,
        consultantReportFile?: string,
        link?: string,
    }
}

class AttachedFiles extends React.Component<Props>{

    private downloadFile = () => {
        Toast.push('Скачивание...')
    }

    private openLink = () => {
        Toast.push('Открываю ссылку...')
    }

    render(){
        return(
        <div className='attached'>
            {this.props.data.reportFile !== ''? <div><span>Отчет: </span><Link use='success'onClick={this.downloadFile}>{this.props.data.reportFile}</Link></div> : null }
            {this.props.data.presentationFile !== ''? <div><span>Презентация: </span> <Link use='success'onClick={this.downloadFile}>{this.props.data.presentationFile}</Link></div> : null}
            {this.props.data.consultantReportFile !== ''? <div><span>Отзыв консультанта: </span><Link use='success'onClick={this.downloadFile}>{this.props.data.consultantReportFile}</Link></div> : null}
            {this.props.data.link !== ''? <div><span>Ссылка: </span><Link use='success'onClick={this.openLink}>{this.props.data.link}</Link></div> : null}
            
        </div>
        )
    }
}

export default AttachedFiles