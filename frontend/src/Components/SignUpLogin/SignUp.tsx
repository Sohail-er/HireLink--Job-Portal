
import { Button, LoadingOverlay, PasswordInput, Radio, TextInput } from "@mantine/core";
import { IconAt,  IconLock} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const SignUp = () => {
    const form = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "APPLICANT"
    }
    const [data, setData] = useState<{[key:string]:string}>(form);
    const [formError, setFormError] = useState<{[key:string]:string}>(form);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const handleChange = (event: any) => {
        if (typeof (event) == "string") {
            setData({ ...data, accountType: event });
            return;
        }
        let name = event.target.name, value = event.target.value;
        setData({ ...data, [name]: value });
        setFormError({ ...formError, [name]: signupValidation(name, value) });
        if (name === "password" && data.confirmPassword !== "") {
            let err="";
            if (data.confirmPassword !== value) err= "Passwords do not match." ;
            setFormError({ ...formError, [name]: signupValidation(name, value) , confirmPassword:err });
        }
        if (name === "confirmPassword") {
            if (data.password !== value) setFormError({ ...formError, [name]: "Passwords do not match." });
            else setFormError({ ...formError, confirmPassword: "" });
        }
    }
    const handleSubmit = () => {
        setLoading(true);
        let valid=true, newFormError:{[key:string]:string}={};
        for(let key in data){
            if(key==="accountType")continue;
            if(key!=="confirmPassword")newFormError[key]=signupValidation(key, data[key]);
            else if(data[key]!==data["password"])newFormError[key]="Passwords do not match.";
            if(newFormError[key])valid=false;
        }
        setFormError(newFormError);
        if(valid===true){
            registerUser(data).then((res) => {
                setData(form);
                successNotification("Registered Successfully", "Redirecting to login page...");
                
                  setTimeout(()=>{
                    navigate("/login");
                    setLoading(false);
                  }, 4000)
            }).catch((err) => {
                console.log(err);
                setLoading(false);
              errorNotification("Registration Failed", err.response.data.errorMessage);
        });

        }
    }
    return <><LoadingOverlay
    visible={loading}
    zIndex={1000}
    className=" translate-x-1/2"
    overlayProps={{ radius: 'sm', blur: 2 }}
    loaderProps={{ color: 'purple.6', type: 'bars' }}
  /> <div   className="w-1/2 sm-mx:py-20 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col gap-3 justify-center">
        <div className="text-2xl font-semibold text-gray-800">Create Account</div>
        <TextInput value={data.name} error={formError.name} name="name" onChange={handleChange} label="Full Name" withAsterisk placeholder="Your name" />
        <TextInput error={formError.email} value={data.email} name="email" onChange={handleChange} leftSection={<IconAt size={16} />} label="Email" withAsterisk placeholder="Your email" />
        <PasswordInput value={data.password} error={formError.password} name="password" onChange={handleChange} leftSection={<IconLock size={16} />} label="Password" withAsterisk placeholder="Password" />

        <PasswordInput value={data.confirmPassword} error={formError.confirmPassword} name="confirmPassword" onChange={handleChange} leftSection={<IconLock size={16} />} label="Confirm Password" withAsterisk placeholder="Confirm password" />
        <Radio.Group
            value={data.accountType}
            onChange={handleChange}
            label="You are?"
            withAsterisk
        >
            <div className="flex gap-6 xs-mx:gap-3">
                <Radio name="accountType" className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 hover:bg-purple-50 border-purple-200 border rounded-lg has-[:checked]:!border-purple-500 has-[:checked]:!bg-purple-100"   value="APPLICANT" label="Applicant" />
                <Radio name="accountType" className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 hover:bg-purple-50 border-purple-200 border rounded-lg has-[:checked]:!border-purple-500 has-[:checked]:!bg-purple-100"  value="EMPLOYER" label="Employer" />
            </div>
        </Radio.Group>
        <Button loading={loading} onClick={handleSubmit} className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white hover:!from-purple-600 hover:!to-pink-600 !border-0" variant="filled">Sign up</Button>
        <div className="text-center sm-mx:text-sm xs-mx:text-xs text-gray-600">Have an account?  <span className="text-purple-600 hover:underline cursor-pointer font-medium sm-mx:text-sm xs-mx:text-xs" onClick={()=>{navigate("/login");setFormError(form) ;setData(form)}}>Login</span> </div>

    </div></>
}
export default SignUp;