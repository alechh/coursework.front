import React, {Component} from 'react'
import Gapped from '@skbkontur/react-ui/Gapped'
import Typography from '@material-ui/core/Typography'
import Button from '@skbkontur/react-ui/Button'
import Toast from '@skbkontur/react-ui/Toast'
import './NewCriticList.css'
import Ok from '@skbkontur/react-icons/Ok'
import Delete from '@skbkontur/react-icons/Delete'

import newCritics from '../../../../../TestData/Curator/newCritics'
import currentCritics from '../../../../../TestData/Curator/CurrentCritics'

interface Idata{
    name : string,
    position : string,
    course : number,
    department : string,
    id?: number
}

interface Props{
    type : 'selected' | 'not-selected',
    userId?: number
}

interface State{
}

class NewCriticList extends Component<Props, State>{
    constructor(props : Props){
        super(props);
        this.state = {}
    }

    private renderButton(criticId?: number){
        return(
            <Button
                icon={this.props.type === 'not-selected'? <Ok/> : <Delete/>} 
                use={this.props.type === 'not-selected'? 'success' : 'danger'} 
                onClick={() => {
                    if(this.props.type === 'not-selected'){
                        //----------------------------------------------------
                        //запрос на добавление рецензента по userId и criticId
                        //----------------------------------------------------
                        Toast.push('Рецензент назначен')
                    }
                    else{
                        //----------------------------------------------------
                        //запрос на удаление рецензента по userId и criticId
                        //----------------------------------------------------
                        Toast.push('Рецензент удален')
                    }
                    }
                }
            >
                {this.props.type === 'not-selected'? 'Назначить своим' : 'Отменить назначение'}
            </Button>
        )
    }

    private renderItem(item : Idata){
        return(
            <div className='newCriticListItem'>
                <Gapped>
                    <div style={{minWidth:'350px'}}><Typography variant='h5'>{item.name}, кафедра {item.department}</Typography></div>
                    {this.renderButton(item.id)}
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