import {RouterModule} from '@angular/router'
import {LoginComponent} from "./login/login.component"
import {HomepageComponent} from "./homepage/homepage.component";
import {LoggedInGuard} from "./guards/loggedIn.guard";


const routes = [
  { path: '', component: HomepageComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent }
]

export default RouterModule.forRoot(routes)
