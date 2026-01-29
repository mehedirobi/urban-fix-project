import axios from "axios";

const useAxiosSecure = () => {
  return axios.create({
    baseURL: "https://urban-fix-server.vercel.app",
  });
};

export default useAxiosSecure;
