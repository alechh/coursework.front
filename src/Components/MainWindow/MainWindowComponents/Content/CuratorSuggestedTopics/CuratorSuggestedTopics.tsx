import React from 'react'
import Select from '@skbkontur/react-ui/Select'

interface Props{

}

interface selectType{
    target?: {value?: string}
}

interface State{
    whichTopics?: selectType
}

class CuratorSuggestedTopics extends React.Component<Props,State>{
    constructor(props : Props){
        super(props)
        this.state = {
            whichTopics : {target : {value : 'Занятые темы'}}
        }
    }

    private handleSelectChange = (newItem : {}) => {
        return (this.setState({whichTopics : newItem}))
    }

    private renderSelect(){
        return(
            <div style={{marginTop:'-10px'}}>
                <Select
                    items={['Занятые темы', 'Свободные темы']}
                    value={this.state.whichTopics!.target!.value}
                    onChange={this.handleSelectChange}
                />
            </div>

        )
    }

    render(){
        return(
            <div style={{marginLeft:'1vw'}}>
                {this.renderSelect()}
                {this.state.whichTopics?.target!.value === 'Занятые темы'?
                <p>Занято</p>
                : <p>Свободно</p>}
            </div>
        )
    }
}

export default CuratorSuggestedTopics