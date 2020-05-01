import React, {Component} from "react";
import ServiceTopBar from "./Components/TopBar/ServiceTopBar";
import Menu from './Components/Menu/Menu'
import MainWindow from './Components/MainWindow/MainWindow'
import Footer from './Components/Footer/Footer'
import Toast from '@skbkontur/react-ui/Toast'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Gapped from '@skbkontur/react-ui/Gapped'

import userData from './TestData/userData'
import { Typography } from "@material-ui/core";

interface Props{

}

interface IUser{
    firstName?: string,
    lastName?: string,
    isCritic?: boolean,
    role?: string,
    userId?: number
}

interface State{
    page?: string,
    user : IUser
}


class App extends Component<Props,State> {
    constructor(props : Props){
        super(props);
        this.state = {
            page : 'Вход',
            user : userData
        }
    }
    
    changePage = (event : React.MouseEvent<HTMLButtonElement>) => {
        const newPage = event.currentTarget.value
        switch(this.state.user.role){
            case 'student':{
                if(newPage === 'Мои курсовые')
                    return(this.setState({page:'Активные'}))
                break;
            }
            case 'teacher':{
                if(newPage === 'Мои курсовые')
                    return(this.setState({page : 'Занятые'}))
                break
            }
            case 'curator':{
                if(newPage === 'Рецензенты')
                    return(this.setState({page : 'Новые рецензенты'}))
                else if (newPage === 'Курсовые')
                    return(this.setState({page : 'Занятые темы'}))
                break
            }
        }
        return(this.setState({page:newPage}))
    }

    handleCritic = () => {
        let newUserData =  this.state.user
        newUserData.isCritic = !newUserData.isCritic
        this.setState({user : newUserData})
        this.state.user.isCritic? 
            Toast.push('Теперь Вы - рецензент') 
        :   
            Toast.push('Вы больше не рецензент')
    }

    auth = () => {
        this.setState({page : 'Главная'})
    }

    private isAuth(){
        if(this.state.page === 'Вход')
            return(
                <div style={{background:'#F5F5F5',marginTop:'10vh', paddingTop:'1vh', paddingBottom:'5vh', border:'1px solid rgb(199, 180, 180)'}}>
                    <div style={{marginLeft : 'calc(17vh + 15vw)'}}><Typography variant='h4'>HwProj Course Work - сервис курсовых работ</Typography></div>
                    <div style={{marginLeft:'calc(17vh + 15vw)', marginTop:'5vh'}}>
                        <Gapped gap={300}>
                            <Login auth={this.auth}/>
                            <Register auth={this.auth}/>
                        </Gapped>
                    </div>
                </div>
            )
        else
            return(
                <div>
                    <Menu 
                        role={userData.role}
                        page={this.state.page} 
                        changePage={this.changePage} 
                        isCritic={this.state.user.isCritic}
                    />
                    <MainWindow
                        role={userData.role}
                        page={this.state.page} 
                        changePage={this.changePage} 
                        handleCritic = {this.handleCritic}
                        isCritic = {this.state.user.isCritic}
                        userId = {this.state.user.userId}
                    />
                </div>
            )
    }

    render() {
        return (
        <div className='page'>
            <div className='mainContent'>
                <div className='topBar'><ServiceTopBar/></div>
                {this.isAuth()}
            </div>
            <div className='footer'><Footer/></div>
        </div>
        )}
}

export default App;