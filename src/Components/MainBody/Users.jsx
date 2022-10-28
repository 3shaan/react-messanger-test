import React from "react";

const Users = ({ users, chatSelect }) => {
  return (
    <div>
      <div >
        {users.map((user) => {
          return (
            <div
              onClick={() => chatSelect(user)}
              className="my-5 border-blue-800 border-2 p-2 rounded-lg "
              key={user.uid}
            >
              <div className="flex lg:gap-5">
                <div className="flex lg:gap-5">
                  <div>
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.avater}
                      alt=""
                    />
                  </div>
                  <p>{user.name}</p>
                </div>
                <p className={`${user?.isOnline ? 'online':'offline'} avatar w-10 h-10 rounded-full mt-4`}></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
