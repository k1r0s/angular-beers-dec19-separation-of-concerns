import { h, Component } from "preact";
import { renderOnRoute, Link } from "preact-routlet";
import { fetch } from "../advices";

@renderOnRoute("/users")
@fetch("/users")
export default class UserComponent extends Component {

  state = { users: [] };

  componentDidMount() {
    this.getResource({});
  }

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
