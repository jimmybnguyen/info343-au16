class Search extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            alert: false,
            alertText: ""
        };
    }
    render() {
        return(
            <div>
                <form onSubmit={(e) => this.onSearch(e)}>
                    <input type="text" ref="query" placeholder="Enter city"/>
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>
                <div className="alert alert-danger hidden" id="alert-danger" role="alert">
                    {this.state.alertText}
                </div>
            </div>
        );
    }
    
    onSearch(e) {
        e.preventDefault();
        if (!isNaN(this.refs.query.value)) {
            var queryValue = this.refs.query.value;
        } else {
            var queryValue = "q=" + this.refs.query.value;
        }
        
        this.props.onSearch(queryValue);
    }
}