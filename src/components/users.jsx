import { h, Component } from "preact";
import { renderOnRoute, Link } from "preact-routlet";
import axios from "axios";

@renderOnRoute("/users")
export default class UserComponent extends Component {

  state = { users: [] };

  componentDidMount() {
    this.getResource();
  }

  getResource(params, res) {
    axios({
      url: 'http://localhost:3000/users'
    }).then(res => {
      this.setState({ users: res.data });
    })
  }

  render() {
    return (
      <section>
        <h2>User list</h2>
        <ul>
          {this.state.users.map(user => (
            <li>
              {user.username}
            </li>
          ))}
        </ul>
      </section>
    )
  }
}
