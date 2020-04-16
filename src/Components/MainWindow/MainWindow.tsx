import React, { Component } from 'react'
import './MainWindow.css'
import Title from './MainWindowComponents/Title/Title'
import Content from './MainWindowComponents/Content/Content'


interface Props{
    page?:string,
    changePage(event : React.MouseEvent<HTMLButtonElement>) : void,
    handleCritic() : void,
    isCritic?: boolean,
    role?: string
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
                <Title page={this.props.page}/>
                <Content 
                    role = {this.props.role}
                    page = {this.props.page} 
                    changePage = {this.props.changePage}
                    handleCritic = {this.props.handleCritic}
                    isCritic = {this.props.isCritic}    
                />
            </div>
        )
    }

    render() {
        return this.main();
    }
}

export default MainWindow