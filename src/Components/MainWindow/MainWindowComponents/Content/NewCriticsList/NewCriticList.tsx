import React, {Component} from 'react'
import Gapped from '@skbkontur/react-ui/Gapped'
import Typography from '@material-ui/core/Typography'
import Button from '@skbkontur/react-ui/Button'
import Toast from '@skbkontur/react-ui/Toast'
import './NewCriticList.css'

import newCritics from '../../../../../TestData/Curator/newCritics'
import currentCritics from '../../../../../TestData/Curator/CurrentCritics'

interface Idata{
    name : string,
    position : string,
    course : number,
    department : string
}

interface Props{
    type : 'selected' | 'not-selected'
}

interface State{

}

class NewCriticList extends Component<Props, State>{
    constructor(props : Props){
        super(props);
        this.state = {}
    }

    private handleSelect(){
        Toast.push('Рецензент назначен')
    }

    private handleDelete(){
        Toast.push('Назначение отменено')
    }

    private renderItem(item : Idata){
        return(
            <div className='newCriticListItem'>
                <Gapped>
                    <div style={{minWidth:'350px'}}><Typography variant='h5'>{item.name}, кафедра {item.department}</Typography></div>
                    <Button use={this.props.type === 'not-selected'? 'success' : 'danger'} onClick={this.props.type === 'not-selected'? this.handleSelect : this.handleDelete}>{this.props.type === 'not-selected'? 'Назначить своим' : 'Отменить назначение'}</Button>
                </Gapped>
            </div>
        )
    }

    render(){
        return(
            <div className='newCriticList'>
                {this.props.type === 'not-selected'? 
                    newCritics.map(item => this.renderItem(item))
                :   currentCritics.map(item => this.renderItem(item))
            }


            </div>
        )
    }
}

export default NewCriticList