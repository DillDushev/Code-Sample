const BUTN_NUM = 5;
const PAGE_ITEMS = 1200;
import Link from 'next/link'
import Router from 'next/router'

export default ({page, length, onClickPrev, onClickNext, setPage}) => {

  const index = parseInt(page);
  let numbers = [];
  const pageNum = Math.floor((length-1)/PAGE_ITEMS);
  const min = (index - BUTN_NUM > 0) ? (index - BUTN_NUM) : 0;
  const max = (index + BUTN_NUM < pageNum) ? (index + BUTN_NUM) : (pageNum); 

  for( let i = min; i <= max; i++) {
    numbers.push(i);
  }
	
  const is = (i) => i === index

  return (
    <div>
    { pageNum > 1 && 
      <div style = {{display: 'inline-block'}}>
        <Link
          as={`/${1}`}
          href={`/?page=${0}`}
        >
          <button 
            className = {'searchLocation mhm'}
            disabled = {index === 0 ? true : false}
          >
            {'<<'}
          </button>
        </Link>
        <Link prefetch
          as={`/${index}`}
          href={`/?page=${index - 1}`}
        >
          <button
            className = {'searchLocation'}
            disabled = {index === 0 ? true : false}
          >Prev
          </button>
        </Link>
      </div>
    }
      <div style = {{display: 'inline-block'}}>
      { numbers.map((n, i) => 
          <Link 
            as={is(n) ? null :`/${n+1}`}
            href={is(n) ? null :`/?page=${n}`} 
            key={n}
          >
            <div
              key = {i}
              className = {'searchLocation mhm borderRadius'}
              style = {{
                cursor: is(n) ? 'default' : 'pointer',
                color: is(n) ? '#333' : '#ff4500', 
                display: 'inline-block'
              }}
            >
              {`${n + 1}`}
            </div>
          </Link>
        ) 
      }
      </div>
      { pageNum > 1 &&
        <div style = {{display: 'inline-block'}}>
          <Link prefetch
            as={`/${index + 2}`}
            href={{pathname:'/', query: {page: index + 1}}}
          >
            <button
              className = {'searchLocation'}
              disabled = {index >= (length/PAGE_ITEMS) - 1 ? true : false }
            >Next
            </button>
          </Link>
          <Link
            as={is(pageNum) ? null :`/${pageNum+1}`}
            href={is(pageNum) ? null :`/?page=${pageNum}`}
          >
            <button 
              className = {'searchLocation'}
              disabled = {index === pageNum ? true : false}
              //onClick = {is(pageNum) ? null : () => setPage(pageNum)}
            >
             {'>>'}
            </button>
          </Link>
        </div>
      }
      <style jsx>{`
        .borderRadius {
          border-radius: 4px;
          border:1px solid #c0c0c0;
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
        }

        .mhm {
          margin-left: 5px;
          margin-right: 5px;
        }
      `}</style>
    </div>
  )
}
