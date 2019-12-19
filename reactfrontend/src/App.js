import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView'

// Material-UI
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';



class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }

  // ComponentDidMount: 직후에 component 데이터 요청을 하는 것이 좋다.
  componentDidMount() {
    this.getPosts()

  }

  // 앞의 _: input을 의미
  async getPosts() {
    const _results = await api.getAllPosts()
    //_results.data: 아무것도 없음
    this.setState({results: _results.data})
    console.log(_results)
  }



  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handlingSubmit = async (event) => {
    // event 고유의 기능을 막는다 (ex.새로고침 막아줌)
    event.preventDefault()
    let result = await api.createPost({title:this.state.title, content:this.state.content})
    console.log("완료되었습니다!", result)
    this.setState({title: '', content: ''})
    this.getPosts()
  }

  handlingDelete = async (event) => {
    await api.deletePost(event.target.value)
    this.getPosts()
  }


  render() {
    return (
      <div className="App">
        <Container maxWidth="lg">
          <div className="PostingSection">
            <Paper className="PostingForm">
              <h2>대나무숲 글 작성하기</h2>
              <form onSubmit={this.handlingSubmit}>
                <input
                  name="title"
                  value={this.state.title}
                  onChange={this.handlingChange}
                />
                <textarea
                  name="content"
                  value={this.state.content}
                  onChange={this.handlingChange}
                />
                <button type="submit">제출하기</button>
              </form>
            </Paper>
          </div>
          <div className="ViewSection">
            {
              this.state.results.map((post) =>
              <div>
                <PostView key={post.id} id={post.id} title={post.title} content={post.content}/>
                <button value={post.id} onClick={this.handlingDelete}>삭제하기</button>
              </div>
              )
            }
          </div>
        </Container>
      </div>
    );
  }
  }
  

export default App;
