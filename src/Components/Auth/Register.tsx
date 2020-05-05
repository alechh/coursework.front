import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Gapped from '@skbkontur/react-ui/Gapped'

interface RegisterViewModel{
    name : string,
    surname : string,
    email : string,
    password : string,
    passwordConfirm : string
}

interface IUser{
    firstName?: string,
    lastName?: string,
    isCritic?: boolean,
    role?: string,
    userId?: number
}

interface IRegisterState {
    registerData: RegisterViewModel;
    logged: boolean;
}

interface Props{
    auth(user : IUser, token : string) : void
}

export default class Register extends React.Component<Props, IRegisterState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            registerData: {
                name: "",
                surname: "",
                email: "",
                password: "",
                passwordConfirm: "",
            },
            logged:false
        };
    }

    public render(): JSX.Element {
        const {registerData, logged} = this.state;

        if (logged) {
            return <p>logged in</p>
        }

        return (
            <div className="container">
                <Typography variant="h6" gutterBottom>Регистрация</Typography>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        required
                        label="Имя"
                        variant="outlined"
                        margin="normal"
                        name={registerData.name}
                        onChange={e => this.setState({ registerData: {...this.state.registerData, name: e.target.value}})}
                    />
                    <br />
                    <TextField
                        required
                        label="Фамилия"
                        variant="outlined"
                        margin="normal"
                        name={registerData.surname}
                        onChange={e => this.setState({ registerData: {...this.state.registerData, surname: e.target.value}})}
                    />
                    <br />
                    <TextField
                        required
                        type="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        name={registerData.email}
                        onChange={e => this.setState({ registerData: {...this.state.registerData, email: e.target.value}})}
                    />
                    <br />
                    <Gapped><TextField
                        required
                        type="password"
                        label="Пароль"
                        variant="outlined"
                        margin="normal"
                        value={registerData.password}
                        onChange={e => this.setState({ registerData: {...this.state.registerData, password: e.target.value}})}
                    />
                    {/* <br /> */}
                    <TextField
                        required
                        type="password"
                        label="Подтвердите пароль"
                        variant="outlined"
                        margin="normal"
                        value={registerData.passwordConfirm}
                        onChange={e => this.setState({ registerData: {...this.state.registerData, passwordConfirm: e.target.value}})}
                    /></Gapped>
                    <br />
                    <Button size="small" variant="contained" color="primary" type="submit">Зарегистрироваться</Button>
                </form>
            </div>
        );
    }

    private handleSubmit = async () => {
        const {email, password} = this.state.registerData;

        
        //this.props.auth()
    }
}