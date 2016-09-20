var React = require('react')
var ReactDOM = require('react-dom')

class HelloClassInJavascript extends  React.Component {
    render(){
        return (
            <h1>
              Hello, React!
            </h1>
        )
    }
}

ReactDOM.render(<HelloClassInJavascript />, document.getElementById('container'))
