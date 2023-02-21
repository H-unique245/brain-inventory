import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatBar = () => {
    const [data,setData] = useState([])

    const UserList = async () => {
        try {
          let res = await axios.get(
            "http://localhost:8080/user/userList"
          );
        //   console.log(res.data);
          setData(res.data)
          return res.data;
        } catch (err) {
          return err;
        }
      };
    useEffect(()=>{
        UserList();
    },[])
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
            {
                data&&data?.map((el)=>{
                    if(el.email!==localStorage.getItem('userName'))
                    return <p key={el._id}>{el.name}</p>
                })
            }
        </div>
      </div>
    </div>
  );
};

export default ChatBar;