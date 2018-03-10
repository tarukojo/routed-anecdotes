import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, FormGroup, 
  ControlLabel, FormControl, Button, Navbar, Nav, NavItem, 
  Alert, Table, Image, PageHeader, Panel } from 'react-bootstrap'

const navigationStyle = {
  fontSize: 22,
  background: 'grey'
}

const Menu = () => (
  <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      Anecdote app
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem href="#">   
        <NavLink to="/anecdotes" activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}>anecdotes</NavLink>&nbsp;
      </NavItem>
      <NavItem href="#">
        <NavLink to="/create" activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}>create new</NavLink>&nbsp;
      </NavItem>
      <NavItem href="#">
        <NavLink to="/about" activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}>about</NavLink>&nbsp;
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
    </ListGroup>  
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <div>has {anecdote.votes} votes</div>
    <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
  </div>
)

const notificationStyle = {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 16,
  fontColor: 'green',
  border: 'solid',
  padding: 20,
  margin: 1,
  borderRadius: 25,
  width: 200
}

const noneStyle = {
  display: 'none'
}

const Notification = ({ message }) => (
  <div style={message !== '' ? notificationStyle : noneStyle}>
  {(message &&
  <Alert color="success">
    {message}
  </Alert>
  )}</div>
)

const About = () => (
  <div>
    <Grid>
    <Row className="show-grid">
    <Col xs={6} md={6}>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Col>
    <Col xs={6} md={6}>
    <div>
    <p/>
    <Image src='linus.jpg' alt="Linus Torwalds" rounded/>
    </div>
    </Col>
    </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    <Table striped>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
    </Table>
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel>
            content 
          </ControlLabel>
          <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
          <ControlLabel>          
            author
          </ControlLabel>
          <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
          <ControlLabel>
            url for more info
          </ControlLabel>
          <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
          <p/>
          <Button bsStyle="success" type="submit">create</Button>
        </FormGroup>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: "New anecdote added" })
    setTimeout(() => {
      this.setState({notification: ''})
    }, 10000)
  }

  anecdoteById = (id) => 
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
      <Panel>
      <Panel.Body>
        <Router>
          <div>
          <PageHeader>Software anecdotes</PageHeader>
          <div>
            <Menu />
          </div>
          <div>
            <Notification message={this.state.notification} />
          </div>
          <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
          <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew}/>} />
          <Route exact path="/anecdotes/:id" render={({match}) =>
            <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
          />
          </div>
        </Router>
      </Panel.Body>
      <Panel.Footer>
        <Footer />
      </Panel.Footer>
      </Panel>
      </div>
    );
  }
}

export default App;

