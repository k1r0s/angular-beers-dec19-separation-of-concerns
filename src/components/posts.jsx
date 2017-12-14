import { h, Component } from "preact";
import { renderOnRoute, Link } from "preact-routlet";
import { beforeMethod, beforeInstance } from "kaop-ts";
import { http, memoize } from "../advices";
import AxiosProvider from "../axios-provider";
import StorageProvider from "../storage-provider";
import { inject } from "kaop";

@renderOnRoute("/user/:username/:usid/posts")
@beforeInstance(inject.assign({ axios: AxiosProvider, storage: StorageProvider }))
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
