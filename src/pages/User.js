import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from 'react'


import NewPost from '../components/NewPost';


const User = ()=>{
    const {userId} = useParams()
    const[userInfo, setUserInfo] = useState(null)
    const[posts, setPosts] = useState([])
    const[seeMoreState, setSeeMoreState] = useState({state:false, id:''})
    const[onePost, setOnePost] = useState()
    useEffect(()=>{
        fetch(`/user/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUserInfo(prevUserInfo=> prevUserInfo = data.findUser)
                setPosts(prevPosts => prevPosts = data.userContent)
                console.log(data.userContent)
            })
    },[])

    function seeMore(postId){
        setSeeMoreState(prevseeMoreState => prevseeMoreState={state: true, id: postId})
        console.log(seeMoreState)

    }
    useEffect(()=>{
        const ppost = posts.find(post=> post.postId === seeMoreState.id)
        setOnePost(prevOnePost => prevOnePost = ppost)
        console.log(onePost)
    },[seeMoreState])
    

    const createPosts = posts?.map(post=>{
        return(
            <article key={post.postId}>
                <h3>{post.title}</h3>
                <p>{post.text}</p>
                <button type="button" onClick={()=>seeMore(post.postId)}>See More</button>
            </article>
        )
    })

    function goBack(){
        setSeeMoreState(prevseeMoreState => prevseeMoreState={state: false, id: ''})
    }
    return(
        <div>
            <h1>Hello User{userInfo !== null ? userInfo[0].name:''}</h1> 
                <NewPost /><Link to='/user/:userId/calendar'>Calendar</Link>
                {createPosts}
                
                {seeMoreState.state === true && onePost &&
                
                    <article key={onePost.postId}>
                    <h3>{onePost.title}</h3>
                    <p>{onePost.text}</p>
                    <button type="button" onClick={goBack}>goBack</button>
                    </article>
                }

        </div>
     
    )
}

export default User