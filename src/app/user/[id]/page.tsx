"use client";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link";
function Userupdate({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id]);


  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col w-[500px] mt-[50px] ml-[500px] ">
<Card className="flex flex-col items-center justify-center">
  <CardHeader>
    <CardTitle align="center">Employee Details with {user.id}</CardTitle>
    
  </CardHeader>
  <CardContent align="center">
       <p>Name: {user.name}</p>
      <p>username: {user.username}</p>
      <p>email: {user.email}</p>
      <p>address: {user.address.street}</p>
      <p>suite: {user.address.suite}</p>
      <p>zipcode: {user.address.zipcode}</p>
      <p>city: {user.address.city}</p>
      <p>phone: {user.phone}</p>
      <p>website: {user.website}</p>
      <p>company: {user.company.name}</p>
      <p>catchPhrase: {user.company.catchPhrase}</p>
      <p>bs: {user.company.bs}</p>
  </CardContent>
  <CardFooter>
  <Button >
    <Link href="/">
    Button
    </Link>
    </Button>
  </CardFooter>
</Card>
    </div>
  );
}

export default Userupdate;
