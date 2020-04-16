import React, { Component } from 'react'
import './NewWorks.css'
import Typography from '@material-ui/core/Typography'

interface Props{

}

interface State{

}

class NewWorks extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={}
    }

    private renderNewWorkd(){
        return(
            <div className='newWorks'>
                <div style={{marginLeft:'10px',textDecoration:'underline'}}><Typography variant='h5'>Новые курсовые</Typography></div>
            </div>
        )
    }

    render(){
        return this.renderNewWorkd();
    }
}

export default NewWorks