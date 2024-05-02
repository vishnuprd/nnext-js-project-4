"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import User from "../../components/user.tsx";
import { useMutation } from "@tanstack/react-query";


function Userpage() {
  const [title, setTitle] = React.useState('');
 
  const mutation = useMutation(
    (newTitle) => axios.post('https://jsonplaceholder.typicode.com/users', { title: newTitle })
  );
  
  const handleSubmit = async () => {
    try {
      await mutation.mutate(title);
      setTitle('');
      alert('Employee created successfully');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div>
      <Button className="flex flex-col w-[100px] mt-[10px] ml-[400px]" >
        <Link href="/">Back</Link>
      </Button>
      <div className="flex flex-col w-[500px] mt-[10px] ml-[500px]">
        <Card>
          <CardHeader>
            <CardTitle>Create Employee Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Enter your name here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Button onClick={handleSubmit}>
              
              Save
              </Button>
          </CardFooter>
        </Card>
      </div>
      <User title={title} />
    </div>
  );
}

export default Userpage;
