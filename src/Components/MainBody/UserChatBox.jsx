import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";

const UserChatBox = ({ user, handleSubmit, text, setText, msg }) => {
    
  return (
    <div className=" w-full col-span-3">
      <div>
        <p className="text-3xl text-center font-semibold">
          this is {user?.name}
        </p>
          </div>
          <div className='text-xl'>
              {msg.length ? <div>
                  {msg.map(ms => {
                      
                      return (<div>
                          <p className={`${ms?.to === user.uid ? 'text-blue-600 text-right':'text-red-700'}`} >{ ms.text}</p>
                      
                      </div>)
                  })}
              </div> :null}
          </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-3 bottom-10 absolute ml-10">
        <AiOutlinePlus className="text-2xl"></AiOutlinePlus>
        <input
          className="h-10 rounded-lg text-black bg-gray-400 input-secondary lg:w-[800px]"
          type="text" value={text} onChange={(e)=>setText(e.target.value)}
        />
        <button
          className="btn btn-success w-20
          "
          placeholder="Enter Messange"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default UserChatBox;