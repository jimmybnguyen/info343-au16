var API_KEY = '00cc3cb930fb919aa6a40b719d8ef9fd';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
    }
    /*
    componentDidMount() {
        var savedResultsJson = localStorage.getItem("savedResults")
        var savedResults = JSON.parse(savedResultsJson);
        
        console.log(savedResults);
        
        this.setState({
            saved: savedResults;
        });
    }*/

    render() {
        console.log(this.state.saved);
        return (
            <div>
                <h1>Weather Mat</h1>
            
                <ul>
                    {
                        this.state.saved.map((result) => (
                            <li>{result}</li>
                        ))
                    }
                </ul>
                
                <form onSubmit={(e) => this.onSearch(e)}>
                    <input type="text" ref="query" />
                    <button type="submit">Search</button>
                </form>
                    
                <Result
                    name={this.state.name}
                    temp={this.state.temp}
                    icon={this.state.icon}
                    main={this.state.main}
                    description={this.state.description}
                    onSave={(name) => this.saveResult(name)}
                /> 
                    
            </div>
        );
    }
    
    saveResult(name) {
        console.log(name);
        var saved = this.state.saved;
        
        saved.push(name);
        
        this.setState({
            saved: saved
        });
        
        // Save to local storage
        //var savedJson = JSON.stringify(saved);
        //localstorage.setItem('savedResults', savedJson);
    }
    
    onSearch(e) {
        e.preventDefault();
        
        var queryValue = this.refs.query.value;
        
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + queryValue + "&units=imperial&appid=" + API_KEY; 
        
        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then((json) => {
            console.log(json.weather[0].main);
            console.log(json.weather[0].description);
            
            var name = json.name;
            var temp = json.main.temp;
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
