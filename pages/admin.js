import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import {makeStore} from '../store'

class Admin extends React.Component {

  static getInitialProps = ({photos, query: {page}}) => ({photos,page});

  render () {
    const { photos, page } = this.props;
    return (
      <div>
        <h1 className = 'txtC'>Admin</h1>
        <h2 className = 'txtC'>Page №: {parseInt(page)}</h2>
	      <div className='list'>
	        {
	          photos.map((p) => (
	            <div key={p.id} className='photo'>
	                <div className='photoLink'
	                >
	                  <div style = {{verticalAlign: 'middle', width: '100px', height: '100px', margin: '20px auto', lineHeight: '100px'}}>
	                    <img width = {100} height = {100} src = {p.avatar} />
	                  </div>
	                  <span 
	                    className={'searchLocation borderRadius'}
	                  >
	                  	{p.name}
	                  </span>
	                  <Link prefetch href={{ pathname: '/item', query: {id: p.id}}}> 
	                    <a style = {{display: 'block', lineHeight:'1.2em'}}>edit</a>
	                  </Link>
	                </div>
	            </div>
	          ))
	        }
	      </div>
      	 <style jsx>{`
          .list {
            padding: 50px;
            text-align: center;
          }

          .photo {
            display: inline-block;
          }

          .photoLink {
            color: #333;
            verticalAlign: middle;
            background: #eee;
            display: inline-block;
            width: 250px;
            height: 250px;
            line-height: 80px;
            margin: 10px;
            border: 2px solid transparent;
          }
          .photoLink:hover {
            borderColor: blue;
          }

          .borderRadius {
            border-radius: 4px;
            border:1px solid #c0c0c0;
          }

          .txtC {
            padding: 10px;
            text-align: center;
          }

          .searchLocation {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -o-box-sizing: border-box;
            padding-top: .7em;
            padding-bottom: .7em;
            padding-left: 0.7em;
            padding-right: 0.7em;
            cursor:pointer;
          }
        `}</style>
      </div>
    )
  }
}

const changeName = (id, name) => ({
  type: 'CHANGE', 
  id,
  name
})

export default withRedux(
  makeStore, 
  state => ({photos: state.arr}), 
)(Admin);