class Result extends React.Component {
    render() {
        return(
            <div>
                <h2>{this.props.name}</h2>
            
                <div>
                    <img src={this.props.icon} />
                </div>
            
                <h3>{this.props.temp}</h3>
            
                <p>{this.props.main} {this.props.description}</p>
            
                <button onClick={(e) => this.save(e)}>Save</button>
            </div>
        );
    }

    save(e) {
        this.props.onSave(this.props.name);
    }    
    
}