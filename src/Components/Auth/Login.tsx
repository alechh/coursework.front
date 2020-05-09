import React from "react";
import jwt_decode from "jwt-decode";
import TextField from "@material-ui/core/TextField";
import Button from "@skbkontur/react-ui/Button";
import Typography from "@material-ui/core/Typography";
import Modal from '@skbkontur/react-ui/Modal'
import Ok from '@skbkontur/react-icons/Ok'
import Delete from '@skbkontur/react-icons/Delete'
import Gapped from '@skbkontur/react-ui/Gapped'

interface State {
    email: string;
    password: string;
    needMoreInformation: boolean,
    user : IUser,
    token : string
}

interface IUser{
    firstName?: string,
    lastName?: string,
    isCritic?: boolean,
    role?: string,
    userId?: number
}

interface Props{
    auth (user : IUser, token : string) : void
}

export default class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            needMoreInformation : false,
            user : {},
            token : ''
        };
    }

    private renderModal = () => {
        return (
          <Modal onClose={this.closeModal}>
            <Modal.Header>Заполните необходимую информацию</Modal.Header>
            <Modal.Body>
                <Typography variant='h6'>Здесь будет ввод необходимой инфы</Typography>
            </Modal.Body>
            <Modal.Footer>
                <Gapped>
                    <Button icon={<Ok/>} use="success" onClick={this.afterModalAuth}>Отправить</Button>
                    <Button icon={<Delete/>} use="danger" onClick={this.closeModal}>Закрыть</Button>
                </Gapped>
            </Modal.Footer>
          </Modal>
        );
    }

    private afterModalAuth = () => {
        //---------------------------------------
        // Запрос на добавление недостоющей инфы
        //---------------------------------------

        this.props.auth(this.state.user, this.state.token)
    }

    private closeModal = () => {
        this.setState({needMoreInformation : false})
    }

    private handleSubmit = () => {
        //-----------------------------
        // login-запрос, получаю токен
        //-----------------------------
        
        let TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        //let user : {} = jwt_decode(token);
        let USER = {
            firstName : 'Aleksandr',
            lastName : '',
            isCritic : false,
            role: 'student',
            userId : 1
        }

        //если какой-то информации не будет хватать
        if(USER.lastName === '')
            return(this.setState({user : USER, token : TOKEN, needMoreInformation : true}))
        else 
            this.props.auth(USER,TOKEN)
    }

    render(): JSX.Element {
        return (
            <div className="container">
                <Typography variant="h6" gutterBottom>Войти</Typography>
                {this.state.needMoreInformation && this.renderModal()}
                <div>
                    <TextField
                        required
                        type="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        name={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                </div>
                <TextField
                    required
                    type="password"
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value})}
                />
                <br />
                <Button size="small" use="primary" onClick={this.handleSubmit}>Войти</Button>
            </div>
        );
    }
}