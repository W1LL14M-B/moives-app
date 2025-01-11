import { useNavigate } from "react-router-dom"


const Login = () => {

const navigate = useNavigate();

const onLogin = () => {
  navigate("/movies")
}

  return (
    <div className="container mt-5">
    <h1>Login</h1>
    <hr />

    <button className="btn btn-primary"
    onClick={onLogin}
    >

      Login
    </button>
  </div>
  )
}

export default Login