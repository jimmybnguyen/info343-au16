class Search extends React.Component {
    render() {
        return(
                <form onSubmit={(e) => this.onSearch(e)}>
                    <input type="text" ref="query" />
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>
        );
    }
    
    onSearch(e) {
        e.preventDefault();
        
        var queryValue = "q=" + this.refs.query.value;
        
        this.props.onSearch(queryValue);
    }
}