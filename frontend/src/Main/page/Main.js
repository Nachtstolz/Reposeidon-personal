import {useState, useEffect} from "react";
import axios from "axios";
import List from "./List"
import styled from "styled-components";

function Main() {
    // const [rows, setRows]= useState(1)

    const [notes , setNewNotes] = useState(null)
    const [formNote, setFormNote] = useState({
      title: "",
      content: "",
      writer:""
    })

    //파일 업로드
    const [file, setFile] = useState();

    //파일 내용 담을 변수
    const [fileContent, setFileContent] = useState();

    useEffect(() => {
      setNote()
      getNotes()
      PrintInputs();
        } ,[])

    useEffect(() => {
      localStorage.setItem("reposeidonContent", fileContent);
      setNote();
    }, [fileContent])

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
          // window.localStorage.reload();
        })
    }

    //기존에 생성했던 내용 불러오기
    function setNote(){
        let thisWriter =  localStorage.getItem("reposeidonWriter");
        let thisTitle =  localStorage.getItem("reposeidonTitle");
        let thisContent = localStorage.getItem("reposeidonContent");

        if(!thisWriter){
          setFormNote(preNote => ({
            ...preNote, 'writer': thisWriter
          }))
        }

        if(!thisTitle){
          setFormNote(preNote => ({
            ...preNote, 'title': thisTitle
          }))
        }

        if(!thisContent){
          setFormNote(preNote => ({
            ...preNote,  'content': thisContent
          }))
        }
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
      setFile(event.target.files[0]);
      console.log('fileObject:',event.target.files[0])

      settingFileContent(event.target.files[0])
    }

    //txt파일 내용 읽어오기
    async function settingFileContent(file){
      let text = await file.text();

      console.log("text:", text);
      setFileContent(text);
    }

    // function settingDocxContent(file){
    //   const docx2html=require("docx2html")
    //   docx2html(file)
    // }

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



    // //파일 읽기
    // var reader = require('any-text');

    // useEffect(() => {
    //   console.log('fileContent,',file)

    //   reader.getText(file).then(function (data) {
    //     console.log('fileData:',data);
    //   });  
    // },[file])
 
    //화면에 랜더링
    function PrintInputs(){
      return(
        <>
            <input className="small" onChange={handleChange} text={formNote.title} name="title" placeholder="Title" value={formNote.title} />
            <input className="small" onChange={handleChange} text={formNote.writer} name="writer" placeholder="Writer" value={formNote.writer} />
            <textarea className="body" onChange={handleChange} name="content" placeholder="Body content" value={formNote.content} />
            <button onClick={createNote}>저장</button>
        </>
      )
    }


  return (

     <div>

        <Form >
          <div className="container">
            <PrintInputs/>
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