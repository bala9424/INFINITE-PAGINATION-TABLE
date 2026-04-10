import React, {useState,useEffect} from "react"
import useApi from '../hooks/useapi'
export default  function PaginationExample(){
    const [currentPage,setCurrentPage]=useState(1)
    const limit=10
    const {loading,post}=useApi({
        LIMIT: limit,
        pageNum: currentPage
      })

      const totalPage=Math.ceil(100/limit)

    return(<div>
        <button onClick={() => setPage((prev) => prev + 1)}> add more here paginagtion</button>
        {/* <div>{JSON.stringify(post)}</div> */}
        {post.map((p, i) => (
          <div>
            {
              <div>
                <span>{p.id} </span>--- <span> {p.title}</span>
              </div>
            }
          </div>
        ))}
        {loading && <div>loading -------</div>}
        <div>
        {
           [...Array(totalPage)].map((page,i)=>(<button onClick={()=>setCurrentPage(i + 1)} disabled={currentPage == (i + 1)}>{i + 1}</button>))
        }
        </div>
      </div>)

}