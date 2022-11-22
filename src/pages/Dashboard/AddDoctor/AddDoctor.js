import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/spinner/Spinner";

const AddDoctor = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // getting the specialties
  const { data: specialties = [], isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch(
        "https://doctor-portal-server-side-three.vercel.app/appointmentSpecialty"
      );
      const data = await res.json();
      return data;
    },
  });

  // adding a doctor
  const handleAddDoctor = (data) => {
    const imgbbKey = process.env.REACT_APP_imgagebb_key;

    // uploading the image to image bb (third party hosting)
    const formData = new FormData();
    const image = data.img[0];
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const doctor = {
          name: data.name,
          email: data.email,
          specialty: data.specialty,
          image: imgData.data.url,
        };

        fetch("https://doctor-portal-server-side-three.vercel.app/doctors", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(doctor),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            toast.success(
              `${doctor.name} has been added as a doctor successfully`
            );
            navigate("/dashboard/manageDoctors");
          });
      });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="mt-5 px-2 ">
      <div className="flex flex-col justify-center items-center gap-5 mx-auto  lg:w-[400px] p-10 shadow-xl  rounded-xl">
        <h2 className="text-3xl font-bold text-accent ">Add a Doctor</h2>
        <form
          className="grid grid-cols-1 gap-3 w-full "
          onSubmit={handleSubmit(handleAddDoctor)}
        >
          {/* name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered w-full"
              type="text"
            />
            {errors.name && (
              <p className="text-red-500 text-xs m-1">{errors.name?.message}</p>
            )}
          </div>
          {/* email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email Address is required",
              })}
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm m-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          {/* specialty */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Specialty</span>
            </label>
            <select
              {...register("specialty", { required: "Specialty is required" })}
              className="select select-bordered w-full max-w-xs"
            >
              {specialties.map((specialty) => (
                <option key={specialty._id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
            {errors.specialty && (
              <p className="text-red-500 text-xs m-1">
                {errors.specialty?.message}
              </p>
            )}
          </div>

          {/* photo */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              {...register("img", { required: "Photo is required" })}
              className="input   file-input file-input-bordered w-full "
              type="file"
              accept="image/*"
            />
            {errors.img && (
              <p className="text-red-500 text-xs m-1">{errors.img?.message}</p>
            )}
          </div>

          {/* submit button */}
          <input
            className="btn btn-accent w-full"
            type="submit"
            value="Add Doctor"
          />
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
