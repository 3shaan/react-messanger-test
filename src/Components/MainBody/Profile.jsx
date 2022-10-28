import { doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { auth, db, storage } from "../../FireBase/FireBase.config";
import naruto from "../../images/naruto.png";

const Profile = () => {
  const [img, setImg] = useState("");
  const [users, setUsers] = useState("");
  useEffect( () => {
      const checksnap = async () => {
        try {
            const docSnap = await getDoc(
              doc(db, "users", auth?.currentUser?.uid)
            );
            if (docSnap.exists()) {
              setUsers(docSnap.data());
            }
        } catch (err) {
            console.log(err.message)
        }
      };
      checksnap();
          
    

    //firebase storage
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avater/${new Date().getTime()}-${img.name}`
          );
          try {
              if (users.avaterPath) {
                  await deleteObject(ref(storage,users?.avaterPath))
              }
             const snap = await uploadBytes(imgRef, img);
             const url = await getDownloadURL(ref(storage, snap?.ref?.fullPath));
             await updateDoc(doc(db, "users", auth?.currentUser?.uid), {
               avater: url,
               avaterPath: snap?.ref?.fullPath,
             });
             setImg("");
          } catch (error) {
            console.log(error.message)
          }
       
      };
      uploadImg();
    }
  }, [ img]);
  return (
    <div>
      <div className="shadow-lg rounded-2xl lg:w-[500px] mx-auto lg:mt-20 p-4 bg-white dark:bg-gray-800">
        <div className="flex flex-row items-start gap-4">
          <div className="relative group">
            <img
              src={users.avater || naruto}
              className="w-30 h-28 rounded-full group-hover:opacity-30"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-700">
              <label htmlFor="camera">
                <AiFillCamera className="text-3xl text-white"></AiFillCamera>
                <input
                  type="file"
                  accept="image/*"
                  id="camera"
                  className="hidden"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div className="w-full flex flex-col justify-between">
            <div>
              <p className="text-gray-800 dark:text-white text-xl font-medium">
                {users?.name ||'no name'}
              </p>
            </div>
            <div className=" text-white">
                 <p className="mb-2">{ users.email}</p>
              <input className="input input-primary w-full" type="email" />
            </div>
                      <p className="text-lg font-semibold mt-4">Join In : {users.createdAt?.toDate()?.toDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
