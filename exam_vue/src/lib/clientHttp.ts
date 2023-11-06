import axios from "axios"

 const clientHttp = axios.create (
    {
        baseURL: 'http://localhost:3007/', 
        headers:{
          Accept:"application/json",
          "Content-Type":"*"

        }
      }
  )

  export default clientHttp;