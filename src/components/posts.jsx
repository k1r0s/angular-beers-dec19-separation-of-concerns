import { h, Component } from "preact";
import { renderOnRoute, Link } from "preact-routlet";
import axios from "axios";

@renderOnRoute("/user/:username/:usid/posts")
export default class UserPostComponent extends Component {

  state = { posts: [] };

  componentDidMount() {
    this.getResource({ userId: this.props.params.usid });
  }

  getResource(params, res) {
    axios({
      url: 'http://localhost:3000/posts',
      params
    }).then(res => {
      this.setState({ posts: res.data });
    })
  }

  render() {
    return (
      <section>
        <h2>Post for user {this.props.params.username}</h2>
        <ul>
          {this.state.posts.map(post => (
            <li>
              <h5>{post.title}</h5>
              <article>{post.body}</article>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}
