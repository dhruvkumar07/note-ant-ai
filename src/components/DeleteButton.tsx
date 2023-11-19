"use client";
import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

type Props = {
  noteId: number;
};

const DeleteButton = ({ noteId }: Props) => {
  const router = useRouter();
  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/deleteNote", {
        noteId,
      });
      return response.data;
    },
  });
  return (
    <AlertDialog>
        <AlertDialogTrigger>
            <Button
            variant={"destructive"}
            size="sm"
            >
            <Trash />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure to delete this note?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your Note.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600"
                disabled={deleteNote.isPending}
                onClick={() => {
                    deleteNote.mutate(undefined, {
                    onSuccess: () => {
                        router.push("/dashboard");
                    },
                    onError: (err) => {
                        console.error(err);
                    },
                    });
                }}
            >
                    Continue
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        

    </AlertDialog>
  );
};

export default DeleteButton;