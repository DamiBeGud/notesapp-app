import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'
import { nanoid } from 'nanoid';

const NewPost = ()=>{
    const {userId} = useParams()
    let info = {
        userId:`${userId}`,
        postId:nanoid(),
        title: '',
        text:''
    }

    const  [newInput, setNewInput] = useState(info)

    function onChange(event) {
        setNewInput(prevNewInfo => {
            return {...prevNewInfo, [event.target.name] : event.target.value}
        })
        
    }
    function handleClick(newInput){
        console.log(newInput)

        console.log(userId)
        fetch(`/user/${userId}`,{
            method: 'POST',
            mode:'cors',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(newInput)
        })
        .then(response => response.json())
        .then(data=> console.log(data))

        
        setNewInput(info)
    }
    return(
        <form>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" onChange={onChange}/>
                <label htmlFor="text">Text</label>
                <input type="text" id="text" name="text" onChange={onChange}/>
                <button type="button" onClick={()=> handleClick(newInput)}>Add</button>
            </form>
    )
}

export default NewPost