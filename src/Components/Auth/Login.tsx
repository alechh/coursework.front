import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface ILoginState {
    email: string;
    password: string;
    logged: boolean;
}

interface Props{
    auth () : void
}

export default class Login extends React.Component<Props, ILoginState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            logged: false
        };
    }

    render(): JSX.Element {
        if (this.state.logged) {
            return <p>logged in</p>
        }
        return (
            <div className="container">
                <Typography variant="h6" gutterBottom>Войти</Typography>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        required
                        type="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        name={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <br />
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
                    <Button size="small" variant="contained" color="primary" type="submit">Войти</Button>
                </form>
            </div>
        );
    }

    private handleSubmit = async () => {
        const {email, password} = this.state;
        //-----------------------------
        // login-запрос, получаю токен
        //-----------------------------
        this.props.auth()
    }
}