import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import SignInImg from "../../assets/sign-in.svg";
import { auth } from "@server";
import { ToastContainer } from "react-toastify";
import { login_not, login_catch, signup_suc } from "@toastify";

const Login = () => {
  const [isPassFocus, setIsPassFocus] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const showSignup = sessionStorage.getItem("showSignup");
    if (showSignup) {
      signup_suc();
      sessionStorage.removeItem("showSignup");
    }
  }, []);
  const onFinish = async (values) => {
    try {
      const res = await auth.sign_in(values);
      if (res.status === 201) {
        sessionStorage.setItem("access_token", res.data.data.tokens.access_token);
        sessionStorage.setItem("signInId", res.data.data.data.id);
        sessionStorage.setItem("showToast", "true");
        navigate("/", { state: { showToast: true } });
      } else if (res.status === 400) {
        login_not();
      }
    } catch (err) {
      console.log(err);
      login_catch();
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleFocus = () => {
    setIsPassFocus(true);
  };
  const handleBlur = () => {
    setIsPassFocus(false);
  };

  return (
    <div className="flex h-[100vh]">
      <ToastContainer />
      <div className="w-1/2 bg-[#1677ff10] flex justify-center items-center">
        <img src={SignInImg} alt="" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <Form
          name="basic"
          layout="vertical"
          method="POST"
          action="/login"
          autoComplete="on"
          style={{
            maxWidth: 400,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h2 className="pb-5 text-4xl font-semibold">Login</h2>
          <Form.Item label="Phone number" name="phone_number" autoComplete="phone_number" rules={[{ required: true, message: "Phone number is required!" }]}>
            <Input className="py-2 focus:border-customRed hover:border-customRed" />
          </Form.Item>
          <Form.Item label="Password" name="password" autoComplete="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password style={{ borderColor: isPassFocus ? "#d55200" : "" }} onFocus={handleFocus} onBlur={handleBlur} className="py-2 hover:border-customRed" />
          </Form.Item>
          <div>
            <Form.Item>
              <Button
                style={{
                  width: "100%",
                  color: "#fff",
                  paddingBlock: "20px",
                  backgroundColor: "rgb(213, 82, 0)",
                  marginBlock: "10px",
                }}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
              <div className="flex gap-2">
                <p className="text-[16px]">Don’t you have an account?</p>
                <p onClick={() => navigate("/sign-up")} className="cursor-pointer text-[16px] hover:text-blue-500 font-semibold duration-150">
                  Registrate
                </p>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
