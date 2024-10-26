import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import SignInImg from "../../assets/sign-in.svg";
import { auth } from "@server";

const index = () => {
  const navigete = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await auth.sign_up(values);
      if (res.status === 201) {
        navigete("/sign-in");
        sessionStorage.setItem("showSignup", true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex h-[100vh]">
      <div className="w-1/2 bg-[#1677ff10] flex justify-center items-center">
        <img src={SignInImg} alt="" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <Form
          name="basic"
          layout="vertical"
          method="POST"
          action="/login"
          style={{
            maxWidth: 400,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="on"
        >
          <h2 className="pb-5 text-4xl font-semibold">Registrate</h2>

          <Form.Item
            label="First name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "First name is required!",
              },
            ]}
          >
            <Input className="py-2" />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Last name is required!",
              },
            ]}
          >
            <Input className="py-2" />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Phone number is required!",
              },
            ]}
          >
            <Input className="py-2" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Email is required!",
              },
            ]}
          >
            <Input className="py-2" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="py-2" />
          </Form.Item>

          <div>
            <Form.Item>
              <Button style={{ width: "100%", paddingBlock: "20px", color: "#fff", backgroundColor: "rgb(213, 82, 0)", marginBlock: "10px" }} type="submit" htmlType="submit">
                Sign Up
              </Button>
              <div className="flex gap-2">
                <p className="text-[16px]">Already have an account?</p>
                <p onClick={() => navigete("/sign-in")} className="cursor-pointer  text-[16px] hover:text-blue-500 font-semibold duration-150">
                  Login
                </p>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default index;
