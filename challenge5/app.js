var API_KEY = '00cc3cb930fb919aa6a40b719d8ef9fd';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
    }
    
    componentDidMount() {
        var savedResultsJSON = localStorage.getItem('savedResults')
        var savedResults = JSON.parse(savedResultsJSON);
        
        if (savedResults) {
            this.setState({
                saved: savedResults
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col sm-12">
                        <h1>Weather Mat</h1>
                    </div>
                </div>
            
                <div className="row">
                    <div className="col sm-6">
                        <form onSubmit={(e) => this.onSearch(e)}>
                            <input className="form-control" type="text" ref="query" />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col sm-6">
                        <SavedResults
                            saved={this.state.saved}
                            onClick={(result) => this.searchLocation(result)}
                        />
                    </div>
                </div>
                <div className="row">
                    <Result
                        name={this.state.name}
                        temp={this.state.temp}
                        icon={this.state.icon}
                        main={this.state.main}
                        description={this.state.description}
                        onSave={(name) => this.saveResult(name)}
                    /> 
                </div>
        </div>
        );
    }
    
    saveResult(name) {
        var saved = this.state.saved;
        
        saved.push(name);
        
        this.setState({
            saved: saved
        });
        
        // Save to local storage
        var savedJson = JSON.stringify(saved);
        localStorage.setItem('savedResults', savedJson);
    }
    
    onSearch(e) {
        e.preventDefault();
        
        var queryValue = this.refs.query.value;
        
        this.searchLocation(queryValue);
        
    }

    searchLocation(location) {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + API_KEY; 
        
        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then((json) => {
            
            var name = json.name;
            var temp = json.main.temp + "°";
            var icon = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
            var main = json.weather[0].main;
            var description = "(" + json.weather[0].description + ")";
            
            this.setState({
                name: name,
                temp: temp,
                icon: icon,
                main: main,
                description: description
            });
        });
    }
}


var app = document.getElementById('app');

ReactDOM.render(<App />, app);
