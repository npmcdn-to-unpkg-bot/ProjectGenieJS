/// <reference path="../typings/react-global.d.ts"/>
/// <reference path="../typings/chart.d.ts"/>

interface MessageComponentProps {
    message: Message
    key? : any
}

class MessageComponent extends React.Component<MessageComponentProps, {}>{
    render() {

        var containerStyle = {
            maxWidth: "250px",
            background: this.props.message.sendFromUser ? "rgba(0,0,0,0.1)" : State.getThread(State.currentThread).services[0].color,
            margin: "10px",
            padding: "10px",
            borderRadius: "10px",
            display: "inline-block",

            cursor: "default",
            color: this.props.message.sendFromUser ? "black" : "white",
            marginLeft: "20px", marginRight: "20px",
            textAlign:"left"
        };
        return <div style={{ textAlign: this.props.message.sendFromUser ? "right":"left" }}>
                <div style={containerStyle} >
                    {this.props.message.data}
                </div>
             </div>
    }
}

interface ImageMessageProps {
    message: Message
    key?: any
}
class ImageMessage extends React.Component<MessageComponentProps, {}>{
    render() {

        var containerStyle = {
            width: "250px",
            margin: "20px",
            borderRadius: "10px",
            overflow:"hidden",
            display: "block",
            cursor: "default",
            backgroundImage: "url(" + this.props.message.data.url + ")",
            backgroundSize: "cover",
            height: "250px",
            backgroundPosition: "center"
            
        };
        return <div style={containerStyle} >
                    
               </div>
    }
}

interface URLMessageProps {
    message: Message
    key?: any
}
class URLMessage extends React.Component<MessageComponentProps, {}>{
    render() {

        var containerStyle = {
            maxWidth: "250px",
            margin: "20px",
            borderRadius: "10px",
            overflow: "hidden",
            display: "block",
            background: State.getColor(),
            color: "white",
            cursor: "pointer"

        };
        return <div style={containerStyle} >
                <a style={{display:"block",color:"white", margin: "10px" }} href={this.props.message.data.url}>{this.props.message.data.url}</a>
                <div style={{background:"rgba(0,0,0,0.1)",padding:"10px"}}>
                    {this.props.message.data.text}
                </div>
               </div>
    }
}



interface ChartMessageProps {
    message: Message
    key?: any
}
class ChartMessage extends React.Component<MessageComponentProps, {}>{
    chartDiv : any
    render() {

        var containerStyle = {

            padding: "20px",
            borderRadius: "10px",
            overflow: "hidden",
            display: "inline-block",
            cursor: "default",
            backgroundImage: "url(" + this.props.message.data.url + ")",
            backgroundSize: "cover",
            height: "250px",
            backgroundPosition: "center"

        };
        return <div  style={containerStyle} >
                    <canvas ref={(ref) => this.chartDiv = ref} width="310px" height="210px"></canvas>
                </div>
    }

    componentDidMount() {
        var data = {
            labels: this.props.message.data.labels,
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: State.getColor(),
                    strokeColor: "rgba(0,0,0,0.3)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: this.props.message.data.data
                }
            ]
        };

        var myBarChart = new Chart(this.chartDiv.getContext("2d")).Bar(data, {
            animation: false,
            maintainAspectRatio: true,
            barStrokeWidth:1
        });
    }
    

}




interface ThreadComponentProps {
    thread: Thread
    onClick : Function
    index : number
    key?: any
    selected : boolean
}
class ThreadComponent extends React.Component<ThreadComponentProps, {}>{
    render() {
        var containerStyle = {
            cursor:"pointer",
            paddingBottom: "10px",
            paddingLeft: "10px",
            borderTop:"1px solid transparent",
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            color: this.props.selected ? State.getColor() : "black",
            height:"90px"
        };
        var circleStyle = {
            width: "70px", height: "70px",
            margin: "10px",
            borderRadius: "100%",
            border: "1px solid " + (this.props.selected ? State.getColor() : "lightgray"),
            position: "absolute",
            backgroundImage: "url(images/" + this.props.thread.services[0].name + ".png)",
            backgroundSize: "contain",
            backgroundPosition:"center"
        };
        return <div onClick={this.divClicked} style={containerStyle} >
               <div style={circleStyle} ></div>
               <h1 style={{marginLeft:"90px", fontWeight: "200", fontSize: "15pt" ,marginBottom:"5px"}}>{this.props.thread.services[0].name}</h1>
               <h2 style={{ marginLeft: "90px", fontWeight: "200", fontSize: "13pt",marginTop:"0px" }}>This is the last message</h2>
            </div>
    }

    divClicked = () => {
        this.props.onClick(this.props.index);
    }
}