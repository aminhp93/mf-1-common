import axios from "axios";
import { useEffect, useState } from "react";

const AxiosDemo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios({
          url: "https://app.clickup.com/user/v1/user?include_teams=true",
          method: "get",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNiVkFxWkNGdVJBPSJ9.eyJ1c2VyIjo1NTQ1NDE1NywidmFsaWRhdGVkIjp0cnVlLCJ3c19rZXkiOiIzNDg0MTI1MzIzIiwic2Vzc2lvbl90b2tlbiI6dHJ1ZSwiaWF0IjoxNzAwMjk3NzM1LCJleHAiOjE3MDA0NzA1MzV9.UsW5r_X22HfnzILpk7GGmoXK_YyJK0dlQR-ZdwiM-ds",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        });
        console.log({ result });
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Axios Demo</h1>
      <p>{data && JSON.stringify(data)}</p>
    </div>
  );
};

export default AxiosDemo;
