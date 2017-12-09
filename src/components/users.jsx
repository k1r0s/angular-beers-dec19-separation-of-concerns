import { h, Component } from "preact";
import { renderOnRoute, Link } from "preact-routlet";
import { memoizeFetch } from "../advices"
import { beforeMethod } from "kaop-ts";

@renderOnRoute("/users")
export default class UserComponent extends Component {

  componentWillMount() {
    this.setState({ users: [] });
  }

  componentDidMount() {
    this.getResource({});
  }

  @beforeMethod(...memoizeFetch("/users"))
  getResource(params, res) {
    this.setState({ users: res.data });
  }

  render() {
    return (
      <section>
        <h2>User list</h2>
        <ul>
          {this.state.users.map(user => (
            <li>
              <Link href={`/user/${user.username}/${user.id}/posts`}>
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}
