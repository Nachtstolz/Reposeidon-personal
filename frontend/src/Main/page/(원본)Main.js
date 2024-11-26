import {useState, useEffect} from "react";
import axios from "axios";
import List from "./List"
import styled from "styled-components";

function Main() {
    // const [rows, setRows]= useState(1)

    const [notes , setNewNotes] = useState(null)
    const [formNote, setFormNote] = useState({
      title: "",
      content: ""
    })

    //파일 업로드
    const [file, setFile] = useState();

    useEffect(() => {
      getNotes()
        } ,[])

    function getNotes() {
      axios({
          method: "GET",
          url:"http://localhost:8000/data/",
        }).then((response)=>{
          const data = response.data
          setNewNotes(data)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        })}

    function createNote(event) {
        //로컬에 입력한 내용 임시 저장
        localStorage.setItem("reposeidonWriter",formNote.writer);
        localStorage.setItem("reposeidonTitle", formNote.title);
        localStorage.setItem("reposeidonContent", formNote.content);

        axios({
          method: "POST",
          url:"http://localhost:8000/data/",
          data:{
            title: formNote.title,
            content: formNote.content,
            writer: formNote.writer,
           }
        })
        .then((response) => {
          getNotes()
        })
    }

    function setNote(){

    }

    function DeleteNote(id) {
        axios({
          method: "DELETE",
          url:`http://localhost:8000/data/${id}/`,
        })
        .then((response) => {
          getNotes()
        })
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setFormNote(prevNote => ({
            ...prevNote, [name]: value})
        )}
    
    //파일 업로드 기능 테스트
    const handleFile = (event) => {
      setFile(event.target.files[0])
    }

    const submitFile = (event) => {
      event.preventDefault()
      
      const url = 'http://localhost:8000/upload/';
      const formData = new FormData();
      formData.append('file', file);
      //formData.append('fileName', file.name);
      const config = {
        headers: {
          // 'content-type': 'multipart/form-data',
          'Content-Type': 'application/json',
        },
      };

      //테스트
      console.log("file:", file);
      console.log("file.Name:", file.name);

      axios.post(url, formData, config).then((response) => {
        console.log(response.data);
      });
      
    }



  return (

     <div>

        <Form >
          <div className="container">
            <input className="small" onChange={handleChange} text={formNote.title} name="title" placeholder="Title" value={formNote.title} />
            <input className="small" onChange={handleChange} text={formNote.writer} name="writer" placeholder="Writer" value={formNote.writer} />
            <textarea className="body" onChange={handleChange} name="content" placeholder="Body content" value={formNote.content} />
            <button onClick={createNote}>저장</button>
          </div>

          <br/>

          <div>
            <input type="file" onChange={handleFile}/>
            <button onClick={submitFile}>업로드</button>
          </div>
        </Form>

        { notes && notes.map(note => <List
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content} 
          writer={note.writer}
          deletion ={DeleteNote}
        />
        )}

    </div>

  );
}

export default Main;

const Form = styled.form`
  div.container{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    
    margin-top: 20px;
    margin-bottom: 10px;
    align-items: left;
  }

  input.small{
    flex-basis: 50%;

    &:hover {
      background-color: #EEEEEE;
      color: black;
    }
  }

  input.body{
    flex-basis: 100%;

    &:hover {
      background-color: #EEEEEE;
      color: black;
    }
  }

  button{
    background-color: #AAF0FF;
    color: black;

    &:hover {
      background-color: #87CEFA;
    }
  }
`