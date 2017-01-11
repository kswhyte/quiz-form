import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Fetching Quiz Title",
      questions: []
    };
  }

  componentDidMount() {
    this.retrieveQuizzes()
  }

  retrieveQuizzes() {
    $.getJSON('http://localhost:3001/quizzes')
      .then((quizData) => {
        // debugger;
        this.setState({
          title: quizData.quizzes[0].title,
          questions: quizData.quizzes[0].questions,
        })
      })
  }

  handleFormSubmit(e) {
    e.preventdefault()
  }

  render() {
    let form;
    form = this.state.questions.map((question, i) =>
      <li
        className='question'
        key={i}
      >
        <form onSubmit={this.handleFormSubmit}>
          <h3>{ question.title }</h3>
            <div className="radio">
              <label>
                <input type="radio" name="answer" value={question.answers[0].score}/>
                  { question.answers[0].title }
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" name="answer" value={question.answers[1].score}/>
                  { question.answers[1].title }
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" name="answer" value={question.answers[2].score}/>
                  { question.answers[2].title }
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" name="answer" value={question.answers[3].score}/>
                  { question.answers[3].title }
              </label>
            </div>
        </form>
      </li>
    )

    // { this.renderQuestions() !== undefined ? this.renderQuestions() : "Fetching Quiz Questions"}

    return (
      <div className="App">
        <div className="App-header">
          <h2 className="app-title">{this.state.title}</h2>
        </div>

        <ul className="quiz-form-container">
          { form }
        </ul>

        <button
          className="submit-button"
          type="submit"
          >
            Submit
          </button>
      </div>
    );
  }
}

export default App;
