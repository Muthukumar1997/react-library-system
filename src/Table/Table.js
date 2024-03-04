import './Table.css';
import download from '../assets/image/download.jpg';
import Header from '../Header';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Table() {

  const [getList, setList] = useState([]);

  const [editId, setId] = useState(-1);
  const [getEditButton, setEditButton] = useState(false);
  const [getSearchForm, setSearchForm] = useState('');

  const getListAPI = () => {
    axios.get(`http://localhost:3000/book?email=${sessionStorage.getItem('email')}`).then((result) => {
      setList(result.data);
    }).catch(() => {

    })
  }

  useEffect(() => {
    getListAPI();
  }, [])

  const [getForm, setForm] = useState({
    bookName: '',
    price: '',
    available: false

  });
  const emptyValidation = (value) => {
    if (value) {
      return true;
    }
    else {
      return false;
    }
  }

  const onDeleteHandler = (index) => {
    axios.delete(`http://localhost:3000/book/${getList[index].id}`).then(() => {
      getListAPI();
    })
  }

  const onChangeHandler = (event) => {
    console.log(event.target.checked);
    if (event.target.name === "available") {
      setForm({ ...getForm, [event.target.name]: event.target.checked })
    }
    else {
      setForm({ ...getForm, [event.target.name]: event.target.value })
    }

  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!emptyValidation(getForm.bookName)) {
      alert("first name cannot be empty");
      return;
    }
    if (!emptyValidation(getForm.price)) {
      alert("email  cannot be empty");
      return;
    }
    axios.post('http://localhost:3000/book', { ...getForm, email: sessionStorage.getItem('email') }).then((result) => {
      getListAPI();
    })
  }

  const onEditHandler = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/book/${getList[editId].id}`, { ...getForm, email: sessionStorage.getItem('email') }).then(() => {
      getListAPI();
      setEditButton(false);
      setId(-1);
      setForm({
        bookName: '',
        price: '',
        available: false
      })
    })

  }

  const existingDetails = (index) => {
    setEditButton(true);
    setId(index);
    setForm({
      bookName: getList[index].bookName,
      price: getList[index].price,
      available: getList[index].available
    })
  }


  return (<div>
    <Header logout="yes" />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="text-center">
            <h1>Add Book</h1>
          </div>
        </div>
      </div>
      <div class="row">

        <div class="col-md-4">
          <form>
            <div class="form-group">
              <label>Book Name  </label>
              <input type="text" value={getForm.bookName} onChange={onChangeHandler} class="form-control" name="bookName" />

            </div>
            <div class="form-group">
              <label>Price</label>
              <input type="text" value={getForm.price} onChange={onChangeHandler} class="form-control" name="price" />

            </div>
            <div class="form-group">
              <label>Available  </label>
              <input type="checkbox" checked={getForm.available} name="available" onChange={onChangeHandler} />

            </div>


            <div class="row">
              <div class="col-12">
                <div class="text-center">
                  {!getEditButton && <button onClick={onSubmitHandler} type="submit" class="btn btn-outline-success">Add</button>}
                  {getEditButton && <button onClick={onEditHandler} type="submit" class="btn btn-outline-success">Edit</button>}
                </div>

              </div>
            </div>

          </form>
        </div>
        <div class="col-md-4">

        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label>Search Book Name  </label>
            <input type="text" onChange={(event) => setSearchForm(event.target.value)} class="form-control" name="bookName" />

          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-1">

        </div>
        <div class="col-md-10">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Name</th>
                <th scope="col">Price</th>
                <th scope="col">Handle</th>
                <th scope="col">Available</th>
              </tr>
            </thead>
            <tbody>
              {
                getList.filter((obj) => {
                  if (getSearchForm) {
                    return obj.bookName.toLowerCase().includes(getSearchForm.toLowerCase());
                  }
                  else {
                    return true;
                  }
                }).map((obj, index) => {

                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{obj.bookName}</td>
                      <td>{obj.price}</td>
                      <td><i class="fa fa-pencil-square-o" onClick={() => existingDetails(index)} aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash" onClick={() => onDeleteHandler(index)} aria-hidden="true"></i></td>
                      <td><a href="">{obj.available ? "purchase" : 'no'}</a></td>
                    </tr>
                  )

                })
              }




            </tbody>
          </table>
        </div>
        <div class="col-md-1">

        </div>
      </div>
    </div>
  </div>)
}

export default Table;