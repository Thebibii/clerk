import { baseURL } from "@/lib/db/env";
import { useMutation } from "@tanstack/react-query";

export const useDeleteComment = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationKey: ["get.comment"],
    mutationFn: async (body: any) => {
      const res = await fetch(`${baseURL}/comment/${body.commentId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      return data;
    },
    onSuccess,
  });
};
