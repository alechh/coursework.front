import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Gapped from '@skbkontur/react-ui/Gapped'
import './Notifications.css'

import biddingData from '../../../../../../../TestData/Student/biddingData'

interface Props{
    isCritic?: boolean,
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void
}

interface State{

}

class Notifications extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={}
    }

    private renderNotifications(){
        return(
            <div className='notifications'>
                <div style={{marginLeft : '10px', textDecoration:'underline', marginBottom:'10px'}}><Typography variant='h5'>Уведомления</Typography></div>
                {this.props.isCritic?
                    <div className='bidding'><Gapped>
                        <Typography variant='h5'>-результат биддинга: {biddingData[0].title}</Typography>
                        <button
                            className='more'
                            value={'bidding_'+biddingData[0].id.toString()}
                            onClick={this.props.changePage}
                        ><Typography variant='button'>Подробнее</Typography></button>
                    </Gapped></div>
                : null}

            </div>
        )
    }

    render(){
        return this.renderNotifications();
    }
}

export default Notifications