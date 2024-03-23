import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { IoCopy } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer'
const Background = () => {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    )
}

const Manager = () => {
    const copied = (value) => toast(`${value}`);
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([]);

    const getPasswords = async () => {
        let request = await fetch('http://localhost:3000/')
        let passwords = await request.json();
        setpasswordArray(passwords)
        console.log(passwords);
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const showPassword = () => {
        console.log(true);
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })
    }

    const SavePassword = async () => {

        if (form.site[0].includes(".")) {
            await fetch(`http://localhost:3000/`, { method: "DELETE", headers: { "Content-Type": "Application/json" }, body: JSON.stringify({ id: form.id }) });
            
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "Application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) });
            setform({ site: "", username: "", password: "" })
            copied("Password Added");
        }
        else {
            copied("Failed to add password");
        }
    }




    const DeletePassword = async (id) => {
        let dialog = confirm("Do you want to delete the password?");
        if (dialog) {
            setpasswordArray(passwordArray.filter(item => item.id !== id));
            await fetch("http://localhost:3000", { method: "DELETE", headers: { "Content-Type": "Application/json" }, body: JSON.stringify({ id }) });

        }
    }
    const EditPassword = (id) => {
        setform(passwordArray.filter(i => i.id === id)[0]);
        setpasswordArray(passwordArray.filter(item => item.id !== id));

    }
    const CopyText = (index) => {
        let username = document.getElementsByClassName("username")[index].innerHTML;
        navigator.clipboard.writeText(username)
    }
    const copyPassword = (password) => {
        navigator.clipboard.writeText(password);
    }



    return (
        <>
            <Background />

            {/* App content MANAGER STARTS FROM HERE */}

            <div className='mx-auto'>
                <h1 className='text-center text-2xl mt-5 mb-2 text-green-500'>Password Manager</h1>
                <p className='text-center text-sm'>Your own password manager</p>
                <div className="flex flex-col p-4 w-full">
                    <div>
                        <input name='site' onChange={handleChange} value={form.site} placeholder='Enter website URL' className='rounded-lg w-full px-2 py-1 bg-transparent border text-white' type="text" />
                    </div>
                    <div className="mt-2 flex gap-2">
                        <input name='username' onChange={handleChange} value={form.username} placeholder='Enter Username' className='w-4/6 mr-4 px-2 py-1 rounded-lg bg-transparent border text-white' type="text" />
                        <div className="relative">
                            <input name='password' onChange={(e) => { handleChange(e) }} value={form.password} placeholder='Password' className='w-full px-2 py-1 rounded-lg bg-transparent border text-white' type="text" />
                            <button onClick={showPassword} className="absolute right-0 top-0 px-2 py-1">
                                Show
                            </button>
                        </div>
                    </div>
                    <div className="text-center flex items-center bg-blue-500 hover:bg-blue-600 rounded-lg px-2 py-1 justify-center w-fit gap-4 mx-auto my-4">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon><button onClick={() => { SavePassword(); }}>Save Password</button></div>
                </div>
                <h2 className='text-center text-3xl  font-bold font-mono p-5'>Your Passwords</h2>
                <div className="passwords overflow-y-auto h-[40vh] w-full">
                    {passwordArray.length == 0 && <div className='text-center text-2xl p-5 m-5 '>Empty list</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto  p-2 w-full md:w-4/5 xl:w-3/5 mx-auto overflow-y-auto">
                            <thead className='bg-green-900 sticky top-0'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-gray-800'>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center'><a target='_blank' className='bg-white hover:bg-red-800 hover:text-white transition-all text-red-800 text-sm font-bold px-2 py-1 rounded-sm' href={item.site}>{item.site[0].split(".")[1].toUpperCase()}</a></td>
                                            <td className='text-center justify-center p-1 gap-2 flex items-center'><span className='username'>{item.username}</span><span className="text-xl"><IoCopy className='hover:scale-110 hover:cursor-pointer' onClick={() => { CopyText(index); copied("Username Copied") }} /></span></td>

                                            <td className='text-center'>
                                                {("*").repeat(item.password[0].length)} <button onClick={() => { copyPassword(item.password); copied("Password Copied.") }} className="p-1 password"><IoCopy className='hover:scale-110' /></button>

                                            </td>
                                            <td className='text-right gap-2 p-1 py-2 flex items-center justify-center'><MdDelete onClick={() => { DeletePassword(item.id); copied("Deleted Password") }} className='hover:cursor-pointer hover:scale-110 text-xl' /><MdEdit onClick={() => { EditPassword(item.id) }} className='hover:cursor-pointer hover:scale-110 text-xl' /></td>
                                        </tr>


                                    )
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce />
        </>
    )
}

export default Manager
