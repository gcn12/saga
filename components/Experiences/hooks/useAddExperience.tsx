import { useMutation } from "react-query";

export default function useAddExperience(
  company: string,
  role: string,
  description: string,
  userID: string | null,
  startDate: Date,
  endDate: Date,
  isCurrentExperience: boolean,
  queryClient: any
) {
  return useMutation(
    () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/add-experience`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company,
            role,
            description,
            userID,
            startDate,
            endDate,
            isCurrentExperience,
          }),
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("experiences");
      },
    }
  );
}
