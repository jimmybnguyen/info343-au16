class Result extends React.Component {
    render() {
        return(
            <div>
                <div>
                    <h2>{this.props.name}</h2>

                    <button className ="btn btn-default" onClick={(e) => this.save(e)}>Save</button>
                </div>
                <img src={this.props.icon} />
            
                <h3>{this.props.temp}</h3>
            
                <p>{this.props.main} {this.props.description}</p>
            
            </div>
        );
    }

    save(e) {
        this.props.onSave(this.props.name);
    }    
    
}