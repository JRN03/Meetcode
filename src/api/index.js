import axios from 'axios'

const reg = 'http://localhost:5000/api/user/register';
const login = 'http://localhost:5000/api/user/login';

export const newUser = async (data) => axios.post(reg, data).then(
    (res) => console.log(res.data), (error) => console.log(error.data)
);
export const loginUser = async (data) => {
    axios.post(login, data).then(
        (res) => {
            console.log(res.data);
            const posts = axios.get('http://localhost:5000/api/posts',{
                headers: {
                    "auth-token": res.data
                }
            });
            posts != null?authorize():unauthorize();
        },
        (err) => {
            alert("Invalid Credentials");
            unauthorize();
        }
    )
};