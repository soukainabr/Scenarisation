import { useState } from "react"
import './SL.css';
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {login,error,isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="container-fluid h-custom ">
            <br /><br /><br /><br /><br /><br />
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid" alt="Sample" />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 border">
                    <form onSubmit={handleSubmit}>
                        <br />
                        <h3 className="t">Log In</h3><br />
                        <div className="form-outline mb-4">
                            <label className="form-label" >Email address : </label>
                            <input type="email" className="form-control form-control-lg"
                                placeholder="Enter a valid email address"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email} />

                        </div>

                        <div className="form-outline mb-3">
                            <label className="form-label" >Password : </label>
                            <input type="password" className="form-control form-control-lg"
                                placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}
                                value={password} />
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button className="tt" disabled={isLoading}>Log in</button>
                            {error && <div className="error1">{error}</div>}

                            <br /><br />
                            <p className="small fw-bold mt-2 pt-1 mb-0 ttt">Don't have an account? <a href="/Signup"
                                className="link-danger">Sign up</a></p>
                        </div>
                        <br /><br />
                    </form>
                </div>

            </div>  <br /><br /><br /><br />

        </div>


    )
}

export default Login