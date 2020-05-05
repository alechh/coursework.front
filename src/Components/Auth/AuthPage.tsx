import React from 'react'
import Login from './Login'
import Register from './Register'
import Typography from '@material-ui/core/Typography'
import Switcher from '@skbkontur/react-ui/Switcher' 
import Center from '@skbkontur/react-ui/Center'
import './AuthPage.css'

interface Props{
    auth (user : IUser, token : string) : void
}

interface IUser{
    firstName?: string,
    lastName?: string,
    isCritic?: boolean,
    role?: string,
    userId?: number
}

interface State{
    switcher?: string
}

export default class AuthPage extends React.Component<Props, State>{
    constructor(props : Props){
        super(props)
        this.state = {
            switcher: 'Войти'
        }
    }

    render(){
        return(
            <div>
                <div className='authTitle'>
                    <Typography variant='h5'>HwProj Course Work - сервис курсовых работ</Typography>
                </div>
                <div>
                    <Center>
                        <Switcher
                            size='small'
                            value={this.state.switcher}
                            items={['Войти', 'Зарегистрироваться']}
                            onChange={(e: {target: {value:string}}) => {this.setState({switcher : e.target.value})}}
                        />
                        {this.state.switcher === 'Войти'?
                            <div className='authMain'><Login auth={this.props.auth}/></div>
                        :   <div className='authMain'><Register auth={this.props.auth}/></div>}
                    </Center>
                </div>

            </div>
    )}
}