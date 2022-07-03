import React from 'react'
import Paimon from '../chatbot_resources/paimon.webp'


class Paimonbtn extends React.Component{
    render() {
            return(
                <img onClick={this.props.showFunc} src={Paimon} alt={Paimon} className="paimon"/>
            );
    }
}

export default  Paimonbtn;
