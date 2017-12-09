import { h, render } from "preact";
import { RouterOutlet, Link } from "preact-routlet";
import "./components/users";

render(
  (<div>
    <nav>
      <Link href="/">Home</Link><br/>
      <Link href="/users">Users</Link><br/>
    </nav>
    <hr/>
    <RouterOutlet>
      <h3>Sample app!</h3>
    </RouterOutlet>
  </div>), document.querySelector("#root"));
