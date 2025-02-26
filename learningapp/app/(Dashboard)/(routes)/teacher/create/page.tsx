"use client";

import * as z from "zod";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage }  from "@/components/ui/form";
import { Button} from "@/components/ui/button";
import { Input } from "@/components/ui/Input";


const formSchema = z.object ({
    title: z.string().min(1, {
        message: "Title Required"
    })
})

const CreatePage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
        });


        {/**Extract states from these form */}

        const {isSubmitting, isValid } = form.formState;
        const onSubmit = (values: z.z.infer<typeof formSchema>) => {
            console.log(values);
        }

    return ( 
        <div className="max-w-5xl max-auto flex md:items-center">
             <div>
             <h1 className="text-2xl">
                Name of your Course
            </h1>
            <p className="text-sm text-slate-600">
                Give your course a name? Don&apos;t worry you can edit later
                </p>
             
             <Form {...form}>
                <form >

                </form>
             </Form>
             </div>
           
        </div>
     );
    }
    
export default CreatePage;