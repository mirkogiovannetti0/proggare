import axios from 'axios';
import {useState,useEffect} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import PhoneInput from "react-phone-input-2";
import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';

import "assets/libs/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "assets/libs/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";
import "assets/css/modern/bootstrap.min.css";
import "assets/css/modern/app.css";
import "assets/css/modern/bootstrap-dark.min.css";
import "assets/css/icons.min.css";

function Admin({token}){
  const [message,setMessage] = useState("");
  const [users,setUsers] = useState([]);
  const [isLoading,setLoading] = useState(true);
  const [userAddModal, setUserAddModal] = useState(false);
  const [userEditModal, setUserEditModal] = useState(false);

  const [id,setID] = useState();
  const [userIndex,setUserIndex] = useState();
  const [first_name,setFirstName] = useState('');
  const [last_name,setLastName] = useState('');
  const [company_name,setCompanyName] = useState('');
  const [phone_number,setPhoneNumber] = useState('');
  const [work_email,setWorkEmail] = useState('');
  const [password,setPassword] = useState('');

  const closeAddCustomerModal = () => setUserAddModal(false);
  const openAddCustomerModal = () => setUserAddModal(true);

  const closeEditCustomerModal = () => setUserEditModal(false);
  const openEditCustomerModal = () => setUserEditModal(true);

  var data = new FormData();

  useEffect(()=> {
    setLoading(true);
    getUsers()
  },[]);
    const getUsers = ()=>{
      axios({
        method: "get",
        url: "http://localhost/api/users/",
        headers: {
          "Accept":"application/json",
          "Authorization":"Bearer "+token,
          "Content-Type": "multipart/form-data"
        },
      })
        .then(function (response) {
          if(response.status == 200){
            setUsers(response.data.data);
            setLoading(false);
          }
        })
        .catch((error)=>{
          if(error.response.data.errors){
            var keys = Object.keys(error.response.data.errors);
            keys.forEach((key)=>{
              error.response.data.errors[key].forEach((err)=>{
                setMessage(err);
              })
            })
          }
        });

  }

    const addUser = (e)=>{
      e.preventDefault();
    data.append("first_name",first_name);
    data.append("last_name",last_name);
    data.append("company_name",company_name);
    data.append("phone_number",phone_number);
    data.append("work_email",work_email);
    data.append("password",password);
      axios({
        method: "post",
        url: "http://localhost/api/users/",
      data:data,
        headers: {
          "Accept":"application/json",
          "Authorization":"Bearer "+token,
          "Content-Type": "multipart/form-data"
        },
      })
        .then(function (response) {
          if(response.status == 201){
          getUsers();
          setWorkEmail("");
          setCompanyName("");
          setPhoneNumber("");
          setFirstName("");
          setLastName("");
          setPassword("");
          setUserAddModal(false);
          }
        })
        .catch((error)=>{
          if(error.response.data.errors){
            var keys = Object.keys(error.response.data.errors);
            keys.forEach((key)=>{
              error.response.data.errors[key].forEach((err)=>{
                setMessage(err);
              })
            })
          }
        });

  }
    const editUser = (e)=>{
      e.preventDefault();


    axios({
      method: "put",
      url: "http://localhost/api/users/"+id,
      data:JSON.stringify({
        first_name:first_name,
        last_name:first_name,
        company_name:company_name,
        work_email:work_email,
        phone_number:phone_number,
        password:password,
      }),
      headers: {
        "Accept":"application/json",
        "Authorization":"Bearer "+token,
        "Content-Type": "application/json"
      },
    })
      .then(function (response) {
        if(response.status == 200){
          getUsers();
          setWorkEmail("");
          setCompanyName("");
          setPhoneNumber("");
          setFirstName("");
          setLastName("");
          setPassword("");
          setUserEditModal(false);
        }
      })
        .catch((error)=>{
          if(error.response.data.errors){
            var keys = Object.keys(error.response.data.errors);
            keys.forEach((key)=>{
              error.response.data.errors[key].forEach((err)=>{
                console.log(err);
              })
            })
          }
        });

  }
    const deleteUser = (e,id)=>{
      e.preventDefault();
    axios({
      method: "delete",
      url: "http://localhost/api/users/"+id,
      headers: {
        "Accept":"application/json",
        "Authorization":"Bearer "+token,
        "Content-Type": "multipart/form-data"
      },
    })
      .then(function (response) {
        if(response.status == 200){
          getUsers();
        }
      })
        .catch((error)=>{
          if(error.response.data.errors){
            var keys = Object.keys(error.response.data.errors);
            keys.forEach((key)=>{
              error.response.data.errors[key].forEach((err)=>{
                console.log(err);
              })
            })
          }
        });

  }
  if(token){
  return (
    <div>
        <Modal show={userAddModal} onHide={closeAddCustomerModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  <Form onSubmit={addUser}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Work Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Work email" value={work_email} onChange={(e)=>setWorkEmail(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" value={first_name} onChange={(e)=>setFirstName(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" value={last_name} onChange={(e)=>setLastName(e.target.value)}/>
              </Form.Group>


              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Company Name" value={company_name} onChange={(e)=>setCompanyName(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                <PhoneInput
                  country={"us"}
                  value={phone_number}
                  onChange={(e)=>setPhoneNumber(e)}
                  containerClass="containerClass"
                  />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </Form.Group>
              <Button variant="primary" type="submit">
              Add
              </Button>
  </Form>

          </Modal.Body>
        </Modal>
        <Modal show={userEditModal} onHide={closeEditCustomerModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={editUser}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Work Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Work email" value={work_email} onChange={(e)=>setWorkEmail(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" value={first_name} onChange={(e)=>setFirstName(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" value={last_name} onChange={(e)=>setLastName(e.target.value)}/>
              </Form.Group>


              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Company Name" value={company_name} onChange={(e)=>setCompanyName(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                <PhoneInput
                  country={"us"}
                  value={phone_number}
                  onChange={(e)=>setPhoneNumber(e)}
                  containerClass="containerClass"
                  />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Edit
              </Button>
            </Form>

          </Modal.Body>
        </Modal>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description" />
      <meta content="Coderthemes" name="author" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <div id="wrapper">
        {/* Topbar Start */}
        <div className="navbar-custom">
          <div className="container-fluid">
            <ul className="list-unstyled topnav-menu float-end mb-0">
              <li className="d-none d-lg-block">
                <form className="app-search">
                  <div className="app-search-box dropdown">
                    <div className="input-group">
                      <input type="search" className="form-control" placeholder="Search..." id="top-search" />
                      <button className="btn" type="submit">
                        <i className="fe-search" />
                      </button>
                    </div>
                    <div className="dropdown-menu dropdown-lg" id="search-dropdown">
                      {/* item*/}
                      <div className="dropdown-header noti-title">
                        <h5 className="text-overflow mb-2">Found <span className="text-danger">09</span> results</h5>
                      </div>
                      {/* item*/}
                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <i className="fe-home me-1" />
                        <span>Analytics Report</span>
                      </a>
                      {/* item*/}
                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <i className="fe-aperture me-1" />
                        <span>How can I help you?</span>
                      </a>
                      {/* item*/}
                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <i className="fe-settings me-1" />
                        <span>User profile settings</span>
                      </a>
                      {/* item*/}
                      <div className="dropdown-header noti-title">
                        <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
                      </div>
                      <div className="notification-list">
                        {/* item*/}
                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                          <div className="d-flex">
                            <img className="d-flex me-2 rounded-circle" src="assets/images/users/avatar-2.jpg" alt="Generic placeholder image" height={32} />
                            <div>
                              <h5 className="m-0 font-14">Erwin E. Brown</h5>
                              <span className="font-12 mb-0">UI Designer</span>
                            </div>
                          </div>
                        </a>
                        {/* item*/}
                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                          <div className="d-flex">
                            <img className="d-flex me-2 rounded-circle" src="assets/images/users/avatar-5.jpg" alt="Generic placeholder image" height={32} />
                            <div>
                              <h5 className="m-0 font-14">Jacob Deo</h5>
                              <span className="font-12 mb-0">Developer</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </li>
              <li className="dropdown d-inline-block d-lg-none">
                <a className="nav-link dropdown-toggle arrow-none waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="fe-search noti-icon" />
                </a>
                <div className="dropdown-menu dropdown-lg dropdown-menu-end p-0">
                  <form className="p-3">
                    <input type="text" className="form-control" placeholder="Search ..." aria-label="Search" />
                  </form>
                </div>
              </li>
              <li className="dropdown d-none d-lg-inline-block">
                <a className="nav-link dropdown-toggle arrow-none waves-effect waves-light" data-toggle="fullscreen" href="#">
                  <i className="fe-maximize noti-icon" />
                </a>
              </li>
              <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
                <a className="nav-link dropdown-toggle arrow-none waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="fe-grid noti-icon" />
                </a>
                <div className="dropdown-menu dropdown-lg dropdown-menu-end p-0">
                  <div className="p-2">
                    <div className="row g-0">
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets/images/brands/github.png" alt="Github" />
                          <span>GitHub</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets/images/brands/dribbble.png" alt="dribbble" />
                          <span>Dribbble</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets/images/brands/slack.png" alt="slack" />
                          <span>Slack</span>
                        </a>
                      </div>
                    </div>
                    <div className="row g-0">
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets/images/brands/g-suite.png" alt="G Suite" />
                          <span>G Suite</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets/images/brands/bitbucket.png" alt="bitbucket" />
                          <span>Bitbucket</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets/images/brands/dropbox.png" alt="dropbox" />
                          <span>Dropbox</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
                <a className="nav-link dropdown-toggle arrow-none waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <img src="assets/images/flags/us.jpg" alt="user-image" height={14} />
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item">
                    <img src="assets/images/flags/germany.jpg" alt="user-image" className="me-1" height={12} /> <span className="align-middle">German</span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item">
                    <img src="assets/images/flags/italy.jpg" alt="user-image" className="me-1" height={12} /> <span className="align-middle">Italian</span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item">
                    <img src="assets/images/flags/spain.jpg" alt="user-image" className="me-1" height={12} /> <span className="align-middle">Spanish</span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item">
                    <img src="assets/images/flags/russia.jpg" alt="user-image" className="me-1" height={12} /> <span className="align-middle">Russian</span>
                  </a>
                </div>
              </li>
              <li className="dropdown notification-list topbar-dropdown">
                <a className="nav-link dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="fe-bell noti-icon" />
                  <span className="badge bg-danger rounded-circle noti-icon-badge">5</span>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-lg">
                  {/* item*/}
                  <div className="dropdown-item noti-title">
                    <h5 className="m-0">
                      <span className="float-end">
                        <a href className="text-dark">
                          <small>Clear All</small>
                        </a>
                      </span>Notification
                    </h5>
                  </div>
                  <div className="noti-scroll" data-simplebar>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item active">
                      <div className="notify-icon bg-soft-primary text-primary">
                        <i className="mdi mdi-comment-account-outline" />
                      </div>
                      <p className="notify-details">Doug Dukes commented on Admin Dashboard
                        <small className="text-muted">1 min ago</small>
                      </p>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <div className="notify-icon">
                        <img src="assets/images/users/avatar-2.jpg" className="img-fluid rounded-circle" alt="" /> </div>
                      <p className="notify-details">Mario Drummond</p>
                      <p className="text-muted mb-0 user-msg">
                        <small>Hi, How are you? What about our next meeting</small>
                      </p>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <div className="notify-icon">
                        <img src="assets/images/users/avatar-4.jpg" className="img-fluid rounded-circle" alt="" /> </div>
                      <p className="notify-details">Karen Robinson</p>
                      <p className="text-muted mb-0 user-msg">
                        <small>Wow ! this admin looks good and awesome design</small>
                      </p>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <div className="notify-icon bg-soft-warning text-warning">
                        <i className="mdi mdi-account-plus" />
                      </div>
                      <p className="notify-details">New user registered.
                        <small className="text-muted">5 hours ago</small>
                      </p>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <div className="notify-icon bg-info">
                        <i className="mdi mdi-comment-account-outline" />
                      </div>
                      <p className="notify-details">Caleb Flakelar commented on Admin
                        <small className="text-muted">4 days ago</small>
                      </p>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <div className="notify-icon bg-secondary">
                        <i className="mdi mdi-heart" />
                      </div>
                      <p className="notify-details">Carlos Crouch liked
                        <b>Admin</b>
                        <small className="text-muted">13 days ago</small>
                      </p>
                    </a>
                  </div>
                  {/* All*/}
                  <a href="javascript:void(0);" className="dropdown-item text-center text-primary notify-item notify-all">
                  View all
                    <i className="fe-arrow-right" />
                  </a>
                </div>
              </li>
              <li className="dropdown notification-list topbar-dropdown">
                <a className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <img src="assets/images/users/avatar-1.jpg" alt="user-image" className="rounded-circle" />
                  <span className="pro-user-name ms-1">
                    Nik Patel <i className="mdi mdi-chevron-down" />
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end profile-dropdown ">
                  {/* item*/}
                  <div className="dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Welcome !</h6>
                  </div>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <i className="ri-account-circle-line" />
                    <span>My Account</span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <i className="ri-settings-3-line" />
                    <span>Settings</span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <i className="ri-wallet-line" />
                    <span>My Wallet <span className="badge bg-success float-end">3</span> </span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <i className="ri-lock-line" />
                    <span>Lock Screen</span>
                  </a>
                  <div className="dropdown-divider" />
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <i className="ri-logout-box-line" />
                    <span>Logout</span>
                  </a>
                </div>
              </li>
              <li className="dropdown notification-list">
                <a href="javascript:void(0);" className="nav-link right-bar-toggle waves-effect waves-light">
                  <i className="fe-settings noti-icon" />
                </a>
              </li>
            </ul>
            {/* LOGO */}
            <div className="logo-box">
              <a href="index.html" className="logo logo-dark text-center">
                <span className="logo-sm">
                  <img src="assets/images/logo-sm-dark.png" alt="" height={24} />
                  {/* <span class="logo-lg-text-light">Minton</span> */}
                </span>
                <span className="logo-lg">
                  <img src="assets/images/logo-dark.png" alt="" height={20} />
                  {/* <span class="logo-lg-text-light">M</span> */}
                </span>
              </a>
              <a href="index.html" className="logo logo-light text-center">
                <span className="logo-sm">
                  <img src="assets/images/logo-sm.png" alt="" height={24} />
                </span>
                <span className="logo-lg">
                  <img src="assets/images/logo-light.png" alt="" height={20} />
                </span>
              </a>
            </div>
            <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
              <li>
                <button className="button-menu-mobile waves-effect waves-light">
                  <i className="fe-menu" />
                </button>
              </li>
              <li>
                {/* Mobile menu toggle (Horizontal Layout)*/}
                <a className="navbar-toggle nav-link" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                  <div className="lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </a>
                {/* End mobile menu toggle*/}
              </li>
              <li className="dropdown d-none d-xl-block">
                <a className="nav-link dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                Create New
                  <i className="mdi mdi-chevron-down" />
                </a>
                <div className="dropdown-menu">
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item">
                    <i className="fe-briefcase me-1" />
                    <span>New Projects</span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item">
                    <i className="fe-user me-1" />
                    <span>Create Users</span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item">
                    <i className="fe-bar-chart-line- me-1" />
                    <span>Revenue Report</span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item">
                    <i className="fe-settings me-1" />
                    <span>Settings</span>
                  </a>
                  <div className="dropdown-divider" />
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item">
                    <i className="fe-headphones me-1" />
                    <span>Help &amp; Support</span>
                  </a>
                </div>
              </li>
              <li className="dropdown dropdown-mega d-none d-xl-block">
                <a className="nav-link dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                Mega Menu
                  <i className="mdi mdi-chevron-down" />
                </a>
                <div className="dropdown-menu dropdown-megamenu">
                  <div className="row">
                    <div className="col-sm-8">
                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="text-dark mt-0">UI Components</h5>
                          <ul className="list-unstyled megamenu-list">
                            <li>
                              <a href="javascript:void(0);">Widgets</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Nestable List</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Range Sliders</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Masonry Items</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Sweet Alerts</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Treeview Page</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Tour Page</a>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-4">
                          <h5 className="text-dark mt-0">Applications</h5>
                          <ul className="list-unstyled megamenu-list">
                            <li>
                              <a href="javascript:void(0);">eCommerce Pages</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">CRM Pages</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Email</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Calendar</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Team Contacts</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Task Board</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Email Templates</a>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-4">
                          <h5 className="text-dark mt-0">Extra Pages</h5>
                          <ul className="list-unstyled megamenu-list">
                            <li>
                              <a href="javascript:void(0);">Left Sidebar with User</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Menu Collapsed</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Small Left Sidebar</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">New Header Style</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Search Result</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Gallery Pages</a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">Maintenance &amp; Coming Soon</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="text-center mt-3">
                        <h3 className="text-dark">Special Discount Sale!</h3>
                        <h4>Save up to 70% off.</h4>
                        <button className="btn btn-primary rounded-pill mt-3">Download Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="clearfix" />
          </div>
        </div>
        {/* end Topbar */}
        {/* ========== Left Sidebar Start ========== */}
        <div className="left-side-menu">
          {/* LOGO */}
          <div className="logo-box">
            <a href="index.html" className="logo logo-dark text-center">
              <span className="logo-sm">
                <img src="assets/images/logo-sm-dark.png" alt="" height={24} />
                {/* <span class="logo-lg-text-light">Minton</span> */}
              </span>
              <span className="logo-lg">
                <img src="assets/images/logo-dark.png" alt="" height={20} />
                {/* <span class="logo-lg-text-light">M</span> */}
              </span>
            </a>
            <a href="index.html" className="logo logo-light text-center">
              <span className="logo-sm">
                <img src="assets/images/logo-sm.png" alt="" height={24} />
              </span>
              <span className="logo-lg">
                <img src="assets/images/logo-light.png" alt="" height={20} />
              </span>
            </a>
          </div>
          <div className="h-100" data-simplebar>
            {/* User box */}
            <div className="user-box text-center">
              <img src="assets/images/users/avatar-1.jpg" alt="user-img" title="Mat Helme" className="rounded-circle avatar-md" />
              <div className="dropdown">
                <a href="#" className="text-reset dropdown-toggle h5 mt-2 mb-1 d-block fw-medium" data-bs-toggle="dropdown">Nikhil Patel</a>
                <div className="dropdown-menu user-pro-dropdown">
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <i className="fe-user me-1" />
                    <span>My Account</span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <i className="fe-settings me-1" />
                    <span>Settings</span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <i className="fe-lock me-1" />
                    <span>Lock Screen</span>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <i className="fe-log-out me-1" />
                    <span>Logout</span>
                  </a>
                </div>
              </div>
              <p className="text-reset">Admin Head</p>
            </div>
            {/*- Sidemenu */}
            <div id="sidebar-menu">
              <ul id="side-menu">
                <li className="menu-title">Navigation</li>
                <li>
                  <a href="#sidebarDashboards" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarDashboards" className="waves-effect">
                    <i className="ri-dashboard-line" />
                    <span className="badge bg-success rounded-pill float-end">3</span>
                    <span> Dashboards </span>
                  </a>
                  <div className="collapse" id="sidebarDashboards">
                    <ul className="nav-second-level">
                      <li>
                        <a href="index.html">Sales</a>
                      </li>
                      <li>
                        <a href="dashboard-crm.html">CRM</a>
                      </li>
                      <li>
                        <a href="dashboard-analytics.html">Analytics</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#sidebarLayouts" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarLayouts">
                    <i className="ri-layout-line" />
                    <span> Layouts </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarLayouts">
                    <ul className="nav-second-level">
                      <li>
                        <a href="layouts-vertical.html">Vertical</a>
                      </li>
                      <li>
                        <a href="layouts-horizontal.html">Horizontal</a>
                      </li>
                      <li>
                        <a href="layouts-two-column.html">Two Column Menu</a>
                      </li>
                      <li>
                        <a href="layouts-preloader.html">Preloader</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="menu-title mt-2">Apps</li>
                <li>
                  <a href="apps-chat.html">
                    <i className="ri-message-2-line" />
                    <span> Chat </span>
                  </a>
                </li>
                <li>
                  <a href="#sidebarEcommerce" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarEcommerce">
                    <i className="ri-shopping-cart-2-line" />
                    <span className="badge bg-danger float-end">New</span>
                    <span> Ecommerce </span>
                  </a>
                  <div className="collapse" id="sidebarEcommerce">
                    <ul className="nav-second-level">
                      <li>
                        <a href="ecommerce-products.html">Products List</a>
                      </li>
                      <li>
                        <a href="ecommerce-products-grid.html">Products Grid</a>
                      </li>
                      <li>
                        <a href="ecommerce-product-detail.html">Product Detail</a>
                      </li>
                      <li>
                        <a href="ecommerce-product-create.html">Create Product</a>
                      </li>
                      <li>
                        <a href="ecommerce-customers.html">Customers</a>
                      </li>
                      <li>
                        <a href="ecommerce-orders.html">Orders</a>
                      </li>
                      <li>
                        <a href="ecommerce-orders-detail.html">Order Detail</a>
                      </li>
                      <li>
                        <a href="ecommerce-sellers.html">Sellers</a>
                      </li>
                      <li>
                        <a href="ecommerce-cart.html">Shopping Cart</a>
                      </li>
                      <li>
                        <a href="ecommerce-checkout.html">Checkout</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="apps-calendar.html">
                    <i className="ri-calendar-2-line" />
                    <span> Calendar </span>
                  </a>
                </li>
                <li>
                  <a href="#sidebarEmail" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarEmail">
                    <i className="ri-mail-line" />
                    <span> Email </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarEmail">
                    <ul className="nav-second-level">
                      <li>
                        <a href="email-inbox.html">Inbox</a>
                      </li>
                      <li>
                        <a href="email-read.html">Read Email</a>
                      </li>
                      <li>
                        <a href="email-templates.html">Email Templates</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="apps-companies.html">
                    <i className="ri-building-4-line" />
                    <span> Companies </span>
                  </a>
                </li>
                <li>
                  <a href="#sidebarTasks" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarTasks">
                    <i className="ri-task-line" />
                    <span> Tasks </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarTasks">
                    <ul className="nav-second-level">
                      <li>
                        <a href="task-list.html">List</a>
                      </li>
                      <li>
                        <a href="task-details.html">Details</a>
                      </li>
                      <li>
                        <a href="task-kanban-board.html">Kanban Board</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="apps-tickets.html">
                    <i className="ri-customer-service-2-line" />
                    <span> Tickets </span>
                  </a>
                </li>
                <li>
                  <a href="#sidebarContacts" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarContacts">
                    <i className="ri-profile-line" />
                    <span> Contacts </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarContacts">
                    <ul className="nav-second-level">
                      <li>
                        <a href="contacts-list.html">Members List</a>
                      </li>
                      <li>
                        <a href="contacts-profile.html">Profile</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="apps-file-manager.html">
                    <i className="ri-folders-line" />
                    <span> File Manager </span>
                  </a>
                </li>
                <li className="menu-title mt-2">Custom</li>
                <li>
                  <a href="#sidebarAuth" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarAuth">
                    <i className="ri-shield-user-line" />
                    <span> Auth Pages </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarAuth">
                    <ul className="nav-second-level">
                      <li>
                        <a href="auth-login.html">Log In</a>
                      </li>
                      <li>
                        <a href="auth-login-2.html">Log In 2</a>
                      </li>
                      <li>
                        <a href="auth-register.html">Register</a>
                      </li>
                      <li>
                        <a href="auth-register-2.html">Register 2</a>
                      </li>
                      <li>
                        <a href="auth-signin-signup.html">Signin - Signup</a>
                      </li>
                      <li>
                        <a href="auth-signin-signup-2.html">Signin - Signup 2</a>
                      </li>
                      <li>
                        <a href="auth-recoverpw.html">Recover Password</a>
                      </li>
                      <li>
                        <a href="auth-recoverpw-2.html">Recover Password 2</a>
                      </li>
                      <li>
                        <a href="auth-lock-screen.html">Lock Screen</a>
                      </li>
                      <li>
                        <a href="auth-lock-screen-2.html">Lock Screen 2</a>
                      </li>
                      <li>
                        <a href="auth-logout.html">Logout</a>
                      </li>
                      <li>
                        <a href="auth-logout-2.html">Logout 2</a>
                      </li>
                      <li>
                        <a href="auth-confirm-mail.html">Confirm Mail</a>
                      </li>
                      <li>
                        <a href="auth-confirm-mail-2.html">Confirm Mail 2</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#sidebarExpages" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarExpages">
                    <i className="ri-pages-line" />
                    <span> Extra Pages </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarExpages">
                    <ul className="nav-second-level">
                      <li>
                        <a href="pages-starter.html">Starter</a>
                      </li>
                      <li>
                        <a href="pages-timeline.html">Timeline</a>
                      </li>
                      <li>
                        <a href="pages-sitemap.html">Sitemap</a>
                      </li>
                      <li>
                        <a href="pages-invoice.html">Invoice</a>
                      </li>
                      <li>
                        <a href="pages-faqs.html">FAQs</a>
                      </li>
                      <li>
                        <a href="pages-search-results.html">Search Results</a>
                      </li>
                      <li>
                        <a href="pages-pricing.html">Pricing</a>
                      </li>
                      <li>
                        <a href="pages-maintenance.html">Maintenance</a>
                      </li>
                      <li>
                        <a href="pages-coming-soon.html">Coming Soon</a>
                      </li>
                      <li>
                        <a href="pages-gallery.html">Gallery</a>
                      </li>
                      <li>
                        <a href="pages-404.html">Error 404</a>
                      </li>
                      <li>
                        <a href="pages-404-alt.html">Error 404-alt</a>
                      </li>
                      <li>
                        <a href="pages-500.html">Error 500</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="menu-title mt-2">Components</li>
                <li>
                  <a href="#sidebarBaseui" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarBaseui">
                    <i className="ri-pencil-ruler-2-line" />
                    <span> Base UI </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarBaseui">
                    <ul className="nav-second-level">
                      <li>
                        <a href="ui-avatars.html">Avatars</a>
                      </li>
                      <li>
                        <a href="ui-buttons.html">Buttons</a>
                      </li>
                      <li>
                        <a href="ui-cards.html">Cards</a>
                      </li>
                      <li>
                        <a href="ui-carousel.html">Carousel</a>
                      </li>
                      <li>
                        <a href="ui-dropdowns.html">Dropdowns</a>
                      </li>
                      <li>
                        <a href="ui-video.html">Embed Video</a>
                      </li>
                      <li>
                        <a href="ui-general.html">General UI</a>
                      </li>
                      <li>
                        <a href="ui-grid.html">Grid</a>
                      </li>
                      <li>
                        <a href="ui-images.html">Images</a>
                      </li>
                      <li>
                        <a href="ui-list-group.html">List Group</a>
                      </li>
                      <li>
                        <a href="ui-modals.html">Modals</a>
                      </li>
                      <li>
                        <a href="ui-notifications.html">Notifications</a>
                      </li>
                      <li>
                        <a href="ui-offcanvas.html">Offcanvas</a>
                      </li>
                      <li>
                        <a href="ui-placeholders.html">Placeholders</a>
                      </li>
                      <li>
                        <a href="ui-portlets.html">Portlets</a>
                      </li>
                      <li>
                        <a href="ui-progress.html">Progress</a>
                      </li>
                      <li>
                        <a href="ui-ribbons.html">Ribbons</a>
                      </li>
                      <li>
                        <a href="ui-spinners.html">Spinners</a>
                      </li>
                      <li>
                        <a href="ui-tabs-accordions.html">Tabs &amp; Accordions</a>
                      </li>
                      <li>
                        <a href="ui-tooltips-popovers.html">Tooltips &amp; Popovers</a>
                      </li>
                      <li>
                        <a href="ui-typography.html">Typography</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#sidebarExtendedui" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarExtendedui">
                    <i className="ri-stack-line" />
                    <span className="badge bg-info float-end">Hot</span>
                    <span> Extended UI </span>
                  </a>
                  <div className="collapse" id="sidebarExtendedui">
                    <ul className="nav-second-level">
                      <li>
                        <a href="extended-nestable.html">Nestable List</a>
                      </li>
                      <li>
                        <a href="extended-range-slider.html">Range Slider</a>
                      </li>
                      <li>
                        <a href="extended-sweet-alert.html">Sweet Alert</a>
                      </li>
                      <li>
                        <a href="extended-tour.html">Tour Page</a>
                      </li>
                      <li>
                        <a href="extended-treeview.html">Treeview</a>
                      </li>
                      <li>
                        <a href="extended-scrollspy.html">Scrollspy</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="widgets.html">
                    <i className="ri-honour-line" />
                    <span> Widgets </span>
                  </a>
                </li>
                <li>
                  <a href="#sidebarIcons" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarIcons">
                    <i className="ri-markup-line" />
                    <span> Icons </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarIcons">
                    <ul className="nav-second-level">
                      <li>
                        <a href="icons-feather.html">Feather</a>
                      </li>
                      <li>
                        <a href="icons-remix.html">Remix</a>
                      </li>
                      <li>
                        <a href="icons-boxicons.html">Boxicons</a>
                      </li>
                      <li>
                        <a href="icons-mdi.html">Material Design</a>
                      </li>
                      <li>
                        <a href="icons-font-awesome.html">Font Awesome 5</a>
                      </li>
                      <li>
                        <a href="icons-weather.html">Weather</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#sidebarForms" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarForms">
                    <i className="ri-eraser-line" />
                    <span> Forms </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarForms">
                    <ul className="nav-second-level">
                      <li>
                        <a href="forms-elements.html">General Elements</a>
                      </li>
                      <li>
                        <a href="forms-advanced.html">Advanced</a>
                      </li>
                      <li>
                        <a href="forms-validation.html">Validation</a>
                      </li>
                      <li>
                        <a href="forms-pickers.html">Pickers</a>
                      </li>
                      <li>
                        <a href="forms-wizard.html">Wizard</a>
                      </li>
                      <li>
                        <a href="forms-masks.html">Masks</a>
                      </li>
                      <li>
                        <a href="forms-quilljs.html">Quilljs Editor</a>
                      </li>
                      <li>
                        <a href="forms-file-uploads.html">File Uploads</a>
                      </li>
                      <li>
                        <a href="forms-x-editable.html">X Editable</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#sidebarTables" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarTables">
                    <i className="ri-table-line" />
                    <span> Tables </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarTables">
                    <ul className="nav-second-level">
                      <li>
                        <a href="tables-basic.html">Basic Tables</a>
                      </li>
                      <li>
                        <a href="tables-datatables.html">Data Tables</a>
                      </li>
                      <li>
                        <a href="tables-editable.html">Editable Tables</a>
                      </li>
                      <li>
                        <a href="tables-responsive.html">Responsive Tables</a>
                      </li>
                      <li>
                        <a href="tables-footables.html">FooTable</a>
                      </li>
                      <li>
                        <a href="tables-tablesaw.html">Tablesaw Tables</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#sidebarCharts" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarCharts">
                    <i className="ri-bar-chart-line" />
                    <span> Charts </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarCharts">
                    <ul className="nav-second-level">
                      <li>
                        <a href="charts-flot.html">Flot</a>
                      </li>
                      <li>
                        <a href="charts-apex.html">Apex</a>
                      </li>
                      <li>
                        <a href="charts-morris.html">Morris</a>
                      </li>
                      <li>
                        <a href="charts-chartjs.html">Chartjs</a>
                      </li>
                      <li>
                        <a href="charts-c3.html">C3</a>
                      </li>
                      <li>
                        <a href="charts-peity.html">Peity</a>
                      </li>
                      <li>
                        <a href="charts-chartist.html">Chartist</a>
                      </li>
                      <li>
                        <a href="charts-sparklines.html">Sparklines</a>
                      </li>
                      <li>
                        <a href="charts-knob.html">Jquery Knob</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#sidebarMaps" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarMaps">
                    <i className="ri-map-pin-line" />
                    <span> Maps </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarMaps">
                    <ul className="nav-second-level">
                      <li>
                        <a href="maps-google.html">Google</a>
                      </li>
                      <li>
                        <a href="maps-vector.html">Vector</a>
                      </li>
                      <li>
                        <a href="maps-mapael.html">Mapael</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#sidebarMultilevel" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarMultilevel">
                    <i className="ri-share-line" />
                    <span> Multi Level </span>
                    <span className="menu-arrow" />
                  </a>
                  <div className="collapse" id="sidebarMultilevel">
                    <ul className="nav-second-level">
                      <li>
                        <a href="#sidebarMultilevel2" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarMultilevel2">
                          Second Level <span className="menu-arrow" />
                        </a>
                        <div className="collapse" id="sidebarMultilevel2">
                          <ul className="nav-second-level">
                            <li>
                              <a href="javascript: void(0);">Item 1</a>
                            </li>
                            <li>
                              <a href="javascript: void(0);">Item 2</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <a href="#sidebarMultilevel3" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarMultilevel3">
                          Third Level <span className="menu-arrow" />
                        </a>
                        <div className="collapse" id="sidebarMultilevel3">
                          <ul className="nav-second-level">
                            <li>
                              <a href="javascript: void(0);">Item 1</a>
                            </li>
                            <li>
                              <a href="#sidebarMultilevel4" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sidebarMultilevel4">
                                Item 2 <span className="menu-arrow" />
                              </a>
                              <div className="collapse" id="sidebarMultilevel4">
                                <ul className="nav-second-level">
                                  <li>
                                    <a href="javascript: void(0);">Item 1</a>
                                  </li>
                                  <li>
                                    <a href="javascript: void(0);">Item 2</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            {/* End Sidebar */}
            <div className="clearfix" />
          </div>
          {/* Sidebar -left */}
        </div>
        {/* Left Sidebar End */}
        {/* ============================================================== */}
        {/* Start Page Content here */}
        {/* ============================================================== */}
        <div className="content-page">
          <div className="content">
            {/* Start Content*/}
            <div className="container-fluid">
              {/* start page title */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box page-title-box-alt">
                    <h4 className="page-title">Customers</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                        <li className="breadcrumb-item"><a href="javascript: void(0);">eCommerce</a></li>
                        <li className="breadcrumb-item active">Customers</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* end page title */}
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row mb-2">
                        <div className="col-sm-4">
                            <Button variant="danger"  className="btn btn-danger mb-2"
                              onClick={()=>{ openAddCustomerModal();
                                setWorkEmail("");
                                setCompanyName("");
                                setPhoneNumber("");
                                setFirstName("");
                                setLastName("");
                                setPassword("");

                            }}><i className="mdi mdi-plus-circle me-1" /> Add Customers</Button>
                        </div>
                        <div className="col-sm-8">
                          <div className="text-sm-end">
                            <button type="button" className="btn btn-success mb-2 me-1"><i className="mdi mdi-cog" /></button>
                            <button type="button" className="btn btn-light mb-2 me-1">Import</button>
                            <button type="button" className="btn btn-light mb-2">Export</button>
                          </div>
                        </div>{/* end col*/}
                      </div>
                      <div className="table-responsive">
                        <table className="table table-centered dt-responsive nowrap w-100" id="products-datatable">
                          <thead className="table-light">
                            <tr>
                              <th style={{width: '20px'}}>
                                <div className="form-check font-16 mb-0">
                                  <input className="form-check-input" type="checkbox" id="customerlist" />
                                  <label className="form-check-label" htmlFor="customerlist">&nbsp;</label>
                                </div>
                              </th>
                              <th>Customer</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Created At</th>
                              <th>Status</th>
                              <th style={{width: '75px'}}>Action</th>
                            </tr>
                          </thead>
                          <tbody>

                              {isLoading && <svg className="text-center" version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                                viewBox="0 0 100 100" enable-background="new 0 0 0 0" >
                                <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                                  <animateTransform
                                     attributeName="transform"
                                     dur="1s"
                                     type="translate"
                                     values="0 15 ; 0 -15; 0 15"
                                     repeatCount="indefinite"
                                     begin="0.1"/>
                                </circle>
                                <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
                                  <animateTransform
                                     attributeName="transform"
                                     dur="1s"
                                     type="translate"
                                     values="0 10 ; 0 -10; 0 10"
                                     repeatCount="indefinite"
                                     begin="0.2"/>
                                </circle>
                                <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
                                  <animateTransform
                                     attributeName="transform"
                                     dur="1s"
                                     type="translate"
                                     values="0 5 ; 0 -5; 0 5"
                                     repeatCount="indefinite"
                                     begin="0.3"/>
                                </circle>
                              </svg>
                              }
                                  {users.map((user) => (
<tr key={user.id}>
                                      <td>
                                        <div className="form-check font-16 mb-0">
                                          <input className="form-check-input" type="checkbox" id="customerlist01" />
                                          <label className="form-check-label" htmlFor="customerlist01">&nbsp;</label>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="d-flex">
                                          <div className="flex-1">
                                            <div>
                                              <h5 className="mt-0 mb-1">{user.first_name}</h5>
                                              <p className="mb-0 font-13">ID : {user.id}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                      {user.work_email}
                                      </td>
                                      <td>{user.phone_number}</td>
                                      <td>
                                      {user.created_at}
                                      </td>
                                      <td>
                                        <span className="badge badge-soft-success">Active</span>
                                      </td>
                                      <td>
                                        <ul className="list-inline mb-0">
                                      <li className="list-inline-item">
        <Button variant="primary"  className="action-icon" onClick={()=>{
                                          setID(user.id);
                                          openEditCustomerModal();
                                          setWorkEmail(user.work_email);
                                          setCompanyName(user.company_name);
                                          setPhoneNumber(user.phone_number);
                                          setFirstName(user.first_name);
                                          setLastName(user.last_name);
                                          setPassword(user.password);
                                        }}> <i className="mdi mdi-square-edit-outline" /></Button>
                                          </li>
                                          <li className="list-inline-item">
                                        <Button variant="danger"  className="action-icon" onClick={(e)=>deleteUser(e,user.id)}> <i className="mdi mdi-delete" /></Button>
                                          </li>
                                        </ul>
                                      </td>
                    </tr>
                                  ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* end row */}
                </div>
              </div>
              {/* end row */}
            </div> {/* container */}
          </div> {/* content */}
          {/* Footer Start */}
          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  © Minton theme by <a href>Coderthemes</a>
                </div>
                <div className="col-md-6">
                  <div className="text-md-end footer-links d-none d-sm-block">
                    <a href="javascript:void(0);">About Us</a>
                    <a href="javascript:void(0);">Help</a>
                    <a href="javascript:void(0);">Contact Us</a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          {/* end Footer */}
        </div>
        {/* ============================================================== */}
        {/* End Page content */}
        {/* ============================================================== */}
      </div>
      {/* END wrapper */}
      {/* Right Sidebar */}
      <div className="right-bar">
        <div data-simplebar className="h-100">
          {/* Nav tabs */}
          <ul className="nav nav-tabs nav-bordered nav-justified" role="tablist">
            <li className="nav-item">
              <a className="nav-link py-2" data-bs-toggle="tab" href="#chat-tab" role="tab">
                <i className="mdi mdi-message-text-outline d-block font-22 my-1" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link py-2" data-bs-toggle="tab" href="#tasks-tab" role="tab">
                <i className="mdi mdi-format-list-checkbox d-block font-22 my-1" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link py-2 active" data-bs-toggle="tab" href="#settings-tab" role="tab">
                <i className="mdi mdi-cog-outline d-block font-22 my-1" />
              </a>
            </li>
          </ul>
          {/* Tab panes */}
          <div className="tab-content pt-0">
            <div className="tab-pane" id="chat-tab" role="tabpanel">
              <form className="search-bar p-3">
                <div className="position-relative">
                  <input type="text" className="form-control" placeholder="Search..." />
                  <span className="mdi mdi-magnify" />
                </div>
              </form>
              <h6 className="fw-medium px-3 mt-2 text-uppercase">Group Chats</h6>
              <div className="p-2">
                <a href="javascript: void(0);" className="text-reset notification-item ps-3 mb-2 d-block">
                  <i className="mdi mdi-checkbox-blank-circle-outline me-1 text-success" />
                  <span className="mb-0 mt-1">App Development</span>
                </a>
                <a href="javascript: void(0);" className="text-reset notification-item ps-3 mb-2 d-block">
                  <i className="mdi mdi-checkbox-blank-circle-outline me-1 text-warning" />
                  <span className="mb-0 mt-1">Office Work</span>
                </a>
                <a href="javascript: void(0);" className="text-reset notification-item ps-3 mb-2 d-block">
                  <i className="mdi mdi-checkbox-blank-circle-outline me-1 text-danger" />
                  <span className="mb-0 mt-1">Personal Group</span>
                </a>
                <a href="javascript: void(0);" className="text-reset notification-item ps-3 d-block">
                  <i className="mdi mdi-checkbox-blank-circle-outline me-1" />
                  <span className="mb-0 mt-1">Freelance</span>
                </a>
              </div>
              <h6 className="fw-medium px-3 mt-3 text-uppercase">Favourites <a href="javascript: void(0);" className="font-18 text-danger"><i className="float-end mdi mdi-plus-circle" /></a></h6>
              <div className="p-2">
                <a href="javascript: void(0);" className="text-reset notification-item">
                  <div className="d-flex align-items-start">
                    <div className="position-relative me-2">
                      <span className="user-status" />
                      <img src="assets/images/users/avatar-10.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h6 className="mt-0 mb-1 font-14">Andrew Mackie</h6>
                      <div className="font-13 text-muted">
                        <p className="mb-0 text-truncate">It will seem like simplified English.</p>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="javascript: void(0);" className="text-reset notification-item">
                  <div className="d-flex align-items-start">
                    <div className="position-relative me-2">
                      <span className="user-status" />
                      <img src="assets/images/users/avatar-1.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h6 className="mt-0 mb-1 font-14">Rory Dalyell</h6>
                      <div className="font-13 text-muted">
                        <p className="mb-0 text-truncate">To an English person, it will seem like simplified</p>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="javascript: void(0);" className="text-reset notification-item">
                  <div className="d-flex align-items-start">
                    <div className="position-relative me-2">
                      <span className="user-status busy" />
                      <img src="assets/images/users/avatar-9.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h6 className="mt-0 mb-1 font-14">Jaxon Dunhill</h6>
                      <div className="font-13 text-muted">
                        <p className="mb-0 text-truncate">To achieve this, it would be necessary.</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <h6 className="fw-medium px-3 mt-3 text-uppercase">Other Chats <a href="javascript: void(0);" className="font-18 text-danger"><i className="float-end mdi mdi-plus-circle" /></a></h6>
              <div className="p-2 pb-4">
                <a href="javascript: void(0);" className="text-reset notification-item">
                  <div className="d-flex align-items-start">
                    <div className="position-relative me-2">
                      <span className="user-status online" />
                      <img src="assets/images/users/avatar-2.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h6 className="mt-0 mb-1 font-14">Jackson Therry</h6>
                      <div className="font-13 text-muted">
                        <p className="mb-0 text-truncate">Everyone realizes why a new common language.</p>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="javascript: void(0);" className="text-reset notification-item">
                  <div className="d-flex align-items-start">
                    <div className="position-relative me-2">
                      <span className="user-status away" />
                      <img src="assets/images/users/avatar-4.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h6 className="mt-0 mb-1 font-14">Charles Deakin</h6>
                      <div className="font-13 text-muted">
                        <p className="mb-0 text-truncate">The languages only differ in their grammar.</p>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="javascript: void(0);" className="text-reset notification-item">
                  <div className="d-flex align-items-start">
                    <div className="position-relative me-2">
                      <span className="user-status online" />
                      <img src="assets/images/users/avatar-5.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h6 className="mt-0 mb-1 font-14">Ryan Salting</h6>
                      <div className="font-13 text-muted">
                        <p className="mb-0 text-truncate">If several languages coalesce the grammar of the resulting.</p>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="javascript: void(0);" className="text-reset notification-item">
                  <div className="d-flex align-items-start">
                    <div className="position-relative me-2">
                      <span className="user-status online" />
                      <img src="assets/images/users/avatar-6.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h6 className="mt-0 mb-1 font-14">Sean Howse</h6>
                      <div className="font-13 text-muted">
                        <p className="mb-0 text-truncate">It will seem like simplified English.</p>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="javascript: void(0);" className="text-reset notification-item">
                  <div className="d-flex align-items-start">
                    <div className="position-relative me-2">
                      <span className="user-status busy" />
                      <img src="assets/images/users/avatar-7.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h6 className="mt-0 mb-1 font-14">Dean Coward</h6>
                      <div className="font-13 text-muted">
                        <p className="mb-0 text-truncate">The new common language will be more simple.</p>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="javascript: void(0);" className="text-reset notification-item">
                  <div className="d-flex align-items-start">
                    <div className="position-relative me-2">
                      <span className="user-status away" />
                      <img src="assets/images/users/avatar-8.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h6 className="mt-0 mb-1 font-14">Hayley East</h6>
                      <div className="font-13 text-muted">
                        <p className="mb-0 text-truncate">One could refuse to pay expensive translators.</p>
                      </div>
                    </div>
                  </div>
                </a>
                <div className="text-center mt-3">
                  <a href="javascript:void(0);" className="btn btn-sm btn-white">
                    <i className="mdi mdi-spin mdi-loading me-2" />
                    Load more
                  </a>
                </div>
              </div>
            </div>
            <div className="tab-pane" id="tasks-tab" role="tabpanel">
              <h6 className="fw-medium p-3 m-0 text-uppercase">Working Tasks</h6>
              <div className="px-2">
                <a href="javascript: void(0);" className="text-reset item-hovered d-block p-2">
                  <p className="text-muted mb-0">App Development<span className="float-end">75%</span></p>
                  <div className="progress mt-2" style={{height: '4px'}}>
                    <div className="progress-bar bg-success" role="progressbar" style={{width: '75%'}} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </a>
                <a href="javascript: void(0);" className="text-reset item-hovered d-block p-2">
                  <p className="text-muted mb-0">Database Repair<span className="float-end">37%</span></p>
                  <div className="progress mt-2" style={{height: '4px'}}>
                    <div className="progress-bar bg-info" role="progressbar" style={{width: '37%'}} aria-valuenow={37} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </a>
                <a href="javascript: void(0);" className="text-reset item-hovered d-block p-2">
                  <p className="text-muted mb-0">Backup Create<span className="float-end">52%</span></p>
                  <div className="progress mt-2" style={{height: '4px'}}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{width: '52%'}} aria-valuenow={52} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </a>
              </div>
              <h6 className="fw-medium px-3 mb-0 mt-4 text-uppercase">Upcoming Tasks</h6>
              <div className="p-2">
                <a href="javascript: void(0);" className="text-reset item-hovered d-block p-2">
                  <p className="text-muted mb-0">Sales Reporting<span className="float-end">12%</span></p>
                  <div className="progress mt-2" style={{height: '4px'}}>
                    <div className="progress-bar bg-danger" role="progressbar" style={{width: '12%'}} aria-valuenow={12} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </a>
                <a href="javascript: void(0);" className="text-reset item-hovered d-block p-2">
                  <p className="text-muted mb-0">Redesign Website<span className="float-end">67%</span></p>
                  <div className="progress mt-2" style={{height: '4px'}}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: '67%'}} aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </a>
                <a href="javascript: void(0);" className="text-reset item-hovered d-block p-2">
                  <p className="text-muted mb-0">New Admin Design<span className="float-end">84%</span></p>
                  <div className="progress mt-2" style={{height: '4px'}}>
                    <div className="progress-bar bg-success" role="progressbar" style={{width: '84%'}} aria-valuenow={84} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </a>
              </div>
              <div className="d-grid p-3 mt-2">
                <a href="javascript: void(0);" className="btn btn-success waves-effect waves-light">Create Task</a>
              </div>
            </div>
            <div className="tab-pane active" id="settings-tab" role="tabpanel">
              <h6 className="fw-medium px-3 m-0 py-2 font-13 text-uppercase bg-light">
                <span className="d-block py-1">Theme Settings</span>
              </h6>
              <div className="p-3">
                <div className="alert alert-warning" role="alert">
                  <strong>Customize </strong> the overall color scheme, sidebar menu, etc.
                </div>
                <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Color Scheme</h6>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="color-scheme-mode" defaultValue="light" id="light-mode-check" defaultChecked />
                  <label className="form-check-label" htmlFor="light-mode-check">Light Mode</label>
                </div>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="color-scheme-mode" defaultValue="dark" id="dark-mode-check" />
                  <label className="form-check-label" htmlFor="dark-mode-check">Dark Mode</label>
                </div>
                {/* Topbar */}
                <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Topbar</h6>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="topbar-color" defaultValue="dark" id="darktopbar-check" defaultChecked />
                  <label className="form-check-label" htmlFor="darktopbar-check">Dark</label>
                </div>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="topbar-color" defaultValue="light" id="lighttopbar-check" />
                  <label className="form-check-label" htmlFor="lighttopbar-check">Light</label>
                </div>
                {/* Left Sidebar*/}
                <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Left Sidebar Color</h6>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="leftsidebar-color" defaultValue="light" id="light-check" defaultChecked />
                  <label className="form-check-label" htmlFor="light-check">Light</label>
                </div>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="leftsidebar-color" defaultValue="dark" id="dark-check" />
                  <label className="form-check-label" htmlFor="dark-check">Dark</label>
                </div>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="leftsidebar-color" defaultValue="brand" id="brand-check" />
                  <label className="form-check-label" htmlFor="brand-check">Brand</label>
                </div>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="leftsidebar-color" defaultValue="gradient" id="gradient-check" />
                  <label className="form-check-label" htmlFor="gradient-check">Gradient</label>
                </div>
                {/* size */}
                <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Left Sidebar Size</h6>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="leftsidebar-size" defaultValue="default" id="default-size-check" defaultChecked />
                  <label className="form-check-label" htmlFor="default-size-check">Default</label>
                </div>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="leftsidebar-size" defaultValue="condensed" id="condensed-check" />
                  <label className="form-check-label" htmlFor="condensed-check">Condensed <small>(Extra Small size)</small></label>
                </div>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="leftsidebar-size" defaultValue="compact" id="compact-check" />
                  <label className="form-check-label" htmlFor="compact-check">Compact <small>(Small size)</small></label>
                </div>
                {/* User info */}
                <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Sidebar User Info</h6>
                <div className="form-check form-switch mb-1">
                  <input className="form-check-input" type="checkbox" name="leftsidebar-user" defaultValue="fixed" id="sidebaruser-check" />
                  <label className="form-check-label" htmlFor="sidebaruser-check">Enable</label>
                </div>
                <div className="d-grid mt-4">
                  <button className="btn btn-primary" id="resetBtn">Reset to Default</button>
                  <a href="https://wrapbootstrap.com/theme/minton-admin-dashboard-landing-template-WB0858DB6?ref=coderthemes" className="btn btn-danger mt-2" target="_blank"><i className="mdi mdi-basket me-1" /> Purchase Now</a>
                </div>
              </div>
            </div>
          </div>
        </div> {/* end slimscroll-menu*/}
      </div>
      {/* /Right-bar */}
      {/* Right bar overlay*/}
      <div className="rightbar-overlay" />
      {/* Vendor js */}
      {/* third party js */}
      {/* third party js ends */}
      {/* Datatables init */}
      {/* App js */}
    </div>
  );
    }else{
      return <Navigate to="/login"/>
    }
}
export default Admin;
Admin.propTypes = {
  token: PropTypes.string
}
