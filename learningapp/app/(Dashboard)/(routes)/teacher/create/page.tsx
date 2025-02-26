"use client";

import * as z from "zod";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";


import { Form, FormControl, FormItem, FormLabel, FormDescription, FormField, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";


const formSchema = z.object ({
    title: z.string().min(1, {
        message: "Title Required"
    })
})

const CreatePage = () => {
 const route = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
        });


        {/**Extract states from these form */}

        const {isSubmitting, isValid } = form.formState;

        {/**Handle form submission */}
        const onSubmit = async (values: z.z.infer<typeof formSchema>) => {
            try {
                const response = await axios.post<{ id: string }>("api/course", values);
                route.push(`/teacher/courses/${response.data.id}`);

            } catch  {
                toast.error("Something went wrong. Please try again");
            }
        }

    return ( 
        
        <div className="max-w-5xl mx-auto  mt-20 flex flex-col md:items-center min-h-screen">

             <div>
             <h1 className="text-2xl">
                Name of your Course
            </h1>
            <p className="text-sm text-slate-600">
                Give your course a name? Don&apos;t worry you can edit later
                </p>
             
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                  <FormField  
                  control={form.control}
                  name="title"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                        <FormLabel>
                            Course Title 
                        </FormLabel>
                        <FormControl>
                            <Input disabled={isSubmitting} placeholder="e.g. 'Advanced Web Development'" {...field}/>
                        </FormControl>
                        <FormDescription>
                            What will have for these Course?
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                  )}
                  />

                  <div className="flex items-center gap-x-2">
                  <Link href="/">
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                  </Link>
                  <Button type="submit" disabled={!isValid || isSubmitting}>
                    Continue
                  </Button>
                  </div>
                </form>
             </Form>
             </div>
           
        </div>
     );
    }
    
export default CreatePage;