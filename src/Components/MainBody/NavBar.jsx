import { async } from '@firebase/util';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../FireBase/FireBase.config';
import { authContext } from '../Context';

const NavBar = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(authContext);
  const logOut = async () => {
  
      try {
         await updateDoc(doc(db, "users", auth?.currentUser?.uid), {
           isOnline: false,
         });
        await signOut(auth);
        navigate("/login");
        
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <Link to={'/'} className="btn btn-ghost normal-case text-xl">Messanger</Link>
        </div>
        <div className="flex-none gap-2 lg:mr-16">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={'/profile'} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={()=>logOut()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default NavBar;