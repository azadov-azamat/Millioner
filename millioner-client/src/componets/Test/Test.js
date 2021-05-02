import React, {Component} from 'react';

class Test extends Component {

    render() {
        return <div ref={(ref) => this.myRef = ref}>Element to scroll to</div>
    }

    executeScroll = () => this.myRef.scrollIntoView()
    // run this method to execute scrolling.
}

export default Test;
// import {Component} from "react";
//
// class Test extends Component{
// constructor() {
//     super();
//     this.state = { time: {}, seconds: 5 };
//     this.timer = 0;
//     this.startTimer = this.startTimer.bind(this);
//     this.countDown = this.countDown.bind(this);
// }
//
// secondsToTime(secs){
//     let hours = Math.floor(secs / (60 * 60));
//
//     let divisor_for_minutes = secs % (60 * 60);
//     let minutes = Math.floor(divisor_for_minutes / 60);
//
//     let divisor_for_seconds = divisor_for_minutes % 60;
//     let seconds = Math.ceil(divisor_for_seconds);
//
//     let obj = {
//         "h": hours,
//         "m": minutes,
//         "s": seconds
//     };
//     return obj;
// }
//
// componentDidMount() {
//     let timeLeftVar = this.secondsToTime(this.state.seconds);
//     this.setState({ time: timeLeftVar });
// }
//
// startTimer() {
//     if (this.timer == 0 && this.state.seconds > 0) {
//         this.timer = setInterval(this.countDown, 1000);
//     }
// }
//
// countDown() {
//     // Remove one second, set state so a re-render happens.
//     let seconds = this.state.seconds - 1;
//     this.setState({
//         time: this.secondsToTime(seconds),
//         seconds: seconds,
//     });
//
//     // Check if we're at zero.
//     if (seconds == 0) {
//         clearInterval(this.timer);
//     }
// }
//
// render() {
//     return(
//         <div>
//             <button onClick={this.startTimer}>Start</button>
//             m: {this.state.time.m} s: {this.state.time.s}
//         </div>
//     );
// }
// }
// export default Test;
// // import React, { useState } from 'react';
// // import ReactDOM from 'react-dom';
// // // import './style.css';
// //
// // function Test() {
// //     const [km, setKm] = useState(0);
// //
// //     function handleChange(e) {
// //         setKm(e.target.value);
// //     }
// //     function convert(km) {
// //         return (km/1.609).toFixed(2);
// //     }
// //
// //     return <div>
// //         <input type="text" value={km} onChange={handleChange} />
// //         <p> {km} km is {convert(km)} miles </p>
// //     </div>;
// // }
// //
// // const el = <Test />;
// // ReactDOM.render(
// //     el,
// //     document.getElementById('root')
// // );
// // import React, {Component} from 'react';
// // import {Container, Row, Col} from 'reactstrap';
// //
// // class Test extends Component {
// //
// //     render() {
// //         var seyL5u = document.createElement("root");
// //         seyL5u.type = "text/javascript";
// //         var seyL5us = (location.protocol.indexOf("https") === 0 ? "https" : "http") + "://image.providesupport.com/js/0wltq5gwo2xy81uda8d5qckjzv/safe-standard.js?ps_h=yL5u&ps_t=" + new Date().getTime();
// //         setTimeout("seyL5u.src=seyL5us;document.getElementById('sdyL5u').appendChild(seyL5u)", 1)
// //
// //         return (
// //             <>
// //                 <div>
// //                     <Col md={{size: 'auto', offset: 1}}>.col-sm-auto .offset-sm-1</Col>
// //                     <Col md={{size: 'auto', offset: 1,}}>.col-sm-auto .offset-sm-1</Col>
// //                 </div>
// //                 <div>
// //                     <Col md={6}>.col-sm-auto .offset-sm-1</Col>
// //                     <Col md={6} className="offset-5" itemID={6}>.col-sm-auto .offset-sm-1</Col>
// //                 </div>
// //                 <div>
// //                     <div className="col-6">
// //                         <div className="row">
// //                             aushj
// //                         </div>
// //                         <div className="row">
// //                             aushj
// //                         </div>
// //                     </div>
// //                     <div className="col-6 text-right">saecf</div>
// //                     <div id="ciyL5u" style="z-index:100;position:fixed">
// //
// //                     </div>
// //                     <div id="scyL5u" style="display:inline">
// //
// //                     </div>
// //                     <div id="sdyL5u" style="display:none">
// //                         <noscript>
// //                             <div style="display:inline">
// //                                 <a href="https://vm.providesupport.com/0wltq5gwo2xy81uda8d5qckjzv">Online Chat</a>
// //                             </div>
// //                         </noscript>
// //                     </div>
// //                 </div>
// //             </>
// //         )
// //     }
// // }
// //
// //
// // export default Test;