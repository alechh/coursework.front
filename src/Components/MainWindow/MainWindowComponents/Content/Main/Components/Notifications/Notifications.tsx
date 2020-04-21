import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Gapped from '@skbkontur/react-ui/Gapped'
import './Notifications.css'

interface Idata{
    title?: string,
    id?: number
}

interface Props{
    isCritic?: boolean,
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    role?: string,
    data : Idata[]
}

interface State{

}

class Notifications extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={}
    }


    private renderNotification(item : Idata){
        return(
            <div className='notificationItem'>
                {this.props.isCritic?
                    <div className='bidding'><Gapped>
                        <div style={{minWidth:'30vw'}}><Typography variant='h5'><i>-результат биддинга:</i> {item.title}</Typography></div>
                        <button
                            className='buttonMore'
                            value={'bidding_' + item.id!.toString()}
                            onClick={this.props.changePage}
                        ><Typography variant='button'>Подробнее</Typography></button>
                    </Gapped></div>
                : null}
            </div>
        )
    }

    private renderList(){
        return(
            <div className='notifications'>
                <div style={{marginLeft : '10px', textDecoration:'underline', marginBottom:'10px'}}><Typography variant='h5'>Уведомления</Typography></div>
                {this.props.data.map(item => this.renderNotification(item))}
            </div>
        )
    }

    render(){
        return this.renderList();
    }
}

export default Notifications