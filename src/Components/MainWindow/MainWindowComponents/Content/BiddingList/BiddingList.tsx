import React from 'react'
import Typography from '@material-ui/core/Typography'
import Gapped from '@skbkontur/react-ui/Gapped'
import './BiddingList.css'
import Button from '@skbkontur/react-ui/Button'
import Edit from '@skbkontur/react-icons/Edit'
import SidePage from '@skbkontur/react-ui/SidePage'
import Toast from '@skbkontur/react-ui/Toast'
import Ok from '@skbkontur/react-icons/Ok'

import biddingList from '../../../../../TestData/Curator/biddingList'
import myCritics from '../../../../../TestData/Curator/CurrentCritics'

interface Idata{
    title?: string,
    id?: number,
    critic?: string,
    criticId?: number,
    department?: string
}

interface ICritic{
    name?: string,
    position?: string,
    id?: number,
    course?: number,
    department?: string
}

interface Props{

}

interface State{
    data : Idata[],
    critics : ICritic[],
    isSidePageOpen?: boolean,
    whichSidePage?: number
}

class BiddingList extends React.Component<Props,State>{
    constructor(props : Props){
        super(props)
        this.state = {
            data : [{}],
            critics : [{}],
            isSidePageOpen: false,
            whichSidePage : 0
        }
    }

    componentDidMount(){
        this.loadingData()
    }

    private loadingData(){
        this.setState({data : biddingList, critics : myCritics})
    }

    private openSidePage = (courseWorkId : number) => {
        this.setState({isSidePageOpen : true, whichSidePage : courseWorkId})
    }

    private closeSidePage = () => {
        this.setState({isSidePageOpen : false})
    }

    private complete(){
        Toast.push('Рецензенты назначены')
    }

    private editBidding = (event : React.MouseEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.value
        const courseWorkId = Number(value.substr(11,value.indexOf('critic')-12))
        const criticId = value.substr(value.indexOf('critic') + 6)
        Toast.push('Курсовой ' + courseWorkId + ' назначен рецензент ' + criticId)
        this.closeSidePage()
        this.loadingData()
    }

    private renderSidePage(courseWorkId : number) {
        let courseWorkTitle: string = ''  // eslint-disable-next-line
        this.state.data.map(item => {
            if(item.id === courseWorkId) courseWorkTitle = item.title!
        })

        return (
          <SidePage onClose={this.closeSidePage} blockBackground>
            <div className='sideTitle'><SidePage.Header><Typography variant='h4'>{courseWorkTitle}</Typography></SidePage.Header></div>
            <SidePage.Body>
                <div style={{marginLeft : '1vw', marginTop : '1vh', marginBottom : '2vh'}}><Typography variant='h5'>Выберите рецензента на эту курсовую</Typography></div>
              {this.state.critics.map(item => {
                  return (
                      <div style={{marginLeft : '3vw', marginTop :'3vh', borderBottom : 'rgb(199, 180, 180) 1px solid'}}>
                        <Gapped>
                            <div style={{minWidth : '10vw'}}><Typography variant='h6'>{item.name}, кафедра {item.department}</Typography></div>
                            <button
                                className='buttonMore'
                                onClick={this.editBidding}
                                value={'editBidding' + courseWorkId + '_critic' + item.id}
                            ><Typography variant='button'>Назначить</Typography></button>
                        </Gapped>
                        
                      </div>
                  )
              })}
            </SidePage.Body>
            <SidePage.Footer panel>
              <Button onClick={this.closeSidePage}>Close</Button>
            </SidePage.Footer>
          </SidePage>
        );
      }

    private renderRejectButton = (courseWorkId : number) => {
        return(
            <div>
                <Button
                    onClick={() => {this.openSidePage(courseWorkId)}}
                    icon={<Edit/>}
                >Переназначить</Button>
            </div>  
        )
    }

    private renderItem(item : Idata){
        return(
            <div className='biddingItem'>
                <Gapped>
                    <div className='biddingTitle'><Typography variant='h6'>{item.title}</Typography></div>
                    <Typography variant='h6'>-</Typography>
                    <div className='biddingCritic'><Typography variant='h6'>{item.critic}</Typography></div>
                    {this.renderRejectButton(item.id!)}
                </Gapped>
            </div>
        )
    }

    private renderList(){
        return(
            <div>
                {this.state.data.map(item => this.renderItem(item))}
                {this.state.isSidePageOpen && this.renderSidePage(this.state.whichSidePage!)}
                <div style={{marginTop : '3vh', marginLeft : '1vw'}}>
                    <Button
                        onClick = {this.complete}
                        use = 'success'
                        icon = {<Ok/>}
                    >Назначить рецензентов</Button>
                </div>
            </div>
        )
    }

    private isEmpty(obj : any) {
        return Object.keys(obj).length === 0;
    }

    private renderEmptyList(){
        return(
            <div style={{textAlign:"center"}}>
                <Typography variant='h5'>Нет результатов биддинга</Typography>
            </div>
        )
    }

    render(){
        return(
            !this.isEmpty(this.state.data[0])?
                this.renderList()
            : this.renderEmptyList()
        )
    }
}

export default BiddingList