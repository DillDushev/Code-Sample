import Link from 'next/link'
import Pagination from '../components/Pagination'
import fetch from 'isomorphic-unfetch'
import withRedux from 'next-redux-wrapper'
import {makeStore} from '../store'
import Head from 'next/head'

const Index = ({page, length, photos}) => (
  <div>
    <Head>
      <title>1.2m Users </title>
      <script type = 'text/javascript' src  = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
    </Head>
    <Link prefetch href={{ pathname: '/admin', query: {page: parseInt(page) + 1} }}>
      <a><h2>admin</h2></a>
    </Link>
    <h1 className = 'txtC'>	The Users</h1>
    { photos.length ?
        <table style = {{margin: '0 auto'}}>
          <thead>
            <tr>
              <th style = {{width: '320px'}}>Name</th>
              <th style = {{width: '120px'}}>Avatar</th>
            </tr>
          </thead>
          <tbody>
					{	
            photos.map((p) => ( 
              <tr key={p.id}>
                <td>
                  <div className='photoLink'>
                    {['№', p.id, p.name].join(' ')}		
                  </div>
                </td>
                <td>
                  <img width = {100} height = {100} src = {p.avatar} />
                </td>
              </tr>
            ))
          }
          </tbody>
        </table> 
        : 
        <h1 className = 'txtC'>NO DATA</h1>
    }
    <div className={'txtC'}>
      <Pagination
        className={'txtC'}
        page={page}
        length={length}
      />
    </div>
    <style jsx>{`
      td, .txtC {
        padding: 10px;
        text-align: center;
        border: 1px solid #ccc;
      }

      .photoLink {
        verticalAlign: middle;
        cursor: pointer;
        color: -webkit-link;
      }
    `}</style>
  </div>
)

Index.getInitialProps = async function({store, query: {page}}) {

  const res = await fetch(`http://localhost:3000/api/users?page=${page}`);
  const json = await res.json()
  const {data, length} = json;

  store.dispatch({type: 'ADD', arr: data});
  return {
    length: length,
    page: page 
  }
}

export default withRedux(
  makeStore, 
  state => ({photos: state.arr})
  , 
  dispatch => ({
    add: (arr) => dispatch({type: 'ADD', arr})
  })
)(Index);
