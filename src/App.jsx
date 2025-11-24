import { Route, Switch } from 'wouter'
import Login from './pages/Login'
import Chat from './pages/Chat'

function App() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/chat" component={Chat} />
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl">404 - Page Not Found</h1>
        </div>
      </Route>
    </Switch>
  )
}

export default App
