import { async } from '@firebase/util';
import { addDoc, collection, onSnapshot, orderBy, query, setDoc, Timestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../FireBase/FireBase.config';
import NavBar from './MainBody/NavBar';
import UserChatBox from './MainBody/UserChatBox';
import Users from './MainBody/Users';

const MainBody = () => {
    const [users, setUser] = useState([]);
    const [singleUser, setSingleUser] = useState('');
    const [text, setText] = useState('');
    const user1 = auth?.currentUser?.uid;
    const [msg, setMsg] = useState([]);

    //data collect
    useEffect(() => {
        const userReft = collection(db, 'users');
        //create quary object
        const q = query(userReft, where('uid', 'not-in', [user1]));
        // execute quary file 
        const unSub = onSnapshot(q, (querySnapshot) => {
          let users = [];
          querySnapshot.forEach((doc) => {
            users.push(doc.data());
          },
          (err)=>console.log(err));
          setUser(users);
        });
        return () => unSub();
    }, [])
    console.log(users);

    const chatSelect = (user) => {
        setSingleUser(user);
        console.log(user)
        const user2 = user.uid;
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        const msgRef = collection(db, "message", id, "chat");
        const q = query(msgRef, orderBy("createdAt", "asc"));
        onSnapshot(q, querySnapshot => {
            let msg = [];
            querySnapshot.forEach(doc => {
                msg.push(doc.data());
            })
            setMsg(msg);
        });

    };
console.log(msg)
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(text)
        const user2 = singleUser.uid;
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
        try {
            await addDoc(collection(db, "message", id, "chat"), {
              text,
              from: user1,
              to: user2,
              createdAt: Timestamp.fromDate(new Date()),
            });
        } catch (error) {
            console.log(error)
        }
        setText('');
    }



    return (
      <div>
        <NavBar></NavBar>
        <div className="grid grid-cols-4 min-h-screen  w-11/12 mx-auto">
          <div className="w-52">
            <Users users={users} chatSelect={chatSelect}></Users>
          </div>

          <div className="col-span-3">
            {singleUser ? (
              <div>
                <UserChatBox
                  user={singleUser}
                                handleSubmit={handleSubmit} 
                                text={text} 
                                setText={setText} 
                                msg={msg}
                ></UserChatBox>
              </div>
            ) : (
              <h1 className="text-4xl text-center mt-20">
                Click A Persion To Start ConverSation
              </h1>
            )}
          </div>
        </div>
      </div>
    );
};

export default MainBody;