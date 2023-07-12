import { Badge, Group, Notification } from "@mantine/core";
import { Course } from "../../types/course";
import { usePurchasedCourses } from "../../hooks/useCourse";

const CourseCardCompact = ({ course }: { course: Course }) => {
  const { data: purchasedData } = usePurchasedCourses();
  const colors = [
    "blue",
    "cyan",
    "teal",
    "green",
    "yellow",
    "red",
    "gray",
    "pink",
    "orange",
    "indigo",
    "violet",
    "grape",
    "lime",
    "dark",
  ];

  return (
    <Notification
      title={course.title}
      radius={"md"}
      color={colors[Math.floor(Math.random() * colors.length)]}
      withCloseButton={false}
    >
      <Group>
        {purchasedData.purchasedCourses.length > 0 &&
        purchasedData.purchasedCourses.find(
          (purCourse: { _id: string }) => purCourse._id == course._id
        ) ? (
          <Badge color="green" radius={"xs"} variant="dot">
            Purchased
          </Badge>
        ) : (
          ""
        )}
        <Badge color="yellow">{course.price}$</Badge>
      </Group>
    </Notification>
  );
};

export default CourseCardCompact;
