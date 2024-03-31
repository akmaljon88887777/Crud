import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [values, setValues] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [itemId, setItemiId] = useState(undefined);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const handleSubmit = (e) => {
    axios.post(`http://localhost:8080/users`, { name }).then((res) => {
      setUsers([users, res.data]);
      setName("");
      setUserName("");
    });
  };
  // USER CREATE
  const handleAdd = () => {
    const users = {
      name: values,
      email: email,
      phone: phone,
    };
    if (isEdit) {
      axios
        .put(`http://localhost:8080/users/${itemId}`, users)
        .then((res) => fetchData())
        .catch((err) => console.log(err));
      setValues("");
      setEmail("");
      setPhone("");
      setIsEdit(false);
      setItemiId(undefined);
      setRefresh(false);
    } else {
      axios
        .post(`http://localhost:8080/users`, users)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      setValues("");
      setEmail("");
      setPhone("");
      setRefresh(false);
    }
  };

  const fetchData = () => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    setRefresh(true);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);
  const handleEdit = (id) => {
    setItemiId(id);
    axios
      .get(`http://localhost:8080/users/${id}`)
      .then((resp) => {
        setEmail(resp.data.email);
        setPhone(resp.data.phone);
        setValues(resp.data.name);
        setIsEdit(true);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/users/${id}`)
      .then((resp) => fetchData())
      .catch((err) => console.log(err));
  };
  return (
    <div className="grid justify-center">
      <h2 className="text-center flex justify-center w-full">Axios</h2>
      <form className="w-auto grid gap-3">
        Name:
        <input
          type="text"
          className="w-[380px] h-[45px] bg-slate-200"
          value={values}
          onChange={(e) => setValues(e.target.value)}
        />
        <br />
        Email:
        <input
          type="text"
          className="w-[380px] h-[45px] bg-slate-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        Phone:
        <input
          type="number"
          className="w-[380px] h-[45px] bg-slate-200"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="ml-[278px]">
          <button
            className="flex justify-center items-center text-white w-[100px] h-[40px] bg-[green]"
            onClick={() => handleAdd()}
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
        <div>
          {data?.map((id) => (
            <div
              key={id}
              className="bg-orange-400 flex justify-center p-10 w-auto h-auto text-[#fff]"
            >
              <div className="grid justify-between w-80 items-center">
                <div>
                  <span>name:</span>
                  <span> {id.name}</span>
                </div>
                <div>
                  <span>phone</span>
                  <span>: {id.phone}</span>
                </div>
                <div>
                  <span>email</span>
                  <span> {id.email}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(id.id)}
                    className="w-[60px] h-[35px] flex items-center justify-center bg-red-600"
                  >
                    X
                  </button>
                  <button
                    onClick={() => handleEdit(id.id)}
                    className="w-[60px] h-[35px] flex items-center justify-center bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
