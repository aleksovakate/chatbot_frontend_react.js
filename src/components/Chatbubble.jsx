import React from 'react'


class Chatbubble extends React.Component {
    render() {
        return(
            <li key={this.props.id} className={this.props.cls}>
                <img className="chat-username" alt="user-icon" src={this.props.icon}/>
                <div className="chat-msg">
                    {this.props.who}:<br/>
                    <hr/>
                    {this.props.msg.body}
                </div>
            </li>
        );
    }
}

export default Chatbubble;