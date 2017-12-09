import { h, Component } from "preact";
import { renderOnRoute, Link } from "preact-routlet";
import { http } from "../advices";
import { beforeMethod } from "kaop-ts";

@renderOnRoute("/user/:username/:usid/posts")
export default class UserPostComponent extends Component {

  state = { posts: [] };

  componentDidMount() {
    this.getResource({ userId: this.props.params.usid });
  }

  @beforeMethod(http("/posts"))
  getResource(params, res) {
    this.setState({ posts: res.data });
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
