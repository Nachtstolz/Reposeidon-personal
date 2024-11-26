import {useState, useEffect} from "react";
import axios from "axios";
import List from "./List"
import styled from "styled-components";

function Main() {
    // const [rows, setRows]= useState(1)

    const [notes , setNewNotes] = useState("")
    // const [formNote, setFormNote] = useState({
    //   title: "",
    //   content: ""
    // })

    //사용자 입력 컨텐츠 정의
    const [writer, setWriter] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    //업로드할 파일 셋팅
    const [file, setFile] = useState("");
    
    //업로드 버튼 클릭여부
    const [clickUpload, setClickUpload] = useState(false);

    //실행 버튼 클릭여부
    const [clickSubmit, setClickSubmit] = useState(false);


    // useEffect(() => {
    //   getNotes()
    //     } ,[])
    
    //사용자가 입력한 값이 있었으면 해당 값으로 추가
    useEffect(() => {
      let thisWriter =  localStorage.getItem("reposeidonWriter");
      let thisTitle =  localStorage.getItem("reposeidonTitle");
      let thisContent = localStorage.getItem("reposeidonContent");

      if(!thisWriter){
        setWriter(thisWriter);
      }

      if(!thisTitle){
        setTitle(thisTitle);
      }

      if(!thisContent){
        setContent(thisContent);
      }

      // PrintPreInput()
    },[])

    //백엔드로 전송
    useEffect(() => {
      createNote()
    }, [clickSubmit])
    

  //임시 API
    //백엔드 결과 받아오기
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
        

    //백엔드로 사용자가 입력한 내용 전달
    function createNote() {

        axios({
          method: "POST",
          url:"http://localhost:8000/data/",
          data:{
            title: title,
            content: content,
            writer: writer,
           }
        })
        .then((response) => {
          getNotes()
          window.location.reload();
        })
        
    }
  
  //이전에 입력한 값 조회
  // const PrintPreInput = () => {
  //   return(
  //     <>
  //       <input className="small" onChange={handleWriter}  name="title" placeholder="Title" value={title} />
  //       <input className="small" onChange={handleTitle} name="writer" placeholder="Writer" value={writer} />
  //       <textarea className="body" onChange={handleContent} name="content" placeholder="Body content" value={content} />
  //       <button onClick={handleSubmit}>조회하기</button>
  //     </>
  //   )
  // }


  //사용자 입력 값 제어
    //사용자 명 입력
    const handleWriter = (e) => {
      let inputWriter = e.target.value;
      setWriter(inputWriter);
    }

    //제목 입력
    const handleTitle = (e) => {
      let inputTitle = e.target.value;
      setTitle(inputTitle);
    }

    //내용 입력
    const handleContent = (e) => {
      let inputContent = e.target.value;
      setContent(inputContent);
    }


    //백엔드 결과 값 삭제
    function DeleteNote(id) {
      axios({
        method: "DELETE",
        url:`http://localhost:8000/data/${id}/`,
      })
      .then((response) => {
        getNotes()
      })
    }

  //업로드, 제출 버튼 제어
  const handleUpload = () => {
    setClickUpload(true);

    //파일의 내용 읽어오는 코드추가 예정


  }

  const handleSubmit = () =>{
    //콘텐츠 유효성 검사 함수 추가

    //로컬에 입력한 내용 임시 저장(title/content)
    localStorage.setItem("reposeidonWriter",writer);
    localStorage.setItem("reposeidonTitle", title);
    localStorage.setItem("reposeidonContent", content);


    setClickSubmit(true);
  }

  //콘텐츠 유효성검사 함수
  //선언 필요

    
    //파일 업로드 기능 테스트
    const handleFile = (event) => {
      setFile(event.target.files[0])
    }

    // const submitFile = (event) => {
    //   event.preventDefault()
      
    //   const url = 'http://localhost:8000/upload/';
    //   const formData = new FormData();
    //   formData.append('file', file);
    //   //formData.append('fileName', file.name);
    //   const config = {
    //     headers: {
    //       // 'content-type': 'multipart/form-data',
    //       'Content-Type': 'application/json',
    //     },
    //   };

    //   //테스트
    //   console.log("file:", file);
    //   console.log("file.Name:", file.name);

    //   axios.post(url, formData, config).then((response) => {
    //     console.log(response.data);
    //   });
      
    // }

    //로컬에 입력한 내용 임시 저장(title/content)



    




  return (

     <div>

        <Form >
          <div className="container">
            <input className="small" onChange={handleWriter}  name="title" placeholder="Title" value={title} />
            <input className="small" onChange={handleTitle} name="writer" placeholder="Writer" value={writer} />
            <textarea className="body" onChange={handleContent} name="content" placeholder="Body content" value={content} />
            <button onClick={handleSubmit}>조회하기</button>
          </div>

          <br/>

          <div>
            <input type="file" onChange={handleFile}/>
            <button onClick={handleUpload}>업로드</button>
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