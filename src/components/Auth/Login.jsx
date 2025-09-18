import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* container pembungkus form login */}
      <div className="rounded-lg overflow-hidden flex bg-white max-w-5xl">
        {/* konten gambar di sebelah kiri */}
        <div className="hidden lg:block lg:w-[50%]">
          <img
            src="https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="gambar"
            className="object-cover"
          />
        </div>
        {/* Form login di sebelah kanan */}
        <div className="w-full lg:w-[50%]">
          <div className="p-8 space-y-4">
            <h3 className="text-lg text-center font-semibold">Login</h3>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" />
            </div>
            <Button variant="default" className="w-full">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
