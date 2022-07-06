import React from 'react'
import HomeBG from '../chatbot_resources/background-video.mp4';
import Paimonbtn from "./Paimonbtn";


class Landing extends React.Component {
    render() {
        return (
            <div className='wrapper'>
                <div className='video-container'>
                    <video src={HomeBG} autoPlay loop muted/>
                    <div className="content-landing">
                        <div className="centerPaimon">
                            <Paimonbtn showFunc={this.props.showFunc}/>
                            <h3>CLICK ON PAIMON TO START</h3>
                        </div>
                        <div className='disclaimer'>
                            THIS IS A FAN-MADE SITE FOR A SCHOOL PROJECT. NO INTENDED CLAIMS TO ANY RIGHTS BELONGING TO
                            THE
                            ORIGINAL ARTIST OF THE ARTWORKS.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;