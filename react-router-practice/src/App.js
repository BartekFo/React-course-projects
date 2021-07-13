import { lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'

const NewQuote = lazy(() => import('./pages/NewQuote'))
const QuoteDetail = lazy(() => import('./pages/QuoteDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AllQuotes = lazy(() => import('./pages/AllQuotes'))

// Towrzymy routing za pomocą switch i Route do różnych ścieżek by otiwerać właściwe strony
// Przez to, że nie chcemy by od razu cała strona się otwierała, to korzystamy z czegoś co się nazywa lazy rendering i oznacz to w praktyce, że tylko dana część kodu jest pobierana z serwra
// ta która potrzebujemy
// Korzystając z tej techniki musimy dodać coś co będzię wyświetlane gdy będziemy chcieli wejść na element który się jeszcze nie pobrał i stąd komponent Suspense

function App () {
  return (
    <Layout>
      <Suspense fallback={
        <div className='centered'>
          <LoadingSpinner />
        </div>}
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"/>
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes/>
          </Route>
          <Route path="/quotes/:id">
            <QuoteDetail/>
          </Route>
          <Route path="/new-quote">
            <NewQuote/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default App
