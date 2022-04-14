import { useMutation } from "react-query";

export default function useDeleteAccount(username: string) {
  const mutation = useMutation(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/delete-user/${username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
  });
  return mutation;
}
