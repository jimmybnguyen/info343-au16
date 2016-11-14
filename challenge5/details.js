class Details extends React.Component {
    render() {
        return(
            <div>
                <h2>Details</h2>
            
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Low</td>
                            <td>{this.props.tempLow}</td>
                        </tr>
                        <tr>
                            <td>High</td>
                            <td>{this.props.tempHigh}</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{this.props.humidity}</td>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td>{this.props.pressure}</td>
                        </tr>
                        <tr>
                            <td>Sunrise</td>
                            <td>{this.props.sunrise}</td>
                        </tr>
                        <tr>
                            <td>Sunset</td>
                            <td>{this.props.sunset}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}