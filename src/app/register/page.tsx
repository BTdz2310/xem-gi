'use client'
import React, {useState} from 'react';
import { Link } from 'next-view-transitions'
import "@/styles/auth.css";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const Page = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pass2, setPass2] = useState('');
    const router = useRouter();

    const reset = () => {
        setUsername('');
        setPassword('');
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if(!username || !password || !pass2) return;

        const data = {
            username: username,
            password: password
        };

        reset();

        const response = await fetch('https://localhost:5001/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(data)
        })
        const json = await response.json();

        if(response.status === 200){
            toast.success(json);
            router.push('/login', {scroll : false});
        }else{
            toast.error(json);
        }
    }

    return (
        <div className="main__container login__form">
            <form onSubmit={(e)=>handleSubmit(e)} className="box">
                <h1>Đăng Ký</h1>
                <input id={username.length>=6?'validTxt':(username===''?undefined:'nvalidTxt')} type="text" name="" placeholder="Tên Đăng Nhập" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input id={password.length>=8?'validTxt':(password===''?undefined:'nvalidTxt')} type="password" name="" placeholder="Mật Khẩu" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <input id={password===pass2&&password!==''?'validTxt':(pass2===''?undefined:'nvalidTxt')} type="password" name="" placeholder="Xác Nhận Mật Khẩu" value={pass2} onChange={(e)=>setPass2(e.target.value)}/>
                <Link className="signup text-muted" href="../login">Quay Lại Đăng Nhập</Link>
                <input type="submit" name="" value="Đăng Ký" />
            </form>
        </div>
    );
};

export default Page;