import { createApp } from 'vue'
import App from './App.vue'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = process.env.VUE_APP_GRAPHQL_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql'
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    authorization: 'Bearer ' + process.env.VUE_APP_GRAPHQL_TOKEN,
    'custom': 'bla32432511532'
  }
})

// Create a provider
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const app = createApp(App)
app.use(apolloProvider)
app.mount('#app')
