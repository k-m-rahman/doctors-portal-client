import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/spinner/Spinner";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch(
        "https://doctor-portal-server-side-three.vercel.app/doctors",
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

  // function for deleting the doctor
  const handleDelete = (doctor) => {
    setDeletingDoctor(null);

    fetch(
      `https://doctor-portal-server-side-three.vercel.app/doctors/${doctor._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Doctor ${doctor.name} has been deleted`);
        }
      });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <h3 className="text-3xl font-semibold">Manage Doctors</h3>

      <div className="overflow-x-auto mt-5">
        <table className="table w-11/12 mx-auto ">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {doctors.map((doctor, idx) => (
              <tr key={doctor._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={doctor.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>
                  {" "}
                  <label
                    onClick={() => {
                      setDeletingDoctor(doctor);
                    }}
                    htmlFor="confirmation-modal"
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deletingDoctor && (
        <ConfirmationModal
          title={"Are you sure you want to delete?"}
          message={`${deletingDoctor.name} will be deleted and it cannot be undone`}
          successAction={handleDelete}
          modalData={deletingDoctor}
          successButtonName={"Delete"}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ManageDoctors;
