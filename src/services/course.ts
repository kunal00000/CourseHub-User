import axiosClient from "../api/axiosClient";

export async function getCourses() {
  const response = await axiosClient.get("users/courses");
  if (response.status === 200) {
    return response.data;
  }
}

export async function postBuyCourse(courseId: string) {
  const response = await axiosClient.post(`users/courses/${courseId}`);
  if (response.status === 200) {
    return response.data;
  }
}

export async function getPurchasedCourses() {
  const response = await axiosClient.get("users/purchasedCourses");
  if (response.status === 200) {
    return response.data;
  }
}
