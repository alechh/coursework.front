import React, { Component } from 'react'
import './MainWindow.css'
import Title from './MainWindowComponents/Title/Title'
import Content from './MainWindowComponents/Content/Content'


interface Props{
    page?:string,
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    handleCritic() : void,
    isCritic?: boolean,
    role?: string,
    userId?: number,
    token: string
}

interface State{
}

class MainWindow extends Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state = {
        }
    }

    private main() {
        return(
            <div className='mainWindow'>
                <Title 
                    page={this.props.page}
                    role={this.props.role}    
                />
                <Content 
                    token={this.props.token}
                    role = {this.props.role}
                    page = {this.props.page} 
                    changePage = {this.props.changePage}
                    handleCritic = {this.props.handleCritic}
                    isCritic = {this.props.isCritic}
                    userId = {this.props.userId}    
                />
            </div>
        )
    }

    render() {
        return this.main();
    }
}

export default MainWindow