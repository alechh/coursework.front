import React, {Component} from "react";
import ServiceTopBar from "./Components/TopBar/ServiceTopBar";
import Menu from './Components/Menu/Menu'
import MainWindow from './Components/MainWindow/MainWindow'
import Footer from './Components/Footer/Footer'
import Toast from '@skbkontur/react-ui/Toast'
import AuthPage from './Components/Auth/AuthPage'

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
    user : IUser,
    logged?: boolean,
    token : string
}


class App extends Component<Props,State> {
    constructor(props : Props){
        super(props);
        this.state = {
            page : 'Главная',
            user : {
                firstName : 'Aleksandr',
                lastName : '',
                isCritic : false,
                role: 'teacher',
                userId : 1
            },
            logged : true,
            token : ''
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
        //-----------------------------------------------
        // Запрос на становление рецензентом или наоборот
        //-----------------------------------------------

        //-----------------------------------------
        let newUserData =  this.state.user
        newUserData.isCritic = !newUserData.isCritic
        this.setState({user : newUserData})
        //------------------------------------------

        this.state.user.isCritic? 
            Toast.push('Теперь Вы - рецензент') 
        :   
            Toast.push('Вы больше не рецензент')
    }

    auth = (user : IUser, token : string) => {
        this.setState({user : user, logged : true, token : token})
    }

    logout = () => {
        this.setState({user : {}, logged : false, token : ''})
    }

    private isAuth(){
        if(!this.state.logged)
            return(
                <AuthPage auth={this.auth}/>
            )
        else
            return(
                <div>
                    <div className='topBar'><ServiceTopBar
                                                logout={this.logout}
                                                firstName={this.state.user.firstName}
                                                lastName={this.state.user.lastName}/></div>
                    <Menu 
                        role={this.state.user.role}
                        page={this.state.page} 
                        changePage={this.changePage} 
                        isCritic={this.state.user.isCritic}
                    />
                    <MainWindow
                        token={this.state.token}
                        role={this.state.user.role}
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
                {this.isAuth()}
            </div>
            <div className='footer'><Footer/></div>
        </div>
        )}
}

export default App;