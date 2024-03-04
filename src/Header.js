import {Link} from 'react-router-dom';

const Header=(props)=>{

      const clearData=()=>{
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
        return (<div>
             <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"><i class="fa fa-id-card-o" aria-hidden="true"></i></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <Link class="nav-link" to="/">Home</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/login">Login</Link>
                </li>
               {props.logout ==="yes" && <li class="nav-item">
                    <Link class="nav-link" onClick={clearData} to="/">Logout</Link>
                </li> } 


            </ul>

        </div>
    </nav>
        </div>)
}
export default Header;