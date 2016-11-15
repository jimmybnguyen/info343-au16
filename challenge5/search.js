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
                <form id="search-form" onSubmit={(e) => this.onSearch(e)}>
                    <input type="text" ref="query" placeholder="Enter city or zipcode"/>
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

        var queryValue = this.refs.query.value;
        
        this.props.onSearch(queryValue);
        
        var form = document.getElementById("search-form");
        
        // Clears the search bar after submitting
        form.reset();
    }
}