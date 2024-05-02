"use client";
import React from "react";
import { useQuery } from '@tanstack/react-query';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function User() {
    const [savedTitle, setSavedTitle] = React.useState([]);
    const [title, setTitle] = React.useState('');

    const handleAddUser = () => {
        setSavedTitle([...savedTitle, title]);
        setTitle("");
    }

    console.log("savedTitle in User:", savedTitle);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddUser();
    }

    const { data: todoData, isLoading, isError } = useQuery<any>({
        queryKey: ['todos'],
        queryFn: () => fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json())
    });

    console.log("todoData in User:", todoData); 

    if (isLoading) {
        return (<p>Loading...</p>);
    }
    
    if (isError) {
        return (<p>Error fetching data</p>);
    }
    
    return (
        <div className="flex flex-col w-[500px] mt-[50px] ml-[500px]">
            <Card>
                <CardHeader>
                    <CardTitle align="center">Employee</CardTitle>
                    <CardDescription align="center">Employee Details </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        {todoData?.map((item, index) => (
                            <p key={index}>
                                <Link href={`/user/${item.id}`}>
                                    {item.id}: {item.name}
                                </Link>  
                            </p>
                        ))}
                        {savedTitle.length > 0 &&
                            <p className="leading-7 [&:not(:first-child)]:mt-6">
                                {savedTitle.map((subItem, subIndex) => (
                                    <p key={subIndex}>  
                                        {subItem.title}
                                    </p>
                                ))}
                            </p>
                        }
                    </p>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                    <Button onClick={handleSubmit}>
                       <Link href="/user"> Create </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
