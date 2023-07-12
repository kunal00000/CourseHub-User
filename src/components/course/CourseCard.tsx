import { Card, Image, Text, Badge, Group, Button } from "@mantine/core";
import type { Course } from "../../types/course";
import { IconExternalLink } from "@tabler/icons-react";
import {
  useCoursePostMutation,
  usePurchasedCourses,
} from "../../hooks/useCourse";

export default function CourseCard({ course }: { course: Course }) {
  const { mutate } = useCoursePostMutation();
  const { data: purchasedData, isLoading } = usePurchasedCourses();

  function onBuyCourse() {
    console.log("Buy course");
    mutate(course._id);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card shadow="sm" padding="md" radius="lg" w={320}>
      <Card.Section>
        <Image src={course.imageLink} height={230} withPlaceholder />
      </Card.Section>

      <Group my={"xs"}>
        <Text weight={500}>{course.title}</Text>
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
        <Badge color="yellow" radius={"xs"} variant="filled">
          {course.price}$
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {course.description}
      </Text>

      <Text size={"xs"} color="dimmed" mt={"md"}>
        {course.updatedAt}
      </Text>
      {purchasedData.purchasedCourses.length > 0 &&
      !purchasedData.purchasedCourses.find(
        (purCourse: { _id: string }) => purCourse._id == course._id
      ) ? (
        <Button
          rightIcon={<IconExternalLink />}
          onClick={onBuyCourse}
          variant="default"
          color="dark"
          fullWidth
          mt="md"
          radius="md"
        >
          Buy Course
        </Button>
      ) : (
        ""
      )}
    </Card>
  );
}
