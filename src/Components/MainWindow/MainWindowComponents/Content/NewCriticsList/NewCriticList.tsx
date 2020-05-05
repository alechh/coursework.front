import React, {Component} from 'react'
import Gapped from '@skbkontur/react-ui/Gapped'
import Typography from '@material-ui/core/Typography'
import Button from '@skbkontur/react-ui/Button'
import Toast from '@skbkontur/react-ui/Toast'
import './NewCriticList.css'
import Ok from '@skbkontur/react-icons/Ok'
import Delete from '@skbkontur/react-icons/Delete'
import Spinner from '@skbkontur/react-ui/Spinner'
import Center from '@skbkontur/react-ui/Center'

import newCritics from '../../../../../TestData/Curator/newCritics'
import currentCritics from '../../../../../TestData/Curator/CurrentCritics'

interface Idata{
    name?: string,
    course?: number,
    department?: string,
    id?: number
}

interface Props{
    type : 'selected' | 'not-selected',
    userId?: number
}

interface State{
    data : Idata[],
    isLoading?: boolean
}

class NewCriticList extends Component<Props, State>{
    constructor(props : Props){
        super(props);
        this.state = {
            data : [{}],
            isLoading : false
        }
    }
    
    componentDidUpdate(prevProps : Props){
        if(prevProps.type !== this.props.type)
            this.componentDidMount()
    }

    componentDidMount(){
        this.setState({isLoading : true})
        this.whichData()
        this.setState({isLoading : false})
    }

    private whichData = () => {
        if(this.props.type === 'not-selected'){
            //----------------------------------------------
            // запрос по userId на данные новых рецензентов
            //----------------------------------------------

            this.setState({data : newCritics})
        }
        else{
            //----------------------------------------------
            // запрос по userId на данные текущих рецензентов
            //----------------------------------------------

            this.setState({data : currentCritics})
        }
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

    private isEmpty(obj : Idata[]) {
        return Object.keys(obj[0]).length === 0;
    }

    private renderEmptyList(){
        return(
            <div style={{textAlign:"center", marginTop: '10vh'}}>
                <Typography variant='h5'>Нет рецензентов</Typography>
            </div>
        )
    }

    render(){
        return(
            !this.state.isLoading?
                !this.isEmpty(this.state.data)?
                    <div className='newCriticList'>
                        {this.state.data.map(item => this.renderItem(item))}
                    </div>
                :   this.renderEmptyList()
            :   <div style={{height : '60vh'}}><Center><Spinner type='big' caption='Загрузка'/></Center></div>
        )
    }
}

export default NewCriticList