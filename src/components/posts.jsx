import { h, Component } from "preact";
import { renderOnRoute, Link } from "preact-routlet";
import { beforeMethod } from "kaop-ts";
import { http, memoize } from "../advices";

@renderOnRoute("/user/:username/:usid/posts")
export default class UserPostComponent extends Component {

  componentWillMount() {
    this.setState({ posts: [] });
  }

  componentDidMount() {
    this.getResource({ userId: this.props.params.usid });
  }

  @beforeMethod(memoize.read, http("/posts"), memoize.write)
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
