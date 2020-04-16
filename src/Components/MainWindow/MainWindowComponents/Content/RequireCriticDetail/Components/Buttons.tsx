import React, { Component } from 'react'
import Gapped from '@skbkontur/react-ui/Gapped'
import Typography from '@material-ui/core/Typography'
import './Buttons.css'
import Toast from '@skbkontur/react-ui/Toast'

interface Props{

}

interface State{

}

class Buttons extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state={}
    }

    private handleButton(event : React.MouseEvent<HTMLButtonElement>){
        switch(event.currentTarget.value){
            case 'yes': {Toast.push('Выбрано: Буду рецензировать'); break}
            case 'maybe': {Toast.push('Выбрано: Могу рецензировать'); break}
            case 'no': {Toast.push('Выбрано: Не могу рецензировать'); break}
        }
    }

    private renderButtons(){
        return(
            <div style={{marginLeft: '20px'}}>
                <Gapped>
                <button
                    className='requireCriticButton yes'
                    value='yes'
                    onClick={this.handleButton}
                ><Typography variant='button'>Хочу рецензировать</Typography></button>
                <button
                    className='requireCriticButton maybe'
                    value='maybe'
                    onClick={this.handleButton}
                ><Typography variant='button'>Могу рецензировать</Typography></button>
                <button
                    className='requireCriticButton no'
                    value='no'
                    onClick={this.handleButton}
                ><Typography variant='button'>Не могу рецензировать</Typography></button>
                </Gapped>
            </div>
        )
    }

    render(){
        return this.renderButtons();
    }
}

export default Buttons