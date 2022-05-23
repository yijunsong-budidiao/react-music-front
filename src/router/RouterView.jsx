import { Switch, Route, Redirect } from 'react-router-dom'

function RouterView(props) {
    return <Switch>
        {
            props.routes.map((item,index)=>{
                if(item.component){
                    return <Route key={index} path={item.path} component={item.component} exact={item.exact}></Route>
                } else {
                    return <Route key={index} path={item.path} exact={item.exact}>
                        <Redirect to={item.redirect}></Redirect>
                    </Route>
                }
            })
        }
    </Switch>

}

export default RouterView