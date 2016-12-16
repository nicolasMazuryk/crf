
import {LoginComponent} from "./login/login.component"
import {RouterModule} from '@angular/router'


const routes = [{
        path: 'login',
        component: LoginComponent
    }
]

export default RouterModule.forRoot(routes)
