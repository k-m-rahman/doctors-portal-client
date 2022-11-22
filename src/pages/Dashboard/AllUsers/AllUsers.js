import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/spinner/Spinner";

const AllUsers = () => {
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://doctor-portal-server-side-three.vercel.app/users",
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (user) => {
    fetch(
      `https://doctor-portal-server-side-three.vercel.app/users/admin/${user._id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`Successfully made ${user.name} an admin`);
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="px-5">
      <h3 className="text-3xl font-semibold my-5">All Users</h3>

      <div className="overflow-x-auto ">
        <table className="table w-full px-5">
          {/* <!-- head --> */}
          <thead>
            <tr className="lg:grid lg:grid-cols-12">
              <th></th>
              <th className="lg:col-span-3">Name</th>
              <th className="lg:col-span-5">Email</th>
              <th className="lg:col-span-2">Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className=" lg:grid lg:grid-cols-12 ">
                <th>{idx + 1}</th>
                <td className="lg:col-span-3 overflow-auto">{user.name}</td>
                <td className="lg:col-span-5 overflow-auto">{user.email}</td>
                <td className="lg:col-span-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-xs btn-primary "
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {" "}
                  <button className="btn btn-xs btn-error">Delete</button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
