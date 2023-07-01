import { useState } from "react"
import './SL.css';
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const {signup,error,isLoading}=useSignup()
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password, firstName, lastName);
        await signup(email, password, firstName, lastName)
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
                        <h3 className="t">Sign Up</h3><br />

                        <div className="form-outline mb-4">
                            <label className="form-label" >Email address : </label>
                            <input type="email" className="form-control form-control-lg"
                                placeholder="Enter a valid email address" onChange={(e) => setEmail(e.target.value)}
                                value={email} />

                        </div>

                        <div className="form-outline mb-3">
                            <label className="form-label" >Password : </label>
                            <input type="password" className="form-control form-control-lg"
                                placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}
                                value={password} />
                        </div>

                        <div className="form-outline mb-3">
                            <label className="form-label" >First Name : </label>
                            <input type="text" id="form3Example4" className="form-control form-control-lg"
                                placeholder="Enter Your First Name" onChange={(e) => setFirstName(e.target.value)}
                                value={firstName} />
                        </div>

                        <div className="form-outline mb-3">
                            <label className="form-label" >Last Name : </label>
                            <input type="text" className="form-control form-control-lg"
                                placeholder="Enter your last name" onChange={(e) => setLastName(e.target.value)}
                                value={lastName} />
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button className="tt" disabled={isLoading}>Sign Up</button>
                            {error && <div className="error1">{error}</div>}
                            <br /><br />
                            <p className="small fw-bold mt-2 pt-1 mb-0 ttt">You have an account? <a href="/Login"
                                className="link-danger">Login</a></p>
                        </div>
                        <br /><br />
                    </form>
                </div>

            </div>  <br /><br />

        </div>


    )
}

export default Signup