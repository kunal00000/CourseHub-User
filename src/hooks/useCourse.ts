import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import {
  getCourses,
  getPurchasedCourses,
  postBuyCourse,
} from "../services/course";
import { SuccessNotification } from "../utils/notification";

export function useCourses() {
  return useQuery({
    queryKey: "courses",
    queryFn: () => getCourses(),
  });
}

export function useCoursePostMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (courseId: string) => postBuyCourse(courseId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: "purchasedCourses" });
      SuccessNotification("Course purchased successfully.");
      navigate("/dashboard/courses");
    },
    onError() {
      Error("Something went wrong, Please try again or contact admin.");
    },
  });
}

export function usePurchasedCourses() {
  return useQuery({
    queryKey: "purchasedCourses",
    queryFn: () => getPurchasedCourses(),
  });
}
